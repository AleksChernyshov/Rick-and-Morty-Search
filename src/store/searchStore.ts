import { create } from 'zustand';
import { RickAndMortyCharacter } from '../services/api';

interface HistoryItem {
  character: RickAndMortyCharacter;
  timestamp: string;
}

interface SearchState {
  query: string;
  results: RickAndMortyCharacter[];
  history: HistoryItem[];
  setQuery: (q: string) => void;
  setResults: (results: RickAndMortyCharacter[]) => void;
  clearResults: () => void;
  addToHistory: (char: RickAndMortyCharacter) => void;
  clearHistory: () => void;
  clearQuery: () => void;
  deleteHistoryItem: (id: number) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  results: [],
  history: [],
  setQuery: (q) => set({ query: q }),
  setResults: (results) => set({ results }),
  clearResults: () => set({ results: [] }),
  addToHistory: (char: RickAndMortyCharacter) =>
    set((state) => ({
      history: [...state.history, { character: char, timestamp: new Date().toLocaleString() }],
    })),
  clearHistory: () => set({ history: [] }),
  clearQuery: () => set({ query: '' }),
  deleteHistoryItem: (id: number) =>
    set((state) => ({
      history: state.history.filter((item) => item.character.id !== id),
    })),
}));
