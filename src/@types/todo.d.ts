import { CollectionReference } from "firebase/firestore";

export interface ListProps {
    add?: boolean;
    list?: string[];
    type?: string;
}

type addToList = (task: List) => void;
type moveToCompleted = (task: List, key: number) => void;
type deleteFromCompleted = (key: number) => void;

export interface ButtonProps {
    whenClicked: addToList | moveToCompleted | deleteFromCompleted;
    image: string;
    task?: List;
    key?: number;
}

export interface ContextTodoTypes {
    addToList: addToList;
    moveToCompleted: moveToCompleted;
    deleteFromCompleted: deleteFromCompleted;
    newTasks?: List[];
    completedTasks?: List[];
    setNewTasks?: Dispatch<SetStateAction<List[]>>;
    setCompletedTasks?: Dispatch<SetStateAction<List[]>>;
}

export interface ContextData {
    fetchObjects: (ref: CollectionReference, setValue: (args: any) => void) => void;
    deleteEntry: (id: string, collection_name: string) => void;
    addToDatabase: (entry: List, ref: CollectionReference) => void;
    generateID: () => string;
    newRef: CollectionReference;
    completedRef: CollectionReference;
}

export interface Input_time {
    setNewTime: (number) => void;
    start_stop: () => void;
}

export interface List {
    text: string;
    taskID: string;
}

export interface Input {
    dataRef: CollectionReference;
}