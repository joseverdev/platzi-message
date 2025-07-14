import { MainLayout } from '@/components/templates/MainLayout/MainLayout';
import { Nav } from '@/components/organisms/Nav';
import React, { useEffect } from 'react';
import './index.css';
import { Input } from '@/components/molecules/Input';
import { MessageCircleMore, Search } from 'lucide-react';
import { useContactsStore } from '@/store/useContactsStore';
import { CardItem } from '@/components/molecules/cardItem';
import { useNavigate } from 'react-router-dom';
import { useConversationsStore } from '@/store/useConversationsStore';
import { useAuthStore } from '@/store/useAuthStore';

export const Contacts = () => {
  const [search, setSearch] = React.useState('');
  const [conversationId, setConversationId] = React.useState<string | null>(
    null
  );

  const navigate = useNavigate();

  const { user } = useAuthStore();
  const { getContacts, contacts } = useContactsStore();
  const { getAllConversations, conversations } = useConversationsStore();

  const contactsFiltered = contacts.filter((contact) =>
    contact.fullname.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClickChat = (userId: string) => {
    const conversationId = getConversationId(userId);
    navigate(`/chat/${conversationId}`);
  };

  const getConversationId = (contactId) => {
    const conversation = conversations.find((conv) =>
      conv.participants.includes(contactId)
    );
    return conversation ? conversation._id : null;
  };

  useEffect(() => {
    console.log('🚀 ~ Contacts ~ user:', user);
    if (contacts.length === 0) {
      getContacts();
    }
    if (conversations.length === 0) {
      getAllConversations();
    }
  }, [getContacts, getAllConversations]);

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
