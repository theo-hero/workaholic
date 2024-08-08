import { Link } from "react-router-dom";
import { auth } from '../config/firebase';
import { useAuthState } from "react-firebase-hooks/auth";

export default function Navbar() {
    const [user] = useAuthState(auth);

    return (
        <nav>
            <nav role="navigation">
                <div className="menu__toggle">
                    <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>

                    <ul className="menu__links">
                        <Link to='/'>Таймер</Link>
                        {user ? <Link to='/account'>Личный кабинет</Link> : <Link to='/login'>Авторизация</Link>}
                    </ul>
                </div>
            </nav>
        </nav>
    )
}