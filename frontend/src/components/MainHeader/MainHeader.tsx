import React from 'react';
import { Search } from '../molecules/Search/Search';

import './MainHeader.css';

// import { AddIcon } from '../Icons/AddIcon';
// import { useAnimateButtons } from '../../routes/useAnimateButtons';
import { useAuthStore } from '../../store/useAuthStore';
import astronauta from '../../assets/images/astronauta.png';
import { useNavigate } from 'react-router-dom';
import { UserRoundPlus } from 'lucide-react';

function MainHeader() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  return (
    <>
      <header>
        <section className="header__user">
          <figure onClick={() => navigate('/me')} className="user">
            <img
              className="user__image"
              src={user.profilePic || astronauta}
              alt="logo"
            />
          </figure>

          <article className="header__button">
            <button
              onClick={() => navigate('/agregar')}
              className="button__add"
            >
              {/* <AddIcon /> */}
              <UserRoundPlus />
            </button>
          </article>
        </section>
        <Search />
      </header>
    </>
  );
}

export { MainHeader };
