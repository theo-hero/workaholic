import Input from "./input";
import { useTodoTools } from "../context/todoContext";
import tick from "../assets/tick.png";
import { List } from "../@types/todo";
import { useDataTools } from "../context/databaseContext";
import { useEffect } from "react";

function ListNew() {
    const { newTasks, moveToCompleted, setNewTasks } = useTodoTools();
    const { addToDatabase, deleteEntry, fetchObjects, newRef, completedRef } = useDataTools();

    useEffect(() => {
        fetchObjects(newRef, setNewTasks);
    }, []);

    const doOnClick = (task: List, key: number) => {
        moveToCompleted(task, key);
        addToDatabase(task, completedRef);
        deleteEntry(task.taskID, "new-tasks");
    }

    const processArray = (list: List[]) => {
        return (list && list.map((task, key) => {
            return (
                <div className='todolist__item' key={key}>
                    <button onClick={() => doOnClick(task, key)} className="button-round" >
                        <img src={tick} alt="X" />
                    </button>
                    <div>{task.text}</div>
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