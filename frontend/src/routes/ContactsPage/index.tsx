import { MainLayout } from '@/components/templates/MainLayout/MainLayout';
import { Nav } from '@/components/organisms/Nav';
import React, { useEffect } from 'react';
import './index.css';
import { Input } from '@/components/molecules/Input';
import { Search } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useContactsStore } from '@/store/useContactsStore';

export const Contacts = () => {
  const [search, setSearch] = React.useState('');

  const { getContacts, contacts } = useContactsStore();
  console.log('🚀 ~ Contacts ~ contacts:', contacts);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
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
            <h2>Todos</h2>
            <ul>
              {contacts.map((contact) => (
                <li key={contact.user_id}>
                  <p>{contact.fullname}</p>
                </li>
              ))}
            </ul>
          </section>
        </section>
      </main>
    </MainLayout>
  );
};
