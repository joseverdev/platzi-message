import { MainLayout } from '@/components/MainLayout/MainLayout';
import { Nav } from '@/components/organisms/Nav';
import React from 'react';
import './index.css';
import { Input } from '@/components/molecules/Input';
import { Search } from 'lucide-react';

export const Contacts = () => {
  const [search, setSearch] = React.useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <MainLayout>
      <main>
        <Nav />
        <section className="contacts-container">
          <h1>Contactos</h1>
          {/* <p>This is the contacts page where you can manage your contacts.</p> */}
          <Input 
            Icon={Search} 
            placeholder='Buscar' 
            value={search} 
            handleChange={handleSearch} 
          />
          <section>
            <h2>Contacts Lists</h2>
          </section>
        </section>
      </main>
    </MainLayout>
  );
};
