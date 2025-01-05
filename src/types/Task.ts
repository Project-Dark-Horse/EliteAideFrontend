export interface BaseTask {
  id: number;
  title: string;
  description: string;
  status: string;
  due_date: string;
  type: string;
  priority: number;
}

export interface FormattedTask extends BaseTask {
  time: string;
  day?: string;
  backgroundColor: string;
  iconName: string;
} 