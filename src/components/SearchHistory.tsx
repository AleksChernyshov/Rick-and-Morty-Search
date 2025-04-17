import React from 'react';
import { useSearchStore } from '../store/searchStore';

export const SearchHistory: React.FC = () => {
  const history = useSearchStore(s => s.history);
  const clearHistory = useSearchStore(s => s.clearHistory);
  const deleteHistoryItem = useSearchStore(s => s.deleteHistoryItem);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-baseline">
        <h2 className="text-2xl font-press-start text-blue-accent">
          Search History
        </h2>
        <button
          onClick={clearHistory}
          className="
            bg-red-600 text-white px-3 py-1 rounded-lg font-vt323 text-xl
            shadow-[0_0_10px_rgba(255,0,0,0.7)]
            transition-transform duration-200 ease-in-out
            hover:scale-105 hover:rotate-1
            hover:shadow-[0_0_20px_rgba(255,0,0,0.9)]
            hover:bg-red-700
          "
        >
          Clear All
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {history.map((item, idx) => (
          <div
            key={idx}
            className="
              relative bg-[#111] overflow-hidden rounded-lg
              shadow-[0_0_10px_rgba(57,255,20,0.3)]
              transition-transform duration-200 hover:scale-105 hover:rotate-1 group
              border border-[#39FF14]/50
            "
          >
            <img
              src={item.character.image}
              alt={item.character.name}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div
              className="
                absolute bottom-0 left-0 w-full bg-black/80 backdrop-blur-sm
                text-[#E5E5FF] p-3 transform translate-y-full group-hover:translate-y-0
                transition-transform duration-300
              "
            >
              <h3 className="text-lg font-bold">{item.character.name}</h3>
              <p className="text-sm">
                {item.character.species} | {item.character.status}
              </p>
            </div>
            <button
              onClick={() => deleteHistoryItem(item.character.id)}
              className="absolute top-2 right-2 bg-red-600 p-1 rounded-full text-white hover:bg-red-500 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                <path fill="currentColor" d="M3 6h18v2H3zm2 3h14l-1.5 12h-11z" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
