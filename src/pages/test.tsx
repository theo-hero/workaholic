import useTimer from "../hooks/usetimertest";

const Test = () => {
    const {start, stop, pause, resume, seconds, minutes, timerOn} = useTimer(30_000);

    return (
        <>
            <button onClick={start}>start</button>
            <button onClick={stop}>stop</button>
            <button onClick={pause}>pause</button>
            <button onClick={resume}>resume</button>
            <div>{seconds}</div>
            <div>{minutes}</div>
            <div>{timerOn ? "yes" : "no"}</div>
        </>
    );
};

export default Test;