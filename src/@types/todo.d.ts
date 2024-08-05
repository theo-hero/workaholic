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

export interface ContextContainer {
    handleAdd?: (args: any[]) => void;
    handleComplete: (args: any[]) => void;
    handleDelete: (args: any[]) => void;
    newTasks?: string[];
    completedTasks?: string[];
}

export interface Input {
    setNewTime: (number) => void;
    start_stop: () => void;
}