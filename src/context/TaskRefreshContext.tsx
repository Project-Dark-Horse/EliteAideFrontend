import React, { createContext, useState, useContext } from 'react';

interface TaskRefreshContextType {
  shouldRefresh: boolean;
  setShouldRefresh: (value: boolean) => void;
}

const TaskRefreshContext = createContext<TaskRefreshContextType>({
  shouldRefresh: false,
  setShouldRefresh: () => {},
});

export const TaskRefreshProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shouldRefresh, setShouldRefresh] = useState(false);

  return (
    <TaskRefreshContext.Provider value={{ shouldRefresh, setShouldRefresh }}>
      {children}
    </TaskRefreshContext.Provider>
  );
};

export const useTaskRefresh = () => useContext(TaskRefreshContext); 
