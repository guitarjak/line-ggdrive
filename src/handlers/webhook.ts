import { WebhookEvent, MessageEvent, FollowEvent, UnfollowEvent, JoinEvent } from '@line/bot-sdk';
import { lineService } from '../services/line.js';
import { MessageService } from '../services/messages.js';
import { config } from '../config/index.js';
import { logger } from '../utils/logger.js';
import { handleCommand } from './commands.js';
import type { LineContext } from '../types/index.js';

// ============================================
// Context Extraction
// ============================================

function extractContext(event: WebhookEvent): LineContext {
  // Extract user ID
  let userId = '';
  if ('source' in event) {
    userId = event.source.userId || '';
  }

  // Extract group/room ID
  let groupId: string | undefined;
  let roomId: string | undefined;
  let type: 'user' | 'group' | 'room' = 'user';

  if ('source' in event) {
    if (event.source.type === 'group') {
      groupId = event.source.groupId;
      type = 'group';
    } else if (event.source.type === 'room') {
      roomId = event.source.roomId;
      type = 'room';
    }
  }

  return { userId, groupId, roomId, type };
}

// ============================================
// Event Handlers
// ============================================

async function handleFollowEvent(event: FollowEvent): Promise<void> {
  const context = extractContext(event);
  logger.lineWebhook('follow', context.userId);

  // Send welcome message
  const messageService = new MessageService(config.bot.language);
  await lineService.replyMessage(event.replyToken, messageService.get('welcome'));

  // TODO: Store user in database (Phase 1)
  try {
    const profile = await lineService.getUserProfile(context.userId);
    logger.info('New user followed', { userId: profile.userId, displayName: profile.displayName });
    // TODO: Insert into database
  } catch (error) {
    logger.error('Failed to get user profile', error);
  }
}

async function handleUnfollowEvent(event: UnfollowEvent): Promise<void> {
  const context = extractContext(event);
  logger.lineWebhook('unfollow', context.userId);

  // TODO: Update user status in database (Phase 1)
}

async function handleJoinEvent(event: JoinEvent): Promise<void> {
  const context = extractContext(event);
  logger.lineWebhook('join', context.userId, context.groupId);

  // Send welcome message to group
  const messageService = new MessageService(config.bot.language);
  await lineService.replyMessage(event.replyToken, messageService.get('welcome'));
}

async function handleMessageEvent(event: MessageEvent): Promise<void> {
  const context = extractContext(event);
  logger.lineWebhook(event.message.type, context.userId, context.groupId);

  // Handle text messages
  if (event.message.type === 'text') {
    // Try to handle as command first
    const isCommand = await handleCommand(event, context);
    if (isCommand) {
      return;
    }

    // Handle normal text message
    // TODO: Store message in database for context (Phase 5)
    logger.debug('Text message received', { text: event.message.text, userId: context.userId });
  }

  // Handle file messages (image, video, audio, file)
  else if (['image', 'video', 'audio', 'file'].includes(event.message.type)) {
    await handleFileMessage(event, context);
  }

  // Handle other message types
  else {
    logger.debug('Unsupported message type', { type: event.message.type });
  }
}

async function handleFileMessage(event: MessageEvent, context: LineContext): Promise<void> {
  if (!['image', 'video', 'audio', 'file'].includes(event.message.type)) {
    return;
  }

  const messageService = new MessageService(config.bot.language);
  const messageId = event.message.id;
  const fileType = event.message.type;

  logger.fileProcessing(messageId, fileType);

  // Get file info
  let fileName = 'unknown';
  if (event.message.type === 'file' && 'fileName' in event.message) {
    fileName = event.message.fileName || 'file';
  } else {
    // Generate filename for media types
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const extension = fileType === 'image' ? 'jpg' : fileType === 'video' ? 'mp4' : fileType === 'audio' ? 'm4a' : 'bin';
    fileName = `${fileType}_${timestamp}.${extension}`;
  }

  // TODO: Phase 2 - Download and store file
  // For now, just acknowledge
  const response = config.bot.language === 'th'
    ? `📨 ได้รับไฟล์แล้วค่ะ: ${fileName}\n\n⏳ ฟีเจอร์บันทึกไฟล์กำลังพัฒนา... จะพร้อมใช้งานในเร็วๆ นี้!`
    : `📨 File received: ${fileName}\n\n⏳ File storage feature is under development... Coming soon!`;

  await lineService.replyMessage(event.replyToken, response);
}

// ============================================
// Main Webhook Handler
// ============================================

export async function handleWebhookEvent(event: WebhookEvent): Promise<void> {
  try {
    switch (event.type) {
      case 'follow':
        await handleFollowEvent(event);
        break;

      case 'unfollow':
        await handleUnfollowEvent(event);
        break;

      case 'join':
        await handleJoinEvent(event);
        break;

      case 'message':
        await handleMessageEvent(event);
        break;

      case 'postback':
      case 'beacon':
      case 'memberJoined':
      case 'memberLeft':
      case 'accountLink':
        logger.debug('Event type not yet implemented', { type: event.type });
        break;

      default:
        logger.warn('Unknown event type', { type: (event as any).type });
    }
  } catch (error) {
    logger.error('Webhook event handler failed', error, { eventType: event.type });
    throw error;
  }
}

export async function handleWebhookEvents(events: WebhookEvent[]): Promise<void> {
  await Promise.all(events.map(event => handleWebhookEvent(event)));
}
