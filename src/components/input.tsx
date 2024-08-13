import { useState } from "react";
import { useTodoTools, TodoProvider } from "../context/todoContext";
import { useDataTools } from "../context/databaseContext";
import { Input as InputType } from "../@types/todo";

function Input({dataRef}: InputType) {
    const { addToList } = useTodoTools();
    const { addToDatabase, generateID } = useDataTools();
    const [newText, setNewText] = useState('');

    function doOnSubmit() {
        if (newText) {
            let newEntry = {
                text: newText,
                taskID: generateID(),
            };
            addToList(newEntry);
            addToDatabase(newEntry, dataRef);
        }
    }

    function handleChange(event: any) {
        setNewText(event.target.value);
    }

    function handleKey(event: any) {
        if (event.key === "Enter" && newText) {
            doOnSubmit();
        }
    }
    
    return (
        <TodoProvider><div className="todolist__field">
            <input id="todo-input" placeholder="Что хочешь сделать?" onChange={ handleChange } onKeyDown={ handleKey } autoComplete="off"></input>
            <button onClick={ doOnSubmit }>Добавить</button>
        </div></TodoProvider>
    );
}

export default Input;