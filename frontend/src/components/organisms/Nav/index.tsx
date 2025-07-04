import { NavLink } from 'react-router-dom';
import './Nav.css';

import { BookUser, MessageCircle, Settings } from 'lucide-react';

export const Nav = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <ul className="navbar__list">
          <li>
            <NavLink
              to="/contactos"
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              <BookUser />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/chat"
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              <MessageCircle />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/me"
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              <Settings />
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
