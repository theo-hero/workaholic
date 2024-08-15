import Input from "./input";
import { useTodoTools } from "../context/todoContext";
import tick from "../assets/tick.png";
import { List } from "../@types/todo";
import { useDataTools } from "../context/databaseContext";
import { useEffect } from "react";
import { ReactComponent as Rubbish } from "../assets/rubbish-bin.svg";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../config/firebase";

function ListNew() {
    const { newTasks, moveToCompleted, setNewTasks, deleteFromNew } = useTodoTools();
    const { addToDatabase, deleteEntry, fetchObjects, newRef, completedRef } = useDataTools();

    useEffect(() => {
        fetchObjects(newRef, setNewTasks);
    }, []);

    const moveEntry = (task: List, key: number) => {
        moveToCompleted(task, key);
        addToDatabase(task, completedRef);
        deleteEntry(task.taskID, "new-tasks");
    }

    const deleteNewTask = (task: List, key: number) => {
        deleteFromNew(key);
        deleteEntry(task.taskID, "new-tasks");
    }

    const highlightTask = async (task: List, key: number) => {
        setNewTasks((prev: List[]) => [
            ...prev.slice(0, key),
            { ...task, focused: !task.focused },
            ...prev.slice(key + 1)
        ]);
        await updateDoc(doc(database, "new-tasks", task.taskID), { focused: true });
    };

    const processArray = (list: List[]) => {
        return (list && list.map((task, key) => {
            return (
                <div className={`todolist__item ${task.focused ? 'todolist__item_focused' : ''}`} key={key} >
                    <button onClick={() => moveEntry(task, key)} className="button-round" >
                        <img src={tick} alt="X" />
                    </button>
                    <div onClick={() => highlightTask(task, key)}>{task.text}</div>
                    <button onClick={() => deleteNewTask(task, key)} className="button-round todolist__item__delete-button">
                        <Rubbish />
                    </button>
                </div>
            )
        }));
    }

    return (
        <div className={`todolist-container todolist_new`}>
            <Input dataRef={newRef} />
            <div className='todolist__list'>
                {processArray(newTasks || [])}
            </div>
        </div>
    )
}

export default ListNew;