import { MainLayout } from "../../components/MainLayout/MainLayout";

import "./UserPage.css";
import { BackIcon } from "../../components/Icons/Backicon";
import { useAnimateButtons } from "../useAnimateButtons";
import CameraIcon from "../../components/Icons/CameraIcon";
import { useAuthStore } from "../../store/useAuthStore";
import { EditIcon } from "../../components/Icons/EditIcon";
import { useState } from "react";
import astronauta from "../../assets/images/astronauta.png";

function UserPage() {
  const { navigateToView } = useAnimateButtons();
  const { updateProfilePicture, updateName, user, logout } = useAuthStore()
  const [name, setName] = useState(user.name)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return console.log("No file selected")

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = async () => {
      const base64Image = reader.result
      await updateProfilePicture({ profilePic: base64Image })
    }

  }
  const handleClickIcon = () => {
    const input = document.getElementById('name')
    input.disabled = !input.disabled
    input.focus()
  }
  const handleEdit = (e) => {
    setName(e.target.value)
  }
  const handleBlur = (e) => {
    const res = updateName({ name: e.target.value })
    console.log('handleblur')    
  }
  return (
    <MainLayout>
      <button
        onClick={() => navigateToView("/home")}
        className="chat-header__button button"
      >
        <BackIcon />
      </button>
      <figure className="user-page__profile">
        <div className="profile-container">
          <img className="user-page__image" src={user.profilePic || astronauta} alt="logo" />
          <label className="icon-camera">
            <CameraIcon />
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>

        </div>
        <figcaption>
          <div className="user-page__name-container">

            <h2>
              <input
                id='name'
                disabled
                className="user-page__name"
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={handleEdit}
                onBlur={handleBlur}
              />

            </h2>
            <label htmlFor="name"
              onClick={handleClickIcon}
            >
              <EditIcon />
            </label>
          </div>
        </figcaption>
      </figure>
      <button className="logout"
        onClick={
          () => {
            logout();
            navigateToView("/login");
          }
        }
      >Cerrar sesion</button>
    </MainLayout >
  );
}

export { UserPage };
