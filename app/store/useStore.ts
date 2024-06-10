import { create } from 'zustand'

type IList = Record<string, any>[];

interface IState {
  filters: Record<string, any>;
  search: string;
  sorter: Record<string, any> | null;
  currentPage: number;
  count: number;
  pokemonList: IList;

  setFilters: (val: Record<string, any>) => void; 
  setSearch: (val: string) => void; 
  setSorter: (val: Record<string, any> | null) => void;
  setCount: (num: number) => void; 
  setCurrentPage: (num: number) => void;
  setPokemonList: (list: IList) => void;
}

const useStore = create<IState>((set) => ({
    filters: {},
    search: '',
    sorter: null,
    currentPage: 1,
    
    count: 0,
    pokemonList: [],
    setCount: (num: number) => set((state: IState) => ({ count: num })),
    setCurrentPage: (num: number) => set((state: IState) => ({ currentPage: num })),
    setInitPokemonList: (list: IList) => set((state: IState) => ({ pokemonList: list })),
    setPokemonList: (list: IList) => set((state: IState) => ({ pokemonList: list })),
    setFilters: (val: Record<string, any>) => set((state: IState) => ({ filters: val })),
    setSearch: (val: string) => set((state: IState) => ({ search: val })),
    setSorter: (val: Record<string, any> | null) => set((state: IState) => ({ sorter: val })),
    inc: () => set((state: IState) => ({ count: state.count + 1 })),
}))

export default useStore;