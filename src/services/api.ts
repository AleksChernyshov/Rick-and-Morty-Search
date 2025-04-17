export interface RickAndMortyCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface ApiResponse {
  results: RickAndMortyCharacter[];
}

const API_URL = 'https://rickandmortyapi.com/api/character/';

export async function fetchCharactersByName(name: string): Promise<RickAndMortyCharacter[]> {
  const response = await fetch(`${API_URL}?name=${encodeURIComponent(name)}`);
  if (!response.ok) {
    return [];
  }
  const data: ApiResponse = await response.json();
  return data.results;
}
