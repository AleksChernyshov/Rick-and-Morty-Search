export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export async function fetchCharactersByName(name: string): Promise<Character[]> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(name)}`);
  if (!res.ok) throw new Error('Not found');
  const json = await res.json();
  return json.results;
}

export async function fetchCharacterById(id: number): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  if (!res.ok) throw new Error('Character not found');
  return res.json();
}