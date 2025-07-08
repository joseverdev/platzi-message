import { MainLayout } from '@/components/templates/MainLayout/MainLayout';
import { Nav } from '@/components/organisms/Nav';
import React, { useEffect } from 'react';
import './index.css';
import { Input } from '@/components/molecules/Input';
import { MessageCircleMore, Search } from 'lucide-react';
import { useContactsStore } from '@/store/useContactsStore';
import { CardItem } from '@/components/molecules/cardItem';
import { useNavigate } from 'react-router-dom';

export const Contacts = () => {
  const [search, setSearch] = React.useState('');

  const navigate = useNavigate();

  const { getContacts, contacts } = useContactsStore();

  const contactsFiltered = contacts.filter((contact) =>
    contact.fullname.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClickChat = (userId: string) => {
    navigate(`/chat/${userId}`);
  };

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  return (
    <MainLayout>
      <main>
        <Nav />
        <section className="contacts-container">
          <h1>Amigos</h1>
          <Input
            Icon={Search}
            placeholder="Buscar"
            value={search}
            handleChange={handleSearch}
          />
          <section>
            <h3 className="list-title">Todos</h3>
            <ul>
              {search.length > 0
                ? contactsFiltered.map((contact) => (
                    <CardItem
                      user={contact}
                      key={contact.user_id}
                      Icon={MessageCircleMore}
                      handleClick={() => handleClickChat(contact.user_id)}
                    />
                  ))
                : contacts.map((contact) => (
                    <CardItem
                      user={contact}
                      key={contact.user_id}
                      Icon={MessageCircleMore}
                      handleClick={() => handleClickChat(contact.user_id)}
                    />
                  ))}
            </ul>
          </section>
        </section>
      </main>
    </MainLayout>
  );
};
