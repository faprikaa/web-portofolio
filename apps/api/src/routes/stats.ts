import { Hono } from 'hono';
import type { Bindings } from '../index';

const stats = new Hono<{ Bindings: Bindings }>();

stats.get('/', async (c) => {
  try {
    // Simple stats endpoint - can be expanded later
    // In production, you might want to store stats in KV or D1
    return c.json({
      status: 'ok',
      message: 'Stats endpoint - authentication required for detailed data',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in stats API:', error);
    return c.json({ error: 'Failed to process request' }, 500);
  }
});

export { stats as statsRoutes };
