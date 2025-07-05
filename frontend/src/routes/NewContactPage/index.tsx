import { MainLayout } from '../../components/templates/MainLayout/MainLayout';

import './NewContactPage.css';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import astronauta from '../../assets/images/astronauta.png';
import { Input } from '@/components/molecules/Input';
import { Search, UserPlus, Users } from 'lucide-react';
import { Nav } from '@/components/organisms/Nav';
import { useUsersStore } from '@/store/useUserStore';
import { User } from '@/store/useUserStore';
import { CardItem } from '@/components/molecules/cardItem';

function NewContactPage() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  const [usersFiltered, setUsersFiltered] = useState<User[]>([]);

  const { getAllUsers, users: usersStore } = useUsersStore();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    if (e.target.value.length === 0) {
      setUsersFiltered([]);
      return;
    }

    const filteredUsers = usersStore.filter((user) =>
      user.fullname.toLowerCase().includes(search.toLowerCase())
    );
    setUsersFiltered(filteredUsers);
  };

  const hanldeAddContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Agregar contacto');
  };

  useEffect(() => {
    getAllUsers();
    setUsers(usersStore);
  }, [getAllUsers]);

  return (
    <MainLayout>
      <main>
        <Nav />
        <section className="new-contact">
          <section className="new-contact__header">
            <h1>Agrega nuevos amigos!</h1>
            <p>Escribe el nombre de la persona que deseas agregar</p>
          </section>

          <Input
            Icon={Search}
            placeholder="Busca por el nombre"
            handleChange={handleSearch}
            value={search}
          />
          {/* {users.map((user) => (
            <p>{user.fullname}</p>
          ))} */}
          <section>
            <ul className="list">
              {search.length > 0 &&
                (usersFiltered.length > 0 ? (
                  usersFiltered.map((user) => (
                    <li
                      key={user.user_id}
                      className="list__item"
                      // onClick={() => handleClickUser(user.user_id)}
                    >
                      <CardItem
                        user={user}
                        handleClick={() => hanldeAddContact}
                      />
                    </li>
                  ))
                ) : (
                  <p>No se encontraron usuarios con ese nombre.</p>
                ))}
            </ul>
          </section>
          {search.length === 0 && (
            <section className="suggested">
              <p className="suggested__title">
                <Users size={18} />
                Usuarios sugeridos
              </p>
              {usersStore.slice(0, 4).map((user) => (
                <CardItem user={user} handleClick={() => hanldeAddContact} />
              ))}
            </section>
          )}
        </section>
      </main>
    </MainLayout>
  );
}

export { NewContactPage };
{
  /* <article key={user.user_id} className="card">
                  <img
                    className="card__avatar"
                    src={user.avatar || astronauta}
                    alt={`${user.fullname} avatar`}
                  />
                  <div>
                    <p>{user.fullname}</p>
                  </div>
                  <button onClick={hanldeAddContact} className="card__button">
                    <UserPlus size={18} />
                  </button>
                </article> */
}
