import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Task {
  id: number;
  time: string;
  summary: string;
  detail: string;
  date: Date;
  color: string;
  status: string;
}

interface TaskContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  addTask: (newTask: Omit<Task, 'id'>) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (newTask: Omit<Task, 'id'>) => {
    const taskWithId = { ...newTask, id: Date.now() };
    setTasks((prevTasks) => [...prevTasks, taskWithId]);
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}; 