import { Client, ClientConfig, WebhookEvent, TextMessage, MessageAPIResponseBase } from '@line/bot-sdk';
import { config } from '../config/index.js';
import { logger } from '../utils/logger.js';
import type { LineUser, FileDownloadResult } from '../types/index.js';

// LINE Client configuration
const clientConfig: ClientConfig = {
  channelAccessToken: config.line.channelAccessToken,
  channelSecret: config.line.channelSecret,
};

export class LineService {
  private client: Client;

  constructor() {
    this.client = new Client(clientConfig);
  }

  /**
   * Reply to a message event
   */
  async replyMessage(replyToken: string, messages: string | string[]): Promise<MessageAPIResponseBase> {
    try {
      const messageArray = Array.isArray(messages) ? messages : [messages];
      const textMessages: TextMessage[] = messageArray.map(text => ({
        type: 'text',
        text,
      }));

      return await this.client.replyMessage(replyToken, textMessages);
    } catch (error) {
      logger.error('Failed to reply message', error);
      throw error;
    }
  }

  /**
   * Push a message to a user or group
   */
  async pushMessage(to: string, messages: string | string[]): Promise<MessageAPIResponseBase> {
    try {
      const messageArray = Array.isArray(messages) ? messages : [messages];
      const textMessages: TextMessage[] = messageArray.map(text => ({
        type: 'text',
        text,
      }));

      return await this.client.pushMessage(to, textMessages);
    } catch (error) {
      logger.error('Failed to push message', error);
      throw error;
    }
  }

  /**
   * Get user profile
   */
  async getUserProfile(userId: string): Promise<LineUser> {
    try {
      const profile = await this.client.getProfile(userId);
      return {
        userId: profile.userId,
        displayName: profile.displayName,
        pictureUrl: profile.pictureUrl,
        language: profile.language,
      };
    } catch (error) {
      logger.error('Failed to get user profile', error);
      throw error;
    }
  }

  /**
   * Get group member profile
   */
  async getGroupMemberProfile(groupId: string, userId: string): Promise<LineUser> {
    try {
      const profile = await this.client.getGroupMemberProfile(groupId, userId);
      return {
        userId: profile.userId,
        displayName: profile.displayName,
        pictureUrl: profile.pictureUrl,
      };
    } catch (error) {
      logger.error('Failed to get group member profile', error);
      throw error;
    }
  }

  /**
   * Download file content from LINE
   */
  async downloadFile(messageId: string): Promise<FileDownloadResult> {
    try {
      const stream = await this.client.getMessageContent(messageId);
      const chunks: Buffer[] = [];

      return new Promise((resolve, reject) => {
        stream.on('data', (chunk: Buffer) => {
          chunks.push(chunk);
        });

        stream.on('end', () => {
          const buffer = Buffer.concat(chunks);
          const contentType = stream.headers['content-type'] as string || 'application/octet-stream';

          resolve({
            buffer,
            mimeType: contentType,
            fileSize: buffer.length,
          });
        });

        stream.on('error', (error) => {
          logger.error('Failed to download file', error);
          reject(error);
        });
      });
    } catch (error) {
      logger.error('Failed to get message content', error);
      throw error;
    }
  }

  /**
   * Verify webhook signature
   */
  verifySignature(body: string, signature: string): boolean {
    try {
      const crypto = require('crypto');
      const hash = crypto
        .createHmac('SHA256', config.line.channelSecret)
        .update(body)
        .digest('base64');

      return hash === signature;
    } catch (error) {
      logger.error('Failed to verify signature', error);
      return false;
    }
  }

  /**
   * Get the raw client (for advanced usage)
   */
  getClient(): Client {
    return this.client;
  }
}

// Export a singleton instance
export const lineService = new LineService();
