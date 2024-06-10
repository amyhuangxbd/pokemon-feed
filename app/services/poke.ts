export const fetchPokemon = async (offset = 0, limit = 20) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    return data;
  };
export const fetchPokemonList = async (offset = 0, limit = 20) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    return data.results;
  };
  
  export const fetchPokemonDetails = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      image: data.sprites.back_default,
      stats: data.stats.map((stat: Record<string, any>) => ({
        name: stat.stat.name,
        value: stat.base_stat
      }))
    };
  };
  