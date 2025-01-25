export interface ProfileData {
  name: string;
  email: string;
  role: string;
  avatar?: string;
  tasks: {
    total: number;
    pending: number;
    completed: number;
  };
} 