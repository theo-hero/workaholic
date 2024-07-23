import { useState } from "react";
import { useTodoTools, TodoProvider } from "../context/todoContext";

function Input() {
    const { handleAdd } = useTodoTools();
    const [newText, setNewText] = useState('');

    function handleChange(event: any) {
        setNewText(event.target.value);
    }

    function handleSubmit() {
        if (newText && handleAdd) {
            handleAdd([newText]);
        }
    }

    function handleKey(event: any) {
        if (event.key === "Enter" && newText && handleAdd) {
            handleAdd([newText]);
        }
    }
    
    return (
        <TodoProvider><div className="todolist__field">
            <input placeholder="Что хочешь сделать?" onChange={ handleChange } onKeyDown={ handleKey }></input>
            <button onClick={ handleSubmit }>Добавить</button>
        </div></TodoProvider>
    );
}

export default Input;