import { pgTable, text, timestamp, bigint, boolean, jsonb, index } from 'drizzle-orm/pg-core';

// ============================================
// Users Table
// ============================================
export const users = pgTable('users', {
  id: text('id').primaryKey(), // LINE user ID
  displayName: text('display_name').notNull(),
  pictureUrl: text('picture_url'),
  language: text('language').default('th'), // 'th' | 'en'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  lastActiveAt: timestamp('last_active_at').defaultNow().notNull(),
});

// ============================================
// Chat Messages Table
// ============================================
export const chatMessages = pgTable('chat_messages', {
  id: text('id').primaryKey(), // UUID
  userId: text('user_id').notNull().references(() => users.id),
  groupId: text('group_id'), // LINE group ID (if message is in a group)
  roomId: text('room_id'), // LINE room ID (if message is in a room)
  messageType: text('message_type').notNull(), // 'text', 'image', 'video', etc.
  messageId: text('message_id').notNull().unique(), // LINE message ID
  text: text('text'), // Message text content (if applicable)
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  metadata: jsonb('metadata'), // Additional metadata
}, (table) => ({
  userIdIdx: index('chat_messages_user_id_idx').on(table.userId),
  groupIdIdx: index('chat_messages_group_id_idx').on(table.groupId),
  timestampIdx: index('chat_messages_timestamp_idx').on(table.timestamp),
}));

// ============================================
// Files Table
// ============================================
export const files = pgTable('files', {
  id: text('id').primaryKey(), // UUID
  messageId: text('message_id').notNull().unique().references(() => chatMessages.messageId),
  userId: text('user_id').notNull().references(() => users.id),
  groupId: text('group_id'), // LINE group ID (if file is from a group)
  fileName: text('file_name').notNull(),
  fileType: text('file_type').notNull(), // 'image' | 'video' | 'audio' | 'file'
  mimeType: text('mime_type').notNull(),
  fileSize: bigint('file_size', { mode: 'number' }).notNull(),
  lineUrl: text('line_url').notNull(), // Temporary LINE URL
  driveFileId: text('drive_file_id'), // Google Drive file ID
  driveUrl: text('drive_url'), // Permanent Google Drive URL
  thumbnailUrl: text('thumbnail_url'),
  isIndexed: boolean('is_indexed').default(false).notNull(), // Whether AI has indexed
  uploadedAt: timestamp('uploaded_at').defaultNow().notNull(),
  metadata: jsonb('metadata'), // Additional metadata
}, (table) => ({
  userIdIdx: index('files_user_id_idx').on(table.userId),
  groupIdIdx: index('files_group_id_idx').on(table.groupId),
  fileTypeIdx: index('files_file_type_idx').on(table.fileType),
  uploadedAtIdx: index('files_uploaded_at_idx').on(table.uploadedAt),
  isIndexedIdx: index('files_is_indexed_idx').on(table.isIndexed),
}));

// ============================================
// Search Queries Table
// ============================================
export const searchQueries = pgTable('search_queries', {
  id: text('id').primaryKey(), // UUID
  userId: text('user_id').notNull().references(() => users.id),
  query: text('query').notNull(),
  resultsCount: bigint('results_count', { mode: 'number' }).notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('search_queries_user_id_idx').on(table.userId),
  timestampIdx: index('search_queries_timestamp_idx').on(table.timestamp),
}));

// ============================================
// Type exports
// ============================================
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type ChatMessage = typeof chatMessages.$inferSelect;
export type NewChatMessage = typeof chatMessages.$inferInsert;

export type FileRecord = typeof files.$inferSelect;
export type NewFileRecord = typeof files.$inferInsert;

export type SearchQuery = typeof searchQueries.$inferSelect;
export type NewSearchQuery = typeof searchQueries.$inferInsert;
