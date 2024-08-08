import { useState, useEffect } from "react";

import { addDoc, collection } from 'firebase/firestore';
import { database } from '../config/firebase';
import { Interval } from "../@types/intervals";

const SECOND = 1_000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const intervalsRef = collection(database, "intervals");

async function addToDatabase(entry: Interval) {
  await addDoc(intervalsRef, {
    duration: entry.duration,
    task: entry.task,
  })
}

export default function useTimer(timespan: number, interval = SECOND) {
  const [timeLeft, setTimeLeft] = useState(timespan);
  const [timerOn, setTimerOn] = useState(false);

  function onExpire() {
    if ((timeLeft / SECOND) < 2) {
      setTimerOn(false);
      addToDatabase({
        duration: (timespan - timeLeft) / SECOND + 1,
        task: "NEW"
      });
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

