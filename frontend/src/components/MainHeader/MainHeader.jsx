import React from "react";
import { Search } from "../molecules/Search/Search";
import "./MainHeader.css";

import { AddIcon } from "../Icons/AddIcon";
import { useAnimateButtons } from "../../routes/useAnimateButtons";
import { useAuthStore } from "../../store/useAuthStore";
// import Input from ''
import astronauta from "../../assets/images/astronauta.png";


function MainHeader() {
  const { navigateToView } = useAnimateButtons();
  const {user} = useAuthStore()
  return (
    <>
      <header>
        <section className="header__user">
          <figure onClick={() => navigateToView("/me")} className="user">
            <img className="user__image" src={user.profilePic||astronauta} alt="logo" />
          </figure>
         
          <article className="header__button">
            <button
              onClick={() => navigateToView("/new-contact")}
              className="button__add"
            >
              <AddIcon />
            </button>
          </article>
        </section>
        <Search />
        {/* <Input /> */}
      </header>
    </>
  );
}

export { MainHeader };
