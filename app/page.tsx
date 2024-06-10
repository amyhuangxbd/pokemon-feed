// 'use client'

import Head from "./components/Head";
import SearchBar from "./components/SearchBar";
import MainContent from './components/MainContent';
import { fetchPokemon, fetchPokemonDetails } from './services/poke';
import FirstPaint from "./components/FirstPaint";

const limit = 20;
const currentPage = 1;

const Home = async () => {
    const offset = (currentPage - 1) * limit;
    const res = await fetchPokemon(offset, limit);
    const detailsPromises = res.results?.map((pokemon: {url: string}) => fetchPokemonDetails(pokemon.url)) || [];
    const details = await Promise.all(detailsPromises);

    return ( 
        <div>
            <Head />
            <div>
                <SearchBar />
                <div className=" flex flex-wrap w-full  justify-center">
                    <FirstPaint totalCount={res.count} details={details} />
                    <MainContent totalCount={res.count} details={details} />
                </div>
            </div>
        </div>
    );
};

export default Home;