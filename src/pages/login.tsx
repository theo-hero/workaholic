import { auth, provider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    const signIn = async () => {
        await signInWithPopup(auth, provider);
        navigate('/');
    }

    return (
        <>
            <button onClick={signIn}>Login with google</button>
            <p>{user?.displayName}</p>
            <Link to='/'>Вернуться на домашнюю страницу</Link>
        </>
    )
}