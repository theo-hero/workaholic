import React, { useContext, createContext } from 'react';
import { ContextData, List } from '../@types/todo';
import { setDoc, deleteDoc, doc, getDocs, CollectionReference, collection } from "firebase/firestore";
import { database } from "../config/firebase";

const dataContext = createContext<ContextData | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
    const newRef = collection(database, "new-tasks");
    const completedRef = collection(database, "completed");

    const deleteEntry = (id: string, collection_name: string) => {
        deleteDoc(doc(database, collection_name, id));
    }

    const generateID = () => {
        return Date.now().toString(36) + Math.floor(Math.random() * 100);
    }

    const addToDatabase = async (entry: List, ref: CollectionReference) => {
        const {taskID: id, ...data} = entry;
        await setDoc(doc(ref, id), data);
    }

    const fetchObjects = async (ref: CollectionReference, setValue: (args: any) => void) => {
        const newValue = await getDocs(ref);
        setValue(newValue.docs.map((doc) => ({...doc.data(), taskID: doc.id})));
    }

    return (
        <dataContext.Provider value={{ fetchObjects, deleteEntry, addToDatabase, generateID, newRef, completedRef }}>
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