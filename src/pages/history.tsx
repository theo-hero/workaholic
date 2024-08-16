import { Interval } from "../@types/intervals";
import { getDocs, deleteDoc, doc, collection } from "firebase/firestore";
import { database } from "../config/firebase";
import { useEffect, useState } from "react";

export default function History() {
    const intervalsRef = collection(database, "intervals");
    const [intervals, setIntervals] = useState<any[]>([]);

    function handleDelete(id: string) {
        deleteDoc(doc(database, "intervals", id));
        handleHistory();
    }

    const processDuration = (time: number) => {
        if (time > 359) { return Math.round(time / 360) + ":" + Math.round(time / 60).toString().padStart(2, '0') + ":" + (time % 60).toString().padStart(2, '0')}
        if (time > 59) { return Math.round(time / 60) + ":" + (time % 60).toString().padStart(2, '0') }
        return time + ' с';
    }

    const processEntries = (data: Interval) => {
            return <div className="intervals__interval">
                <div className="duration">{processDuration(data.duration)}</div>
                <p>{data.task}</p>
                <button className="button-round" onClick={() => handleDelete(data.id || "")}>X</button>
            </div>
    }

    const handleHistory = async () => {
        const intervals = await getDocs(intervalsRef);
        setIntervals(intervals.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    useEffect(() => {
        handleHistory();
    }, [])

    return (
        <div className="intervals">
            {intervals.map((data) => processEntries(data))}
        </div>
    )
}