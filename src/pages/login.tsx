import { auth, provider } from '../config/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Login() {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    const signIn = async () => {
        await signInWithPopup(auth, provider);
        navigate('/');
    }

    return (
        <div className='login'>
            {!user && <button onClick={signIn}>Войти через Google</button>}
            {user && <><p>{`Добро пожаловать, ${user?.displayName}`}</p><button onClick={() => signOut(auth)}>Выйти</button></>}
        </div>
    )
}