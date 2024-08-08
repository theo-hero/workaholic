import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import History from './history';

export default function Account() {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
        return;
    }, [user, navigate]);

    return (
        <div className='account'>
            <><p>{`Добро пожаловать, ${user?.displayName}`}</p><button onClick={() => signOut(auth)}>Выйти</button></>
            <History />
        </div>
    )
}