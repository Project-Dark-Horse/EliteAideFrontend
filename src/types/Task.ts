export interface Task {
  id: number;
  summary: string;
  detail: string;
  category: string;
  priority: string;
  time: string;
  date: Date;
  reminder: boolean;
  completed: boolean;
  color: string;
} 