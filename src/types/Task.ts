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

export interface TaskDetails {
  id: number;
  title: string;
  description: string;
  priority: number;
  status: string;
  due_date: string;
  type: string;
  created_at: string;
  updated_at: string;
  creator: number;
}

export interface TaskResponse {
  message: {
    message: string;
    task_details: TaskDetails;
  };
} 