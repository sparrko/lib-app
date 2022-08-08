import './LinkNow.css';
import {
    Routes,
    Route,
    NavLink
} from "react-router-dom";

function LinkNow() {
  return (
    <div className="link-now">
        <Routes>
            <Route path="/" caseSensitive={false} element={<div class="sub-link-now"><span>Главная</span></div>} />
            <Route path="/books" caseSensitive={false} element={<div class="sub-link-now"><span>Книги</span></div>} />
            <Route path="/autors" caseSensitive={false} element={<div class="sub-link-now"><span>Авторы</span></div>} />
            <Route path="/autors/create" caseSensitive={false} element={
                <div class="sub-link-now">
                  <NavLink to="/autors"><a>Авторы</a></NavLink><span class="sub-link-now-del">></span><span>Создание</span>
                </div>
              } />
            <Route path="/autors/edit/:id" caseSensitive={false} element={
                <div class="sub-link-now">
                  <NavLink to="/autors"><a>Авторы</a></NavLink><span class="sub-link-now-del">></span><span>Редактирование</span>
                </div>
              } />

            <Route path="/books/create" caseSensitive={false} element={
                <div class="sub-link-now">
                  <NavLink to="/books"><a>Книги</a></NavLink><span class="sub-link-now-del">></span><span>Создание</span>
                </div>
              } />
            <Route path="/books/edit/:id" caseSensitive={false} element={
                <div class="sub-link-now">
                  <NavLink to="/autors"><a>Книги</a></NavLink><span class="sub-link-now-del">></span><span>Редактирование</span>
                </div>
              } />
        </Routes>
    </div>
  );
}

export default LinkNow;
