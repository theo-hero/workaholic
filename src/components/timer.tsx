import useTimer from "../hooks/usetimer";
import { useState } from "react";
import { InputField } from "./input_time";
import { useTodoTools } from "../context/todoContext";

export default function Timer() {
    const [timespan, setTimespan] = useState(600_000);
    const {newTasks} = useTodoTools();
    const { hours, minutes, seconds, start_stop, restart, degrees, timerOn } = useTimer({timespan: timespan, tasks: newTasks});

    let niceLook = (number: number) => number.toString().padStart(2, '0');

    return (
        <div className="timer">
            <div className="timer__numbers">
                <span id="time">{niceLook(hours)}:{niceLook(minutes)}:{niceLook(seconds)}</span>
                <InputField setNewTime={setTimespan} start_stop={start_stop} />
            </div>
            <div className="buttons">
                <button onClick={start_stop}>{timerOn ? 'Стоп' : 'Начать'}</button>
                <button onClick={restart}>Заново</button>
            </div>
            <div id="circle__sector" style={{ background: 'conic-gradient(var(--secondary) ' + degrees + 'deg, var(--background) ' + degrees + 'deg 360deg)' }} />
            <div id="circle__inner" />
        </div>
    )
}