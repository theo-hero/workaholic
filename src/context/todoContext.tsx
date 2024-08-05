import React, { useContext, useState, createContext } from 'react';
import { ContextContainer } from '../@types/todo';
  
  const TodoContext = createContext<ContextContainer | undefined>(undefined);
  
  export function TodoProvider({ children }: {children: React.ReactNode}) {
      const [newTasks, setNewTasks] = useState<string[]>([]);
      const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  
      function handleAdd(args: any[]) {
          const [task] = args;
          setNewTasks(prev => [...prev, task]);
      }
  
      function handleComplete(args: any[]) {
          const [task, key] = args;
          setCompletedTasks(prev => [...prev, task]);
          setNewTasks(prev => [
              ...prev.slice(0, key),
              ...prev.slice(key + 1)
          ]);
      }
  
      function handleDelete(args: any[]) {
          const [key] = args;
          setCompletedTasks(prev => [
              ...prev.slice(0, key),
              ...prev.slice(key + 1)
          ]);
      }
  
      return (
          <TodoContext.Provider value={{ handleAdd, handleComplete, handleDelete, newTasks, completedTasks }}>
              {children}
          </TodoContext.Provider>
      );
  };
  
  export function useTodoTools() {
      const context = useContext(TodoContext);
  
      if (!context) {
          throw new Error("useTodoTools must be used within TodoProvider");
      }
  
      return context;
  }