'use client'
import React, { useState, useEffect, memo, useMemo } from "react";
import Fuse from "fuse.js";
import useStore from '@/app/store/useStore';
import { fetchPokemon, fetchPokemonDetails } from '../services/poke';
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
        const res = await fetchPokemon(offset, limit);
        const detailsPromises = res.results?.map((pokemon: {url: string}) => fetchPokemonDetails(pokemon.url));
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
    const searchFilterSortList = useMemo(() => {
        const searchText = search.trim()
        let tempList: Record<string, any>[] = items.length === 0 ? JSON.parse(JSON.stringify(details)) : JSON.parse(JSON.stringify(items));
        if(searchText || JSON.stringify(filters) !== '{}' || sorter) {
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
                tempList = fuse.search(searchText).map((m) => m.item)
            }
            if (sorter) {
                if (sorter.field === 'name') {
                    tempList = tempList.sort((a, b) => {
                        if (sorter.type === 'asc') {
                            return a.name.localeCompare(b.name)
                        } else {
                            return b.name.localeCompare(a.name)
                        }
                    })
                } else {
                    tempList = tempList.sort((a, b) => {
                        const m = a.stats.find((m: {name: string; value:number}) => m.name === sorter.field)
                        const n = b.stats.find((m: {name: string; value:number}) => m.name === sorter.field)

                        if (sorter.type === 'asc') {
                            return m?.value - n?.value
                        } else {
                            return n?.value - m?.value
                        }
                    })
                }
            }
        }
        return tempList
    }, [search, filters, sorter, items, totalCount, details])

    return (
        <>
            {
                searchFilterSortList.map((item, index) => (
                    <PokemonItem key={index} pokemon={item} />
                ))
            }
            <div className=" min-w-full text-center mb-12"><InfiniteScroll loadMore={loadMore} hasMore={hasMore} /></div>
        </>
    );
};

export default memo(MainContent);