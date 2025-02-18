import { useState, useEffect } from "react";

const SECOND = 1_000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;

export default function useTimer(timespan: number) {
  // интервал возвращает текущее время каждую секунду
  // при нажатии на старт рассчитывается финишное время 
  // эффект срабатывает при изменении currentTime и высчитывает оставшееся время
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [finishTime, setFinishTime] = useState<number>();
  const [timeLeft, setTimeLeft] = useState(timespan);

  const start = () => setFinishTime(timespan + Date.now());
  const stop = () => { setFinishTime(0); setTimeLeft(timespan) };
  const pause = () => setFinishTime(0);
  const resume = () => setFinishTime(timeLeft + Date.now());

  useEffect(() => {
    const getTime = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(getTime);
  }, []);

  useEffect(() => {
    if (!finishTime) { return }

    const diff = finishTime - currentTime;
    // console.log(Math.floor((diff / SECOND) % 60));

    if (diff >= 0) setTimeLeft(diff);
    else stop(); // если время сейчас совпадает с рассчитанным финишным временем
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime, finishTime, timespan]);

  return {
    start, stop, pause, resume,
    hours: Math.floor((timeLeft / HOUR) % 24),
    minutes: Math.floor((timeLeft / MINUTE) % 60),
    seconds: Math.floor((timeLeft / SECOND) % 60),
    degrees: Math.round((timeLeft / timespan) * 360),
    timerOn: Boolean(finishTime),
    isPaused: timeLeft < timespan,
  };
}
