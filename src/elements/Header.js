import './Header.css';
import {
    NavLink
} from "react-router-dom";

function Header() {
  return (
    <div className="header">
        <div className="center">
            <div className="left">
                <p id="title">Lib App</p>
            </div>
            <div className="right">
                <nav id="nav-main">
                    <NavLink to="/"><a>Главная</a></NavLink>
                    <NavLink to="/books"><a>Книги</a></NavLink>
                    <NavLink to="/autors"><a>Авторы</a></NavLink>
                </nav>
            </div>
        </div>
    </div>
  );
}

export default Header;
