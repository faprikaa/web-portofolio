import { Hono } from 'hono';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Bindings } from '../index';
import { rateLimit, getRemainingMessages } from '../lib/rate-limit';

const chat = new Hono<{ Bindings: Bindings }>();

// System instruction cache
let systemInstructionCache: string | null = null;
let cvContentCache: string | null = null;

async function getSystemInstruction(siteUrl: string): Promise<string> {
  if (systemInstructionCache) return systemInstructionCache;

  try {
    const response = await fetch(`${siteUrl}/chatbot-context.txt`);
    if (response.ok) {
      systemInstructionCache = await response.text();
      return systemInstructionCache;
    }
  } catch (error) {
    console.error('Error loading system instruction:', error);
  }

  return `Kamu adalah MuammarBot, asisten AI untuk portofolio Muammar Mufid Darmindra, seorang Fullstack Developer & Cloud Engineer. Jawab pertanyaan tentang skill, pengalaman, dan proyek Muammar dengan profesional dan ramah.`;
}

async function getCVContent(siteUrl: string): Promise<string> {
  if (cvContentCache) return cvContentCache;

  try {
    const response = await fetch(`${siteUrl}/cv-content.txt`);
    if (response.ok) {
      cvContentCache = await response.text();
      return cvContentCache;
    }
  } catch (error) {
    console.error('Error loading CV content:', error);
  }

  return '';
}

// GET - Get remaining message count
chat.get('/', async (c) => {
  const remaining = await getRemainingMessages(c.req.raw, c.env.RATE_LIMIT_KV);
  return c.json({ remaining, limit: 15 });
});

// POST - Send chat message
chat.post('/', async (c) => {
  try {
    // Check rate limit
    const rateLimitResult = await rateLimit(c.req.raw, c.env.RATE_LIMIT_KV);

    if (!rateLimitResult.success) {
      return c.json(
        {
          error: 'Rate limit exceeded',
          limit: rateLimitResult.limit,
          remaining: rateLimitResult.remaining,
        },
        429
      );
    }

    const { messages } = await c.req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return c.json({ error: 'Invalid messages format' }, 400);
    }

    const latestMessage = messages[messages.length - 1];

    if (latestMessage.sender !== 'user') {
      return c.json({ error: 'Last message must be from user' }, 400);
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(c.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    });

    // Get site URL from allowed origins (first one is primary)
    const siteUrl = c.env.ALLOWED_ORIGINS?.split(',')[0] || 'https://muammar.pages.dev';

    // Format chat history
    const chatHistory = messages
      .slice(0, -1)
      .map((msg: { sender: string; content: string }) => {
        const role = msg.sender === 'user' ? 'Pengguna' : 'MuammarBot';
        return `${role}: ${msg.content}`;
      })
      .join('\n\n');

    // Get system instruction and CV content
    const systemInstruction = await getSystemInstruction(siteUrl);
    const cvContent = await getCVContent(siteUrl);

    // Prepare prompt
    const prompt = `${systemInstruction}

${cvContent ? `=== DATA CV MUAMMAR ===
${cvContent}
=== END CV ===

` : ''}${chatHistory ? `Riwayat percakapan sebelumnya:
${chatHistory}

` : ''}Pertanyaan terbaru: ${latestMessage.content}

Jawaban (gunakan format Markdown):`;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return c.json({
      message: {
        id: Date.now().toString(),
        content: text,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      },
      limit: rateLimitResult.limit,
      remaining: rateLimitResult.remaining,
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return c.json({ error: 'Failed to process chat request' }, 500);
  }
});

export { chat as chatRoutes };
