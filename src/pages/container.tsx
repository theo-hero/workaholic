import List from "../components/todolist"
import { useTodoTools, TodoProvider } from "../context/todoContext";

function Container() {
    const { newTasks, completedTasks } = useTodoTools();

    return (
        <div className='container'>
            <TodoProvider>
                <List add={true} list={newTasks} type='todolist_new' />
                <List add={false} list={completedTasks} type='todolist_completed' />
            </TodoProvider>
        </div>
    )
}

export default Container;