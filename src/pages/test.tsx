import useTimer from "../hooks/usetimer2";

const Test = () => {
    const {start, timer, countdown} = useTimer(10_000);

    return (
        <>
            <button onClick={start}>start</button>
            <div>{timer}</div>
            <div>{countdown}</div>
        </>
    );
};

export default Test;