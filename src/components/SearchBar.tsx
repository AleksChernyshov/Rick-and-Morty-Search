import React, { ChangeEvent } from 'react';

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar: React.FC<Props> = ({ value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder="Search for a character..."
    className="
      w-full p-3 border-2 border-neon-green/50 rounded-lg
      focus:outline-none focus:border-neon-green text-vt323 text-xl
      bg-dark-bg text-white-light
    "
  />
);