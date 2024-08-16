import { useState, useEffect } from "react";

import { addDoc, collection } from 'firebase/firestore';
import { database } from '../config/firebase';
import { Interval, TimerProps } from "../@types/intervals";

const SECOND = 1_000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const intervalsRef = collection(database, "intervals");
const audio = new Audio("../gong-signal.wav");

async function addToDatabase(entry: Interval) {
  await addDoc(intervalsRef, {
    ...entry
  })
}

export default function useTimer({timespan, tasks, interval = SECOND}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(timespan);
  const [timerOn, setTimerOn] = useState(false);

  function onExpire() {
    if ((timeLeft / SECOND) < 1) {
      setTimerOn(false);
      audio.play();
      console.log(tasks ? tasks.filter((task) => task.focused).map((task) => task.text).join('\n') : "Дело сделано");
      addToDatabase({
        duration: (timespan - timeLeft) / SECOND,
        task: tasks ? tasks.filter((task) => task.focused).map((task) => task.text).join('\n') : "Дело сделано",
      });
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    if (!timerOn || timespan < SECOND) { return }

    const intervalId = setInterval(() => {
      if (onExpire()) { return };
      setTimeLeft((_timespan) => _timespan - interval);
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

