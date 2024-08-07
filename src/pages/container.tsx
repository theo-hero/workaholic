import List from "../components/todolist"
import Timer from "../components/timer";
import { useTodoTools } from "../context/todoContext";

function Container() {
    const { newTasks, completedTasks } = useTodoTools();

    return (
        <>
            <div className='page-content'>
                <Timer />
                <List add={true} list={newTasks} type='todolist_new' />
                <List add={false} list={completedTasks} type='todolist_completed' />
            </div>
        </>
    )
}

export default Container;