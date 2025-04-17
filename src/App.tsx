import React, { useState, ChangeEvent } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SearchBar } from './components/SearchBar';
import { AutocompleteList } from './components/AutocompleteList';
import { SearchHistory } from './components/SearchHistory';
import { fetchCharactersByName } from './services/api';
import { useSearchStore } from './store/searchStore';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const { setResults, clearResults, clearQuery, addToHistory, query, setQuery } =
    useSearchStore();
  const [localQuery, setLocalQuery] = useState(query);

  const handleSearch = async (searchQuery: string) => {
    setLocalQuery(searchQuery);
    if (searchQuery.trim() === '') {
      clearResults();
      return;
    }
    try {
      const characters = await fetchCharactersByName(searchQuery.trim());
      setResults(characters);
    } catch {
      setResults([]);
    }
  };

  const handleSelect = (charId: number) => {
    const { results } = useSearchStore.getState();
    const foundChar = results.find(c => c.id === charId);
    if (foundChar) {
      addToHistory(foundChar);
      clearResults();
      clearQuery();
      setLocalQuery('');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex items-center justify-center bg-black px-4 py-12">
        <div
          className="
            w-full max-w-3xl
            bg-[#111]
            border-4 border-[#39FF14]/60
            shadow-[0_0_20px_rgba(57,255,20,0.5)]
            rounded-lg p-8 space-y-6 mx-auto
          "
        >
          <h1 className="text-center text-3xl font-press-start text-blue-accent">
            Rick & Morty Character Search
          </h1>
          <SearchBar value={query} onChange={handleChange} />
          <AutocompleteList onSelect={handleSelect} />
          <SearchHistory />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
