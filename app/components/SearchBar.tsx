'use client'
import SearchSVG from '@/app/asset/img/search.svg'
import Image from 'next/image';
import Select from 'react-select';
import type { SingleValue } from 'react-select'
import useStore from '@/app/store/useStore';

const dpOptions = [{
    value: '',
    label: 'Any'
}, {
    value: '{min: 0, max: 60}',
    label: '0 - 60'
}, {
    value: '{min: 61, max: 100}',
    label: '61 - 100'
}, {
    value: '{min: 101}',
    label: '100+'
}]

const sortOptions = [{
    value: '',
    label: 'Any'
}, {
    value: 'name',
    label: 'name A - Z',
    type: 'asc'
}, {
    value: 'name',
    label: 'name Z - A',
    type: 'des'
}, {
    value: 'hp',
    label: 'hp 0 - 100',
    type: 'asc'
}, {
    value: 'hp',
    label: 'hp 100 - 0',
    type: 'des'
}]

const SearchBar = () => {
    const { filters, setFilters, setSearch, setSorter } = useStore()
    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value)
    }
    function onFilterChange(val: SingleValue<{
        value: string;
        label: string;
    }>, name: string) {
        const { value } = val || {}
        if (value) {
            setFilters({ ...filters, [name]: value })
        } else {
            let temp = filters;
            delete temp[name]
            setFilters(temp)
        }
    }
    function onSortChange(val: SingleValue<{
        value: string;
        label: string;
    }>) {
        if (val?.value) {
            setSorter(val)
        } else {
            setSorter(null)
        }
    }
    return (<div><div className=' grid grid-cols-2 z-50 relative'>
        <div>
            <label id="aria-label-special-attack" htmlFor="aria-special-attack-input">
                special-attack
            </label>
            <div className="w-4/5 h-14 ml-8 mr-8 relative">
                <input type="text" name="search" onChange={onChange} placeholder="search" className=" rounded-2xl absolute right-0 ease-in-out duration-300 border-solid border-gray-300 pt-1 pb-1 pl-2 pr-2 focus:w-full text-black" />
                <button type="submit" className="btn btn-search fa fa-search absolute p-1 border-none bg-gray-300 rounded-full h-6 w-6 right-1 top-1 inline-flex items-center justify-center">
                    <Image alt='search' src={SearchSVG} className='' style={{ width: '12px', height: '12px' }} />
                </button>
            </div>
        </div>

        <div>
            <div>
                <label id="aria-label-special-attack" htmlFor="aria-special-attack-input">
                    special-attack
                </label>
                <Select name="Sort By" options={sortOptions} onChange={(val) => onSortChange(val)} />
            </div>

        </div>
    </div>
        <div className='flex'>
            <div>
                <label id="aria-label-hp" htmlFor="aria-hp-input">
                    hp
                </label>
                <Select name='hp' aria-labelledby="aria-label-hp" inputId="aria-hp-input" options={dpOptions} onChange={(val) => onFilterChange(val, 'hp')} />
            </div>
            <div>
                <label id="aria-label-attack" htmlFor="aria-attack-input">
                    attack
                </label>
                <Select name='attack' aria-labelledby="aria-label-attack" inputId="aria-attack-input" options={dpOptions} onChange={(val) => onFilterChange(val, 'attack')} />
            </div>
            <div>
                <label id="aria-label-defense" htmlFor="aria-defense-input">
                    defense
                </label>
                <Select name='defense' aria-labelledby="aria-label-defense" inputId="aria-defense-input" options={dpOptions} onChange={(val) => onFilterChange(val, 'defense')} />
            </div>
            <div>
                <label id="aria-label-special-attack" htmlFor="aria-special-attack-input">
                    special-attack
                </label>
                <Select name='special-attack' aria-labelledby="aria-label-special-attack" inputId="aria-special-attack-input" options={dpOptions} onChange={(val) => onFilterChange(val, 'special-attack')} />
            </div>
            <div>
                <label id="aria-label-special-defense" htmlFor="aria-special-defense-input">
                    special-defense
                </label>
                <Select name='special-defense' aria-labelledby="aria-label-special-defense" inputId="aria-special-defense-input" options={dpOptions} onChange={(val) => onFilterChange(val, 'special-defense')} />
            </div>
            <div>
                <label id="aria-label-speed" htmlFor="aria-speed-input">
                    speed
                </label>
                <Select name='speed' aria-labelledby="aria-label-speed" inputId="aria-speed-input" options={dpOptions} onChange={(val) => onFilterChange(val, 'speed')} />
            </div>
        </div>
    </div>);
};

export default SearchBar;