import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getRemainingMessages } from '@/lib/rate-limit';

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// System instruction cache
let systemInstructionCache: string | null = null;
let cvContentCache: string | null = null;

async function getSystemInstruction(): Promise<string> {
  if (systemInstructionCache) {
    return systemInstructionCache;
  }

  try {
    // For edge runtime, fetch the file from public folder
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://muammar.pages.dev';
    const response = await fetch(`${baseUrl}/chatbot-context.txt`);
    if (response.ok) {
      systemInstructionCache = await response.text();
      return systemInstructionCache;
    }
  } catch (error) {
    console.error('Error loading system instruction:', error);
  }

  // Fallback instruction if file cannot be loaded
  return `Kamu adalah MuammarBot, asisten AI untuk portofolio Muammar Mufid Darmindra, seorang Fullstack Developer & Cloud Engineer. Jawab pertanyaan tentang skill, pengalaman, dan proyek Muammar dengan profesional dan ramah.`;
}

async function getCVContent(): Promise<string> {
  if (cvContentCache) {
    return cvContentCache;
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://muammar.pages.dev';
    const response = await fetch(`${baseUrl}/cv-content.txt`);
    if (response.ok) {
      cvContentCache = await response.text();
      return cvContentCache;
    }
  } catch (error) {
    console.error('Error loading CV content:', error);
  }

  return '';
}

// API endpoint for getting remaining message count
export async function GET(request: NextRequest) {
  const remaining = await getRemainingMessages(request);
  return NextResponse.json({ remaining, limit: 15 });
}

export async function POST(request: NextRequest) {
  try {
    // Check rate limit
    const rateLimitResult = await rateLimit(request);

    // If rate limit exceeded, return 429 Too Many Requests
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          limit: rateLimitResult.limit,
          remaining: rateLimitResult.remaining
        },
        { status: 429 }
      );
    }

    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    // Get the latest user message
    const latestMessage = messages[messages.length - 1];

    if (latestMessage.sender !== 'user') {
      return NextResponse.json({ error: 'Last message must be from user' }, { status: 400 });
    }

    // Configure the model
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    });

    // Format chat history for context
    const chatHistory = messages.slice(0, -1).map(msg => {
      const role = msg.sender === 'user' ? 'Pengguna' : 'MuammarBot';
      return `${role}: ${msg.content}`;
    }).join('\n\n');

    // Get system instruction and CV content from files
    const systemInstruction = await getSystemInstruction();
    const cvContent = await getCVContent();

    // Prepare prompt with system instruction, CV content, chat history, and user message
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

    return NextResponse.json({
      message: {
        id: Date.now().toString(),
        content: text,
        sender: 'bot',
        timestamp: new Date(),
      },
      limit: rateLimitResult.limit,
      remaining: rateLimitResult.remaining
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}
