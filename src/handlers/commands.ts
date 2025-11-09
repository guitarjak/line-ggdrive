import { WebhookEvent, MessageEvent, TextEventMessage } from '@line/bot-sdk';
import { lineService } from '../services/line.js';
import { MessageService } from '../services/messages.js';
import { config, features } from '../config/index.js';
import { logger } from '../utils/logger.js';
import type { LineContext } from '../types/index.js';

// ============================================
// Command Handler Functions
// ============================================

export async function handleHelpCommand(event: WebhookEvent, context: LineContext): Promise<void> {
  if (event.type !== 'message' || event.message.type !== 'text') return;

  const messageService = new MessageService(config.bot.language);
  const helpText = messageService.get('help');

  await lineService.replyMessage(event.replyToken, helpText);
  logger.commandExecuted('/help', context.userId);
}

export async function handleStatusCommand(event: WebhookEvent, context: LineContext): Promise<void> {
  if (event.type !== 'message' || event.message.type !== 'text') return;

  const messageService = new MessageService(config.bot.language);

  // Check feature statuses
  const dbStatus = '✅ Connected'; // TODO: Add actual DB health check
  const driveStatus = features.hasGoogleDrive ? '✅ Configured' : '⚠️ Not configured';
  const aiStatus = features.hasOpenAI && features.hasPinecone ? '✅ Ready' : '⚠️ Not configured';

  const statusText = messageService.get('status', {
    dbStatus,
    driveStatus,
    aiStatus,
  });

  await lineService.replyMessage(event.replyToken, statusText);
  logger.commandExecuted('/status', context.userId);
}

export async function handleSaveCommand(event: WebhookEvent, context: LineContext): Promise<void> {
  if (event.type !== 'message' || event.message.type !== 'text') return;

  const messageService = new MessageService(config.bot.language);

  // TODO: Implement actual save logic in Phase 2
  // For now, just acknowledge the command
  const response = config.bot.language === 'th'
    ? '⏳ กำลังพัฒนาฟีเจอร์นี้... จะพร้อมใช้งานในเร็วๆ นี้ค่ะ!'
    : '⏳ This feature is under development... Coming soon!';

  await lineService.replyMessage(event.replyToken, response);
  logger.commandExecuted('/save', context.userId);
}

export async function handleListCommand(event: WebhookEvent, context: LineContext): Promise<void> {
  if (event.type !== 'message' || event.message.type !== 'text') return;

  const messageService = new MessageService(config.bot.language);

  // TODO: Implement actual list logic in Phase 2
  const response = config.bot.language === 'th'
    ? '📂 รายการไฟล์ของคุณ:\n\n⏳ ยังไม่มีไฟล์ที่บันทึกไว้\n\nส่งไฟล์มาแล้วใช้คำสั่ง /save เพื่อบันทึกนะคะ'
    : '📂 Your files:\n\n⏳ No saved files yet\n\nSend a file and use /save to store it';

  await lineService.replyMessage(event.replyToken, response);
  logger.commandExecuted('/list', context.userId);
}

export async function handleSearchCommand(
  event: WebhookEvent,
  context: LineContext,
  query: string
): Promise<void> {
  if (event.type !== 'message' || event.message.type !== 'text') return;

  const messageService = new MessageService(config.bot.language);

  if (!query || query.trim().length === 0) {
    const response = config.bot.language === 'th'
      ? '❓ กรุณาระบุคำค้นหา\n\nตัวอย่าง: /search ใบเสนอราคา'
      : '❓ Please provide a search query\n\nExample: /search proposal';

    await lineService.replyMessage(event.replyToken, response);
    return;
  }

  // TODO: Implement actual search logic in Phase 4
  const response = messageService.get('searchNoResults', { query: query.trim() });

  await lineService.replyMessage(event.replyToken, response);
  logger.commandExecuted('/search', context.userId);
  logger.searchQuery(query, 0);
}

// ============================================
// Command Router
// ============================================

export async function handleCommand(event: WebhookEvent, context: LineContext): Promise<boolean> {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return false;
  }

  const text = event.message.text.trim();

  // Check if it's a command (starts with /)
  if (!text.startsWith('/')) {
    return false;
  }

  // Parse command and arguments
  const parts = text.slice(1).split(' ');
  const command = parts[0].toLowerCase();
  const args = parts.slice(1).join(' ');

  try {
    switch (command) {
      case 'help':
      case 'start':
        await handleHelpCommand(event, context);
        break;

      case 'status':
        await handleStatusCommand(event, context);
        break;

      case 'save':
        await handleSaveCommand(event, context);
        break;

      case 'list':
        await handleListCommand(event, context);
        break;

      case 'search':
        await handleSearchCommand(event, context, args);
        break;

      default:
        // Unknown command
        const messageService = new MessageService(config.bot.language);
        await lineService.replyMessage(
          event.replyToken,
          messageService.get('commandNotFound')
        );
        return false;
    }

    return true;
  } catch (error) {
    logger.error('Command execution failed', error, { command, userId: context.userId });
    throw error;
  }
}
