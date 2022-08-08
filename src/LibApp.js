import './LibApp.css';
import Content from './elements/Content.js'
import Header from './elements/Header.js'
import LinkNow from './elements/LinkNow.js'
import {
  BrowserRouter as Router,
} from "react-router-dom";

function LibApp() {
  return (
    <div className="libApp">
      <Router>
        <Header />
        <LinkNow />
        <Content />
      </Router>
      <footer>
        2022 © Fonerius 
      </footer>
    </div>
  );
}

export default LibApp;
