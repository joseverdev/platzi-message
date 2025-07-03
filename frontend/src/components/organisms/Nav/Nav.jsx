import React from "react";
import "./Nav.css";

import { BookUser, MessageCircle, Settings } from "lucide-react";

const Nav = () => {
  return (
    // <header>
    <div className="navbar-container">
      <nav className="navbar">
        <ul className="navbar__list">
          <li>
            <a href="/#">
              <BookUser />
            </a>
          </li>
          <li>
            <a href="/#">
              <MessageCircle />
            </a>
          </li>
          <li>
            <a href="/#">
              <Settings />
            </a>
          </li>
        </ul>
      </nav>
    </div>
    // </header>
  );
};

export default Nav;
