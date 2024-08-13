import React, { useContext, useState, createContext } from 'react';
import { ContextTodoTypes, List } from '../@types/todo';
import { useDataTools } from './databaseContext';

const TodoContext = createContext<ContextTodoTypes | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
    const [newTasks, setNewTasks] = useState<List[]>([]);
    const [completedTasks, setCompletedTasks] = useState<List[]>([]);

    function addToList(task: List) {
        setNewTasks(prev => [...prev, task]);
    }

    function moveToCompleted(task: List, key: number) {
        setCompletedTasks(prev => [...prev, task]);
        setNewTasks(prev => [
            ...prev.slice(0, key),
            ...prev.slice(key + 1)
        ]);
    }

    function deleteFromCompleted(key: number) {
        setCompletedTasks(prev => [
            ...prev.slice(0, key),
            ...prev.slice(key + 1)
        ]);
    }

    return (
        <TodoContext.Provider value={{ addToList, moveToCompleted, deleteFromCompleted, newTasks, completedTasks, setNewTasks, setCompletedTasks }}>
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