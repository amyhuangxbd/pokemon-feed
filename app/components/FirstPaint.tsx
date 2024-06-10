import React from "react";
import { fetchPokemon, fetchPokemonDetails } from '../services/poke';

const offset = 0;
const limit = 20
const FirstPaint = async ({children}: Readonly<{
    children: React.ReactElement;
  }>) => {
    const res = await fetchPokemon(offset, limit);
    const detailsPromises = res.results?.map((pokemon: {url: string}) => fetchPokemonDetails(pokemon.url)) || [];
    const details = await Promise.all(detailsPromises);

    return (
        <>
            {React.cloneElement(children, {totalCount: res.count, details} )}
        </>
    );
};

export default FirstPaint;