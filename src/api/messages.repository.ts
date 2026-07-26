import { delay } from './delay';

export interface Message {
  id: string;
  projectId: string;
  senderId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

const mockMessages: Message[] = [];

class MessagesRepository {
  async getByProject(projectId: string): Promise<Message[]> {
    await delay(400);
    return mockMessages.filter(m => m.projectId === projectId);
  }

  async send(projectId: string, senderId: string, content: string): Promise<Message> {
    await delay(300);
    const msg: Message = {
      id: Math.random().toString(36).substr(2, 9),
      projectId,
      senderId,
      content,
      timestamp: new Date().toISOString(),
      read: false,
    };
    mockMessages.push(msg);
    return msg;
  }
}

export const messagesRepository = new MessagesRepository();
