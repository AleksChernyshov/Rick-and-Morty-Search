import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCharacterById, Character } from '../services/api';
import { useSearchStore } from '../store/searchStore';

export const CharacterProfile: React.FC = () => {
  const { id } = useParams<'id'>();
  const charId = Number(id);

  // fetch the character data
  const {
    data: character,
    isLoading,
    isError,
  } = useQuery<Character>({
    queryKey: ['character', charId],
    queryFn: () => fetchCharacterById(charId),
    enabled: Boolean(charId),
  });

  // grab history from store to get the timestamp
  const history = useSearchStore(s => s.history);
  const histItem = character
    ? history.find(h => h.character.id === character.id)
    : undefined;
  const addedAt = histItem?.timestamp;

  if (isLoading) {
    return (
      <div className="p-8 text-center text-[#E5E5FF]">Loading…</div>
    );
  }

  if (isError || !character) {
    return (
      <div className="p-8 text-center text-red-600">Character not found</div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-[#39FF14] p-6">
      <div className="w-full max-w-lg bg-[#111] border-4 border-[#39FF14]/50 shadow-[0_0_20px_rgba(57,255,20,0.5)] rounded-lg overflow-hidden">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-auto max-h-[50vh] object-cover bg-black"
        />
        <div className="p-6 space-y-6">
          <h1 className="text-3xl font-press-start text-[#E5E5FF] text-center">
            {character.name}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#E5E5FF] font-medium">
            {/* Left column: first 4 items */}
            <div className="space-y-2">
              <p><strong>Status:</strong> {character.status}</p>
              <p>
                <strong>Species:</strong> {character.species}
                {character.type && ` (${character.type})`}
              </p>
              <p><strong>Gender:</strong> {character.gender}</p>
              <p><strong>Origin:</strong> {character.origin.name}</p>
            </div>
            {/* Right column: remaining 3 items + added timestamp */}
            <div className="space-y-2">
              <p><strong>Location:</strong> {character.location.name}</p>
              <p><strong>Episodes:</strong> {character.episode.length}</p>
              <p>
                <strong>Created:</strong>{' '}
                {new Date(character.created).toLocaleDateString()}
              </p>
              {addedAt && (
                <p><strong>Added:</strong> {addedAt}</p>
              )}
            </div>
          </div>
          {/* Back button aligned left, white text */}
          <div>
            <Link
              to="/"
              className="
                inline-block bg-[#39FF14] text-white px-4 py-2 rounded-lg font-vt323 text-xl
                shadow-[0_0_10px_rgba(57,255,20,0.7)]
                transition-transform duration-200 ease-in-out
                hover:scale-105 hover:rotate-1
                hover:shadow-[0_0_20px_rgba(57,255,20,0.9)]
              "
            >
              ← Back to Search
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};