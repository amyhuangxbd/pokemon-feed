import fetchHandling from './fetch'
export const fetchPokemon = async (offset = 0, limit = 20) => {
  return await fetchHandling(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
};

export const fetchPokemonDetails = async (url: string) => {
  const data = await fetchHandling(url);
  
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
  