import { MainLayout } from "../../components/MainLayout/MainLayout";


import "./NewContactPage.css";
import { BackIcon } from "../../components/Icons/Backicon";
import { useAnimateButtons } from "../useAnimateButtons";
import { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import astronauta from "../../assets/images/astronauta.png";
function NewContactPage() {
  const { navigateToView } = useAnimateButtons();

  const {getAllUsers, users, user} = useAuthStore();

  const usersFiltered = users.filter((userArray) => userArray.user_id != user.user_id);


  useEffect(()=> {
    getAllUsers();
  },[getAllUsers]);

  const handleClickUser = (id) => {
    console.log(id);
    navigateToView(`/chat/${id}`);
  }
  return (
    <MainLayout>
      <section className="new-contact">
        <button
          onClick={() => navigateToView("/")}
          className="button new-contact__back-button"
        >
          <BackIcon />
        </button>
        {/* list of active users */}
        <section>
          <ul className="list">
            {usersFiltered.map((user) => (
              <li key={user.user_id} className="list__item"
              onClick={() => handleClickUser(user.user_id)}
              >
                <article className="card">
                  <img
                    className="card__avatar"
                    src={user.profilePic||astronauta} />
                  <div>
                    <h2>{user.name}</h2>
                    <p>@{user.username}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

      </section>
    </MainLayout>
  );
}

export { NewContactPage };
