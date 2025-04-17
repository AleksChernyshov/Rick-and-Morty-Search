import React, { useState, ChangeEvent } from 'react';
import { useSearchStore } from '../store/searchStore';
import { SearchBar } from '../components/SearchBar';
import { AutocompleteList } from '../components/AutocompleteList';
import { SearchHistory } from '../components/SearchHistory';
import { fetchCharactersByName } from '../services/api';

export const Home: React.FC = () => {
  const {
    setResults,
    clearResults,
    clearQuery,
    addToHistory,
    query,
    setQuery,
  } = useSearchStore();
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
    const found = results.find(c => c.id === charId);
    if (found) {
      addToHistory(found);
      clearResults();
      clearQuery();
      setLocalQuery('');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setQuery(v);
    handleSearch(v);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 bg-dark-bg text-neon-green">
      <div className="w-full max-w-3xl bg-dark-bg border-4 border-neon-green/50 shadow-neon-xl rounded-lg p-8 space-y-6 mx-4">
        <h1 className="text-center text-3xl font-press-start text-blue-accent">
          Rick & Morty Character Search
        </h1>
        <SearchBar value={localQuery} onChange={handleChange} />
        <AutocompleteList onSelect={handleSelect} />
        <SearchHistory />
      </div>
    </div>
  );
};