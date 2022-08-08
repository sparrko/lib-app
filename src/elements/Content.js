import './Content.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import MainTab from './tabs/MainTab.js'
import BooksTab from './tabs/BooksTab.js'
import AutorsTab from './tabs/AutorsTab.js'
import AutorsEditTab from './tabs/AutorsEditTab.js'
import BooksEditTab from './tabs/BooksEditTab.js'

function Content() {
  return (
    <div className="content">
      <Routes>
        <Route path="/" caseSensitive={false} element={<MainTab />} />
        <Route path="/books" caseSensitive={false} element={<BooksTab />} />
        <Route path="/autors" caseSensitive={false} element={<AutorsTab />} />
        <Route path="/autors/create" caseSensitive={false} element={<AutorsEditTab />} />
        <Route path="/autors/edit/:id" caseSensitive={false} element={<AutorsEditTab />} />
        <Route path="/books/create" caseSensitive={false} element={<BooksEditTab />} />
        <Route path="/books/edit/:id" caseSensitive={false} element={<BooksEditTab />} />
      </Routes>
    </div>
  );
}

export default Content;
