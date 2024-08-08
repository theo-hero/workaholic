import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from 'firebase/firestore';
import { database } from '../config/firebase';
import { Interval } from '../@types/intervals';

export default function Form() {
    const intervalsRef = collection(database, "intervals");

    const schema = yup.object().shape({
        duration: yup.number().required(),
        task: yup.string(),
    });

    const { register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    })

    async function onPassing(data: Interval) {
        await addDoc(intervalsRef, {
            duration: data.duration,
            task: data.task || "something fun i guess",
        })
    }

    return (
        <form onSubmit={handleSubmit(onPassing)}>
            <input placeholder='Сколько минут?' {...register('duration')} />
            <input placeholder='Чем будешь заниматься?' {...register('task')} />
            <input type='submit' />
        </form>
    )
}