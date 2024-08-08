import React, { useContext, useState, createContext } from 'react';
import { ContextTodoTypes, List } from '../@types/todo';
import { database } from "../config/firebase";
import { useDataTools } from './databaseContext';
import { collection } from 'firebase/firestore';

const TodoContext = createContext<ContextTodoTypes | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
    const [newTasks, setNewTasks] = useState<List[]>([]);
    const [completedTasks, setCompletedTasks] = useState<List[]>([]);
    const newTasksRef = collection(database, "new-tasks");
    const completedRef = collection(database, "completed");

    const { addToDatabase, deleteEntry, setObjects } = useDataTools();

    function handleAdd(args: any[]) {
        const [task] = args;
        console.log(newTasks, task);
        setNewTasks(prev => [...prev, task]);
        addToDatabase(task, newTasksRef);
    }

    function handleComplete(args: any[]) {
        const [task, key] = args;
        setCompletedTasks(prev => [...prev, task]);
        setNewTasks(prev => [
            ...prev.slice(0, key),
            ...prev.slice(key + 1)
        ]);
        addToDatabase(task, completedRef);
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