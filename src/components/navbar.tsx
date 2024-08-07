import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav>
            <nav role="navigation">
                <div className="menu__toggle">
                    <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>

                    <ul className="menu__links">
                        <Link to='/login'>Личный кабинет</Link>
                        <Link to='/'>Таймер</Link>
                    </ul>
                </div>
            </nav>
        </nav>
    )
}