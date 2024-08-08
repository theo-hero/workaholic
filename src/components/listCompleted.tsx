import RoundButton from "./round_button";
import { useTodoTools } from "../context/todoContext";
import deleteButton from "../assets/delete.png"
import { List } from "../@types/todo";

function ListCompleted() {
    const { handleDelete, completedTasks } = useTodoTools();

    const processArray = (list: List[]) => {
        return (list && list.map((task, key) => {
            return (
                <div className='todolist__item' key={key}>
                    <RoundButton whenClicked={handleDelete} image={deleteButton} args={[key]} />
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