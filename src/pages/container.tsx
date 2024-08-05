import List from "../components/todolist"
import Timer from "../components/timer";
import { useTodoTools } from "../context/todoContext";
import { Link } from "react-router-dom";

function Container() {
    const { newTasks, completedTasks } = useTodoTools();

    return (
        <>
            <Link to='/login'>Зайти в аккаунт</Link>
            <div className='container'>
                <Timer />
                <List add={true} list={newTasks} type='todolist_new' />
                <List add={false} list={completedTasks} type='todolist_completed' />
            </div>
        </>
    )
}

export default Container;