'use client'
import React, { useState, useEffect } from "react";
import useStore from '@/app/store/useStore';
import { fetchPokemonList, fetchPokemonDetails } from '../services/poke';
import PokemonItem from "./PokemonItem";
import { InfiniteScroll } from '@/app/components/infinite-scroll'

const limit = 20;
interface IProps {
    totalCount: number;
     details: Record<string, any>[];
}
const MainContent = (props: IProps) => {
    const { totalCount, details } = props
    const { filters, search, sorter, count, pokemonList: items, currentPage, setCount, setCurrentPage, setPokemonList } = useStore()
    const [hasMore, setHasMore] = useState(true)
    async function loadMore() {
        const offset = currentPage * 20;
        const list = await fetchPokemonList(offset, limit);
        const detailsPromises = list.map((pokemon: {url: string}) => fetchPokemonDetails(pokemon.url));
        const details = await Promise.all(detailsPromises);
        setPokemonList([...items, ...details]);
        setHasMore(currentPage * limit < count)
        setCurrentPage(currentPage + 1)
    }
    useEffect(() => {
        
        if (totalCount && details?.length) {
          setCount(totalCount);
          if (totalCount > limit) {
            setHasMore(true)
          }
        }
    }, [totalCount, details])
    useEffect(() => {
        const searchText = search.trim()
        if(searchText || filters.length || sorter) {
            let tempList = items;
            if (filters.length) {
                tempList = tempList.filter((item) => {

                })
            }
        }
    
      return () => {
        
      }
    }, [search, filters, sorter])
    
    return (
        <>
            {
                items.map((item, index) => (
                    <PokemonItem key={index} pokemon={item} />
                ))
            }
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
        </>
    );
};

export default MainContent;