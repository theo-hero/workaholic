'use client'

import React, { useContext } from 'react';
import { useState, createContext } from 'react';
import { ContextContainer } from '../@types/todo';

export const TodoContext = createContext<ContextContainer | null>(null);

export function TodoProvider({ children }: {children: React.ReactNode}) {
    const [newTasks, setNewTasks] = useState<string[]>([]);
    const [completedTasks, setCompletedTasks] = useState<string[]>([]);

    function handleAdd(args: any[]) {
        const [task] = args;
        setNewTasks([...newTasks, task]);
    }

    function handleComplete(args: any[]) {
        const [task, key] = args;
        setCompletedTasks([...completedTasks, task]);
        setNewTasks([...newTasks.slice(0, key), ...newTasks.slice(key + 1)]);
    }

    function handleDelete(args: any[]) {
        const [key] = args;
        setCompletedTasks([...completedTasks.slice(0, key), ...completedTasks.slice(key + 1)]);
    }

    return (
    <TodoContext.Provider value={{ handleAdd, handleComplete, handleDelete, newTasks, completedTasks }}>
        {children}
    </TodoContext.Provider>
    );
};

export function useTodoTools() {
    const Context = useContext(TodoContext);

    if (Context) {
        return Context;
    } else {
        throw new Error("useTodoTools можно использовать только внутри TodoProvider");
    }
}