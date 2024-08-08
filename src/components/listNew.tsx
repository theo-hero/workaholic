import Input from "./input";
import RoundButton from "./round_button";
import { useTodoTools } from "../context/todoContext";
import tick from "../assets/tick.png";
import { List } from "../@types/todo";

function ListNew() {
    const { newTasks, handleComplete } = useTodoTools();

    const processArray = (list: List[]) => {
        return (list && list.map((task, key) => {
            return (
                <div className='todolist__item' key={key}>
                    <RoundButton whenClicked={handleComplete} image={tick} args={[task, key]} />
                    <div>{task.text}</div>
                </div>
            )
        }));
    }

    return (
        <div className={`todolist-container todolist_new`}>
            <Input />
            <div className='todolist__list'>
                {processArray(newTasks || [])}
            </div>
        </div>
    )
}

export default ListNew;