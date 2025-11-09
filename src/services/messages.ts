import type { BotMessages } from '../types/index.js';

// ============================================
// Thai Messages
// ============================================
export const messagesTH: BotMessages = {
  welcome: `สวัสดีค่ะ! 👋\n\nฉันคือบอทช่วยจัดเก็บและค้นหาไฟล์จากไลน์ของคุณ 🤖\n\nพิมพ์ /help เพื่อดูคำสั่งที่ใช้ได้นะคะ`,

  help: `📚 คำสั่งที่ใช้ได้:\n\n` +
    `🔹 /help - แสดงข้อความช่วยเหลือนี้\n` +
    `🔹 /status - ตรวจสอบสถานะของบอท\n` +
    `🔹 /save - บันทึกไฟล์ที่คุณส่งมา\n` +
    `🔹 /list - ดูรายการไฟล์ทั้งหมดของคุณ\n` +
    `🔹 /search <คำค้นหา> - ค้นหาไฟล์ด้วย AI\n\n` +
    `💡 เคล็ดลับ: ส่งไฟล์มาแล้วตอบกลับด้วยคำว่า "เก็บ" หรือ "save" ฉันจะช่วยเก็บให้นะคะ!`,

  status: `✅ บอททำงานปกติ\n\n` +
    `📊 ข้อมูลระบบ:\n` +
    `- ฐานข้อมูล: {{dbStatus}}\n` +
    `- Google Drive: {{driveStatus}}\n` +
    `- AI Search: {{aiStatus}}\n\n` +
    `เวอร์ชัน: 1.0.0`,

  fileReceived: `📨 ได้รับไฟล์ของคุณแล้วค่ะ!\n\nชื่อไฟล์: {{fileName}}\nขนาด: {{fileSize}}\n\nต้องการให้ฉันบันทึกไฟล์นี้ไหมคะ? พิมพ์ /save เพื่อบันทึก`,

  fileSaved: `✅ บันทึกไฟล์สำเร็จแล้วค่ะ!\n\n📁 {{fileName}}\n🔗 ดูไฟล์: {{driveUrl}}\n\nคุณสามารถค้นหาไฟล์นี้ได้ทุกเมื่อด้วยคำสั่ง /search`,

  fileError: `❌ เกิดข้อผิดพลาดในการบันทึกไฟล์\n\nกรุณาลองใหม่อีกครั้งค่ะ หรือติดต่อผู้ดูแลระบบ`,

  searchNoResults: `🔍 ไม่พบไฟล์ที่ตรงกับคำค้นหา: "{{query}}"\n\nลองใช้คำค้นหาอื่นดูนะคะ`,

  searchResults: `🔍 พบ {{count}} ไฟล์ที่ตรงกับคำค้นหา: "{{query}}"\n\n{{results}}`,

  error: `❌ เกิดข้อผิดพลาด\n\nกรุณาลองใหม่อีกครั้งค่ะ`,

  commandNotFound: `❓ ไม่เข้าใจคำสั่งนี้ค่ะ\n\nพิมพ์ /help เพื่อดูคำสั่งที่ใช้ได้`,
};

// ============================================
// English Messages
// ============================================
export const messagesEN: BotMessages = {
  welcome: `Hello! 👋\n\nI'm a bot that helps you store and search files from LINE 🤖\n\nType /help to see available commands`,

  help: `📚 Available Commands:\n\n` +
    `🔹 /help - Show this help message\n` +
    `🔹 /status - Check bot status\n` +
    `🔹 /save - Save the file you sent\n` +
    `🔹 /list - View all your files\n` +
    `🔹 /search <query> - Search files with AI\n\n` +
    `💡 Tip: Send a file and reply with "save" - I'll store it for you!`,

  status: `✅ Bot is running normally\n\n` +
    `📊 System Info:\n` +
    `- Database: {{dbStatus}}\n` +
    `- Google Drive: {{driveStatus}}\n` +
    `- AI Search: {{aiStatus}}\n\n` +
    `Version: 1.0.0`,

  fileReceived: `📨 File received!\n\nFile name: {{fileName}}\nSize: {{fileSize}}\n\nWould you like me to save this file? Type /save to store it`,

  fileSaved: `✅ File saved successfully!\n\n📁 {{fileName}}\n🔗 View file: {{driveUrl}}\n\nYou can search for this file anytime with /search`,

  fileError: `❌ Error saving file\n\nPlease try again or contact the administrator`,

  searchNoResults: `🔍 No files found matching: "{{query}}"\n\nTry a different search term`,

  searchResults: `🔍 Found {{count}} files matching: "{{query}}"\n\n{{results}}`,

  error: `❌ An error occurred\n\nPlease try again`,

  commandNotFound: `❓ Command not recognized\n\nType /help to see available commands`,
};

// ============================================
// Message Helper
// ============================================
export class MessageService {
  private messages: BotMessages;

  constructor(language: 'th' | 'en' = 'th') {
    this.messages = language === 'th' ? messagesTH : messagesEN;
  }

  get(key: keyof BotMessages, replacements?: Record<string, string>): string {
    let message = this.messages[key];

    if (replacements) {
      Object.entries(replacements).forEach(([key, value]) => {
        message = message.replace(new RegExp(`{{${key}}}`, 'g'), value);
      });
    }

    return message;
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
