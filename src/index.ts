import express, { Request, Response, NextFunction } from 'express';
import { middleware, WebhookEvent } from '@line/bot-sdk';
import { config } from './config/index.js';
import { logger } from './utils/logger.js';
import { handleWebhookEvents } from './handlers/webhook.js';
import { testConnection } from './db/client.js';

// ============================================
// Express App Setup
// ============================================

const app = express();
const port = config.server.port;

// Health check endpoint (for Railway)
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// Root endpoint
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    service: 'LINE File Search Bot',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/health',
      webhook: '/webhook',
    },
  });
});

// LINE webhook endpoint
app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (req: Request, res: Response) => {
    try {
      // Verify signature
      const signature = req.headers['x-line-signature'] as string;
      if (!signature) {
        logger.warn('Missing LINE signature header');
        return res.status(400).json({ error: 'Missing signature' });
      }

      // Get raw body
      const body = req.body.toString('utf-8');

      // Verify signature manually
      const crypto = require('crypto');
      const hash = crypto
        .createHmac('SHA256', config.line.channelSecret)
        .update(body)
        .digest('base64');

      if (hash !== signature) {
        logger.warn('Invalid LINE signature');
        return res.status(401).json({ error: 'Invalid signature' });
      }

      // Parse events
      const data = JSON.parse(body);
      const events: WebhookEvent[] = data.events || [];

      // Process events asynchronously
      if (events.length > 0) {
        // Don't await - respond to LINE immediately
        handleWebhookEvents(events).catch((error) => {
          logger.error('Failed to process webhook events', error);
        });
      }

      // Respond to LINE immediately
      res.status(200).json({ success: true });
    } catch (error) {
      logger.error('Webhook endpoint error', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error('Unhandled error', error);
  res.status(500).json({ error: 'Internal server error' });
});

// ============================================
// Server Startup
// ============================================

async function startServer() {
  try {
    // Log startup
    logger.info('Starting LINE File Search Bot...');
    logger.info(`Environment: ${config.server.nodeEnv}`);

    // Test database connection (optional for Phase 1)
    try {
      const dbConnected = await testConnection();
      if (dbConnected) {
        logger.info('✅ Database connected');
      } else {
        logger.warn('⚠️  Database not connected - some features will be limited');
      }
    } catch (error) {
      logger.warn('⚠️  Database connection failed - running in limited mode', error);
    }

    // Start Express server
    app.listen(port, () => {
      logger.info(`✅ Server running on port ${port}`);
      logger.info(`📡 Webhook URL: http://localhost:${port}/webhook`);
      logger.info(`🏥 Health check: http://localhost:${port}/health`);
    });
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully...');
  process.exit(0);
});

// Start the server
startServer();
