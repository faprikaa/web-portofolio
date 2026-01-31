import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { chatRoutes } from './routes/chat';
import { statsRoutes } from './routes/stats';

export type Bindings = {
  RATE_LIMIT_KV: KVNamespace;
  GEMINI_API_KEY: string;
  ALLOWED_ORIGINS: string;
  ADMIN_SECRET_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// CORS middleware
app.use('*', async (c, next) => {
  const allowedOrigins = c.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
  
  return cors({
    origin: (origin) => {
      if (!origin) return allowedOrigins[0];
      return allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
    },
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })(c, next);
});

// Health check
app.get('/', (c) => {
  return c.json({ 
    status: 'ok', 
    name: 'Muammar API',
    version: '1.0.0'
  });
});

// Mount routes
app.route('/api/chat', chatRoutes);
app.route('/api/stats', statsRoutes);

export default app;
