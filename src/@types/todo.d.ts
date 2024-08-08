export interface ListProps {
    add?: boolean;
    list?: string[];
    type?: string;
}

export interface ButtonProps {
    whenClicked: (args: any[]) => void;
    image: string;
    args: any[];
}

export interface ContextTodoTypes {
    handleAdd?: (args: any[]) => void;
    handleComplete: (args: any[]) => void;
    handleDelete: (args: any[]) => void;
    newTasks?: List[];
    completedTasks?: List[];
}

export interface ContextData {
    setObjects: (ref: CollectionReference, setValue: (args: any) => void) => void;
    deleteEntry: (id: string, collection_name: string) => void;
    addToDatabase: (entry: List, ref: CollectionReference) => void;
}

export interface Input {
    setNewTime: (number) => void;
    start_stop: () => void;
}

export interface List {
    text: string;
    taskID: SymbolConstructor;
}