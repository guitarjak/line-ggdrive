import type { WebhookEvent, Message } from '@line/bot-sdk';

// ============================================
// Database Types
// ============================================

export interface User {
  id: string; // LINE user ID
  displayName: string;
  pictureUrl?: string;
  language?: 'th' | 'en';
  createdAt: Date;
  lastActiveAt: Date;
}

export interface ChatMessage {
  id: string;
  userId: string;
  groupId?: string;
  roomId?: string;
  messageType: string;
  messageId: string;
  text?: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export interface FileRecord {
  id: string;
  messageId: string;
  userId: string;
  groupId?: string;
  fileName: string;
  fileType: 'image' | 'video' | 'audio' | 'file';
  mimeType: string;
  fileSize: number;
  lineUrl: string; // Original LINE URL (temporary)
  driveFileId?: string; // Google Drive file ID
  driveUrl?: string; // Permanent Google Drive URL
  thumbnailUrl?: string;
  isIndexed: boolean; // Whether AI has indexed this file
  uploadedAt: Date;
  metadata?: Record<string, unknown>;
}

export interface SearchQuery {
  id: string;
  userId: string;
  query: string;
  resultsCount: number;
  timestamp: Date;
}

// ============================================
// LINE Bot Types
// ============================================

export interface LineUser {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  language?: string;
}

export interface LineContext {
  userId: string;
  groupId?: string;
  roomId?: string;
  type: 'user' | 'group' | 'room';
}

export interface CommandHandler {
  command: string;
  description: string;
  handler: (event: WebhookEvent, context: LineContext) => Promise<void>;
}

// ============================================
// Bot Messages (i18n)
// ============================================

export interface BotMessages {
  welcome: string;
  help: string;
  status: string;
  fileReceived: string;
  fileSaved: string;
  fileError: string;
  searchNoResults: string;
  searchResults: string;
  error: string;
  commandNotFound: string;
}

// ============================================
// Service Types
// ============================================

export interface FileDownloadResult {
  buffer: Buffer;
  mimeType: string;
  fileSize: number;
}

export interface GoogleDriveUploadResult {
  fileId: string;
  webViewLink: string;
  webContentLink: string;
  thumbnailLink?: string;
}

export interface SearchResult {
  fileId: string;
  fileName: string;
  fileType: string;
  driveUrl: string;
  thumbnailUrl?: string;
  relevanceScore: number;
  uploadedAt: Date;
  context?: string; // Conversation context
}

// ============================================
// Queue Job Types
// ============================================

export interface FileProcessJob {
  messageId: string;
  userId: string;
  groupId?: string;
  fileType: 'image' | 'video' | 'audio' | 'file';
}

export interface IndexFileJob {
  fileRecordId: string;
  driveFileId: string;
  fileName: string;
  fileType: string;
}

// ============================================
// Utility Types
// ============================================

export type MessageType = Message['type'];

export interface ErrorWithCode extends Error {
  code?: string;
  statusCode?: number;
}
