export type MessageType = 'text' | 'quick_actions' | 'task_type' | 'urgency' | 'datetime';

export interface TaskData {
  name?: string;
  type?: string;
  urgency?: string;
  deadline?: Date;
  description?: string;
  autoComplete?: boolean;
}

export interface ChatMessage {
  id: string;
  isAI: boolean;
  message: string;
  type: MessageType;
  options?: string[];
}

export const URGENCY_OPTIONS: string[] = ['High', 'Medium', 'Low']; 