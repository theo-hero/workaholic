import { useState } from "react";
import { Input } from "../@types/todo";

const SECOND = 1_000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;

export function InputField({ setNewTime, start_stop }: Input) {
    const [temp, setTemp] = useState(0);
    let isNumber = (str: string) => /^\d+$/.test(str);

    function handleChange(event: any) {
        const { id, value } = event.target;
        if (!isNumber(value)) { return }

        switch(id) {
            case 'hours':
                setTemp(temp + value * HOUR);
                break;
            case 'minutes':
                setTemp(temp + value * MINUTE);
                break;
            case 'seconds':
                setTemp(temp + value * HOUR);
        }
    }

    function handleKey(event: any) {
        if (event.key === 'Enter') { 
            setNewTime(+temp);
            setTemp(0);
        }
    }

    function handleBlur(event: any) {
        event.target.value = '';
        setTemp(0);
    }

    return (
    <div className='timer__input'>
        <input id="hours" onKeyDown={ handleKey } onChange={ handleChange } onBlur={ handleBlur } />
        <input id="minutes" onKeyDown={ handleKey } onChange={ handleChange } onBlur={ handleBlur } />
        <input id="seconds" onKeyDown={ handleKey } onChange={ handleChange } onBlur={ handleBlur } />
    </div>
    )
}