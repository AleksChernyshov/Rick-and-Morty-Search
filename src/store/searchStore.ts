import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchCharactersByName } from '../services/api';

type RickAndMortyCharacter = Awaited<ReturnType<typeof fetchCharactersByName>>[0];

interface HistoryItem {
  character: RickAndMortyCharacter;
  timestamp: string;
}

interface SearchState {
  query: string;
  results: RickAndMortyCharacter[];
  history: HistoryItem[];

  setQuery: (q: string) => void;
  clearQuery: () => void;
  setResults: (res: RickAndMortyCharacter[]) => void;
  clearResults: () => void;

  addToHistory: (char: RickAndMortyCharacter) => void;
  deleteHistoryItem: (id: number) => void;
  clearHistory: () => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      query: '',
      results: [],
      history: [],

      setQuery: (q) => set({ query: q }),
      clearQuery: () => set({ query: '' }),
      setResults: (res) => set({ results: res }),
      clearResults: () => set({ results: [] }),

      addToHistory: (character) => {
        const timestamp = new Date().toLocaleString();
        set({ history: [...get().history, { character, timestamp }] });
      },
      deleteHistoryItem: (id) =>
        set({ history: get().history.filter(item => item.character.id !== id) }),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'search-storage',
      partialize: (state) => ({
        query: state.query,
        history: state.history,
      }),
    }
  )
);