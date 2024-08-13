import React, { useRef, useEffect } from "react";
import { Input_time } from "../@types/todo";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;

export function InputField({ setNewTime }: Input_time) {
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const handleEnterPress = () => {
        const hoursValue = inputsRef.current[0]?.value || '0';
        const minutesValue = inputsRef.current[1]?.value || '0';
        const secondsValue = inputsRef.current[2]?.value || '0';

        const totalSeconds = parseInt(hoursValue) * HOUR +
            parseInt(minutesValue) * MINUTE +
            parseInt(secondsValue) * SECOND;
        setNewTime(totalSeconds);

        inputsRef.current.forEach(input => input && (input.value = ''));

        const activeElement = document.activeElement as HTMLElement | null;
        activeElement?.blur();
    };


    const handleKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleEnterPress();
            event.preventDefault();
            return;
        }

        const currentIndex = inputsRef.current.findIndex(input => input === event.currentTarget);
        if (event.key === 'ArrowLeft' && currentIndex > 0) {
            inputsRef.current[currentIndex - 1]?.focus();
        } else if (event.key === 'ArrowRight' && currentIndex < inputsRef.current.length - 1) {
            inputsRef.current[currentIndex + 1]?.focus();
        }
    };

    useEffect(() => {
        inputsRef.current = [
            document.getElementById('hours') as HTMLInputElement,
            document.getElementById('minutes') as HTMLInputElement,
            document.getElementById('seconds') as HTMLInputElement,
        ];
    }, []);

    return (
        <form className='timer__input'>
            <input id="hours" ref={el => el && (inputsRef.current[0] = el)} onKeyDown={handleKey} autoComplete="off" />
            <input id="minutes" ref={el => el && (inputsRef.current[1] = el)} onKeyDown={handleKey} autoComplete="off" />
            <input id="seconds" ref={el => el && (inputsRef.current[2] = el)} onKeyDown={handleKey} autoComplete="off" />
        </form>
    );
}