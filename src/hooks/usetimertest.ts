import { useState, useEffect } from "react";

const SECOND = 1000;

export default function useTimer(timespan: number) {
  // интервал возвращает текущее время каждую секунду
  // при нажатии на старт рассчитывается финишное время (для resume отдельная логика)
  // эффект срабатывает при изменении currentTime и высчитывает оставшееся время
  const [currentTime, setCurrentTime] = useState<number>();
  const [finishTime, setFinishTime] = useState<number>();
  const [timeLeft, setTimeLeft] = useState(0);

  const start = () => setFinishTime(timespan + Date.now());

  useEffect(() => {
    const getTime = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(getTime);
  }, []);

  useEffect(() => {
    if (!finishTime) { return }

    const diff = currentTime ? finishTime - currentTime : 0;
    console.log(diff);

    if (diff >= 0) setTimeLeft(diff);
    else { setFinishTime(0); setTimeLeft(0) }; // если время сейчас совпадает с рассчитанным финишным временем
  }, [currentTime, finishTime]);

  return {
    start,
    countdown: Math.ceil(timeLeft / SECOND),
    timer: Math.ceil((timespan - timeLeft) / SECOND), // ceil, потому что порой возвращает отрицательные значения (??)
  };
}
