import React, { useContext, createContext } from 'react';
import { ContextData, List } from '../@types/todo';
import { addDoc, deleteDoc, doc, getDocs, CollectionReference } from "firebase/firestore";
import { database } from "../config/firebase";

const dataContext = createContext<ContextData | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
    const deleteEntry = (id: string, collection_name: string) => {
        deleteDoc(doc(database, collection_name, id));
    }

    const addToDatabase = async (entry: List, ref: CollectionReference) => {
        await addDoc(ref, {
            text: entry.text,
            taskID: entry.taskID,
        })
    }

    const setObjects = async (ref: CollectionReference, setValue: (args: any) => void) => {
        const newValue = await getDocs(ref);
        setValue(newValue.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    return (
        <dataContext.Provider value={{ setObjects, deleteEntry, addToDatabase }}>
            {children}
        </dataContext.Provider>
    );
};

export function useDataTools() {
    const context = useContext(dataContext);

    if (!context) {
        throw new Error("useDataTools must be used within DataProvider");
    }

    return context;
}