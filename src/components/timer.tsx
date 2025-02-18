import useTimer from "../hooks/usetimertest";
import { useState } from "react";
import { InputField } from "./input_time";
import { useTodoTools } from "../context/todoContext";

export default function Timer() {
    const [timespan, setTimespan] = useState(600_000);
    const {newTasks} = useTodoTools();
    const { hours, minutes, seconds, start, stop, pause, resume, degrees, timerOn, isPaused } = useTimer(timespan);

    let niceLook = (number: number) => number.toString().padStart(2, '0');

    return (
        <div className="timer">
            <div className="timer__numbers">
                <span id="time">{niceLook(hours)}:{niceLook(minutes)}:{niceLook(seconds)}</span>
                <InputField setNewTime={setTimespan} start_stop={start} />
            </div>
            <div className="buttons">
                {timerOn && (<><button onClick={stop}>Стоп</button><button onClick={pause}>Пауза</button></>)} 
                {!timerOn && isPaused && (<><button onClick={resume}>Продолжить</button><button onClick={start}>Заново</button></>)}
                {!timerOn && !isPaused && (<button onClick={start}>Начать</button>)} 
            </div>
            <div id="circle__sector" style={{ background: 'conic-gradient(var(--secondary) ' + degrees + 'deg, var(--background) ' + degrees + 'deg 360deg)' }} />
            <div id="circle__inner" />
        </div>
    )
}