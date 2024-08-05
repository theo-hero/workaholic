import { useState, useEffect } from "react";

const SECOND = 1_000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export default function useTimer(timespan: number, interval = SECOND) {
    const [timeLeft, setTimeLeft] = useState(timespan);
    const [timerOn, setTimerOn] = useState(false);

    function onExpire() {
        if ((timeLeft / SECOND) < 2) { 
            setTimerOn(false);
        }
    }
  
    useEffect(() => {
        if (!timerOn) { return }
    
        const intervalId = setInterval(() => {
            setTimeLeft((_timespan) => _timespan - interval);
            onExpire();
        }, interval);
  
        return () => {
            clearInterval(intervalId);
        };
    }, [timeLeft, timerOn, timespan]);
  
    useEffect(() => {
      setTimeLeft(timespan);
    }, [timespan]);
  
    return {
      days: Math.floor(timeLeft / DAY),
      hours: Math.floor((timeLeft / HOUR) % 24),
      minutes: Math.floor((timeLeft / MINUTE) % 60),
      seconds: Math.floor((timeLeft / SECOND) % 60),
      timeLeft: timeLeft,
      start_stop: () => setTimerOn(!timerOn),
      restart: () => {
        setTimeLeft(timespan);
        setTimerOn(false);
      },
      degrees: Math.round((timeLeft / timespan) * 360),
      timerOn: timerOn,
    };
}

