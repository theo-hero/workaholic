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

    const processEntries = (data: Interval) => {
            return <div className="intervals__interval">
                <div className="duration">{data.duration}</div>
                <div>{data.task || "something"}</div>
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