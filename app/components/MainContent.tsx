'use client'
import React, { useState, useEffect, memo } from "react";
import Fuse from "fuse.js";
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
        const detailsData = await Promise.all(detailsPromises);
        const data = items.length === 0 ? [...details, ...detailsData] : [...items, ...detailsData]
        setPokemonList(data);
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
        if(searchText || JSON.stringify(filters) !== '{}' || sorter) {
            let tempList = items;
            for(let key in filters) {
                tempList = tempList.filter((item) => {
                    const condition = JSON.parse(filters[key])
                    if (item.stats?.filter((m: {name: string; value: number}) => {
                        if (m.name === key ) {
                            if (condition.min && m.value < Number(condition.min)) {
                                return false;
                            }
                            if (condition.max && m.value > Number(condition.max)) {
                                return false;
                            }
                            return true;
                        }
                    })?.length > 0) {
                        return true;
                    }
                    return false;
                })
            }
            if (searchText) {
                const fuse = new Fuse(tempList, {keys: [
                    "name"
                ]});
                tempList = fuse.search(searchText)
            }
            setPokemonList(tempList)
        }
    
      return () => {
        
      }
    }, [search, filters, sorter])
    
    return (
        <>
            {
                items.length === 0 ? details.map((item, index) => (
                    <PokemonItem key={index} pokemon={item} />
                )) : items.map((item, index) => (
                    <PokemonItem key={index} pokemon={item} />
                ))
            }
            <div className=" min-w-full text-center mb-12"><InfiniteScroll loadMore={loadMore} hasMore={hasMore} /></div>
        </>
    );
};

export default memo(MainContent);