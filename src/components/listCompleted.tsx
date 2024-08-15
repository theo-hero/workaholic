import { useTodoTools } from "../context/todoContext";
import deleteButton from "../assets/delete.png"
import { List } from "../@types/todo";
import { useDataTools } from "../context/databaseContext";
import { useEffect, useState } from "react";
import { ReactComponent as Rubbish } from "../assets/rubbish-bin.svg";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../config/firebase";

function ListCompleted() {
    const { deleteFromCompleted, completedTasks, setCompletedTasks } = useTodoTools();
    const { deleteEntry, fetchObjects, completedRef } = useDataTools();
    const [showArchived, setShowArchived] = useState<boolean>(false);

    useEffect(() => {
        fetchObjects(completedRef, setCompletedTasks);
    }, []);

    const deleteTask = (task: List, key: number) => {
        deleteFromCompleted(key);
        deleteEntry(task.taskID, "completed");
    }

    const archiveTask = async (task: List, key: number) => {
        setCompletedTasks((prev: List[]) => [
            ...prev.slice(0, key),
            { ...task, archived: true },
            ...prev.slice(key + 1)
        ]);
        await updateDoc(doc(database, "completed", task.taskID), { archived: true });
    };

    const processArray = (list: List[]) => {
        return (list && list.map((task, key) => {
            const classList = `todolist__item ${task.archived === showArchived ? 'todolist__item_show' : 'todolist__item_hide'}`;

            return (
                <div className={classList} key={key}>
                    {task.archived ? <button onClick={() => deleteTask(task, key)} className="button-round">
                        <Rubbish />
                    </button> : <button className="button-round" onClick={() => archiveTask(task, key)}>
                        <img src={deleteButton} alt="X" />
                    </button>}
                    <div>{task.text}</div>
                    {!task.archived && <button onClick={() => deleteTask(task, key)} className="button-round todolist__item__delete-button">
                        <Rubbish />
                    </button>}
                </div>
            )
        }));
    }

    return (
        <div className='todolist-container todolist_completed'>
            <span>
                <h1 onClick={() => setShowArchived(false)} className={`${showArchived && 'inactive'}`}>Выполнено</h1> /
                <h1 onClick={() => setShowArchived(true)} className={`${!showArchived && 'inactive'}`}>Архив</h1>
            </span>
            <div className='todolist__list'>
                {processArray(completedTasks || [])}
            </div>
        </div>
    )
}

export default ListCompleted;

// git restore .