import './Search.css';
import { Search as SearchIcon } from 'lucide-react';

import { Input } from '@/components/molecules/Input';
import { useState } from 'react';

function Search() {
  const [search, setSearch] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  return (
    <>
      <Input
        Icon={SearchIcon}
        value={search}
        handleChange={handleChange}
        placeholder="Buscar"
      />
    </>
  );
}

export { Search };
