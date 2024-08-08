import { auth, provider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import History from './history';

export default function Login() {
    const navigate = useNavigate();

    const signIn = async () => {
        await signInWithPopup(auth, provider);
        navigate('/');
    }

    return (
        <div className='login'>
            <button onClick={signIn}>Войти через Google</button>
            <History />
        </div>
    )
}