import { useTodoTools } from "../context/todoContext";
import deleteButton from "../assets/delete.png"
import { List } from "../@types/todo";
import { useDataTools } from "../context/databaseContext";
import { useEffect } from "react";

function ListCompleted() {
    const { deleteFromCompleted, completedTasks, setCompletedTasks } = useTodoTools();
    const { deleteEntry, fetchObjects, completedRef } = useDataTools();

    useEffect(() => {
        fetchObjects(completedRef, setCompletedTasks);
    }, []);
 
    const doOnClick = (task: List, key: number) => {
        deleteFromCompleted(key);
        deleteEntry(task.taskID, "completed");
    }

    const processArray = (list: List[]) => {
        return (list && list.map((task, key) => {
            return (
                <div className='todolist__item' key={key}>
                    <button onClick={() => doOnClick(task, key)} className="button-round" >
                        <img src={deleteButton} alt="X" />
                    </button>
                    <div>{task.text}</div>
                </div>
            )
        }));
    }

    return (
        <div className={`todolist-container todolist_completed`}>
            <h1>Выполненные задания</h1>
            <div className='todolist__list'>
                {processArray(completedTasks || [])}
            </div>
        </div>
    )
}

export default ListCompleted;