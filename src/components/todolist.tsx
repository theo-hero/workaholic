import Input from "./input";
import RoundButton from "./round_button";
import { useTodoTools } from "../context/todoContext";
import tick from "../assets/tick.png";
import deleteButton from "../assets/delete.png"
import { ListProps } from "../@types/todo";

function List({ add, list, type }: ListProps) {
    const { handleComplete, handleDelete } = useTodoTools();

    return (
        <div className={`todolist-container ${type}`}>
            { add ? <Input /> : <h1>Выполненные задания</h1>}
            <div className='todolist__list'>
                {list && list.map((task, key) => {return (
                    <div className='todolist__item'>
                        { add ? <RoundButton whenClicked={ handleComplete } image={ tick } args={ [task, key] } /> 
                        : <RoundButton whenClicked={ handleDelete } image={ deleteButton } args={ [key] } /> }
                        <div>{ task }</div>
                    </div>
                )})}
            </div>
        </div>
    )
}

export default List;