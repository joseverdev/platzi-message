import { MainLayout } from '../../components/templates/MainLayout/MainLayout';

import './UserPage.css';
import { useAuthStore } from '../../store/useAuthStore';
import { useState } from 'react';
import astronauta from '../../assets/images/astronauta.png';
import { Nav } from '@/components/organisms/Nav';
import { Camera, UserPen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// This file is part of the Platzi Message project.
function UserPage() {
  const navigate = useNavigate();
  const { updateProfilePicture, updateName, user, logout } = useAuthStore();
  const [name, setName] = useState(user.name);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return console.log('No file selected');

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfilePicture({ profilePic: base64Image });
    };
  };
  const handleClickIcon = () => {
    const input = document.getElementById('name');
    input.disabled = !input.disabled;
    input.focus();
  };
  const handleEdit = (e) => {
    setName(e.target.value);
  };
  const handleBlur = (e) => {
    const res = updateName({ name: e.target.value });
    console.log('handleblur');
  };
  return (
    <MainLayout>
      <main>
        <Nav />

        <div className="user-container">
          <figure className="user-page__profile">
            <div className="profile-container">
              <img
                className="user-page__image"
                src={user.profilePic || astronauta}
                alt="logo"
              />
              <label className="icon-camera">
                {/* <CameraIcon /> */}
                <Camera />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <figcaption>
              <div className="user-page__name-container">
                <h2>
                  <input
                    id="name"
                    disabled
                    className="user-page__name"
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={handleEdit}
                    onBlur={handleBlur}
                  />
                </h2>
                <label htmlFor="name" onClick={handleClickIcon}>
                  {/* <EditIcon /> */}
                  <UserPen />
                </label>
              </div>
            </figcaption>
          </figure>
          <button
            className="logout"
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            Cerrar sesion
          </button>
        </div>
      </main>
    </MainLayout>
  );
}

export { UserPage };
