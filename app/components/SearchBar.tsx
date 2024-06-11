'use client'
import React, { useId } from 'react';
import SearchSVG from '@/app/asset/img/search.svg'
import Image from 'next/image'
import Select from 'react-select'
import type { SingleValue } from 'react-select'
import useStore from '@/app/store/useStore'

const dpOptions = [
  {
    value: '',
    label: 'Any'
  },
  {
    value: '{"min": 0, "max": 60}',
    label: '0 - 60'
  },
  {
    value: '{"min": 61, "max": 100}',
    label: '61 - 100'
  },
  {
    value: '{"min": 101}',
    label: '100+'
  }
]

const sortOptions = [
  {
    value: '',
    label: 'Any'
  },
  {
    value: 'name asc',
    label: 'name A - Z',
    type: 'asc',
    field: 'name'
  },
  {
    value: 'name des',
    label: 'name Z - A',
    type: 'des',
    field: 'name'
  },
  {
    value: 'hp asc',
    label: 'hp 0 - 100',
    type: 'asc',
    field: 'hp'
  },
  {
    value: 'hp des',
    label: 'hp 100 - 0',
    type: 'des',
    field: 'hp'
  },
  {
    value: 'attack asc',
    label: 'attack 0 - 100',
    type: 'asc',
    field: 'attack'
  },
  {
    value: 'attack des',
    label: 'attack 100 - 0',
    type: 'des',
    field: 'attack'
  },
  {
    value: 'defense asc',
    label: 'defense 0 - 100',
    type: 'asc',
    field: 'defense'
  },
  {
    value: 'defense des',
    label: 'defense 100 - 0',
    type: 'des',
    field: 'defense'
  }
]

const SearchBar = () => {
  const { filters, setFilters, setSearch, setSorter, setCurrentPage } = useStore()
  function onChange (e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value)
  }
  function onFilterChange (
    val: SingleValue<{
      value: string
      label: string
    }>,
    name: string
  ) {
    const { value } = val || {}
    if (value) {
      setFilters({ ...filters, [name]: value })
    } else {
      let temp = filters
      delete temp[name]
      setFilters(temp)
    }
  }
  function onSortChange (
    val: SingleValue<{
      value: string
      label: string
    }>
  ) {
    if (val?.value) {
      setSorter(val)
    } else {
      setSorter(null)
    }
  }
  // function onReset() {
  //   setFilters({}); 
  //   setSearch(''); 
  //   setSorter(null)
  // }
  return (
    <div className='relative  p-8'>
      <div className=' grid grid-cols-2 gap-4 justify-between relative z-50'>
        <div>
          <label
            // id='aria-label-search'
            // htmlFor='aria-search-input'
            className=' ml-8'
          >
            Search
          </label>
          <div className='w-4/5 h-14 ml-8 mr-8 relative'>
            <input
              type='text'
              name='search'
              onChange={onChange}
              placeholder='search'
              className=' rounded-2xl absolute left-0 ease-in-out duration-300 border-solid border-gray-300 pt-1 pb-1 pl-8 pr-2 focus:w-full text-black'
            />
            <button
              type='submit'
              className='btn btn-search fa fa-search absolute p-1 border-none bg-gray-300 rounded-full h-6 w-6 left-1 top-1 inline-flex items-center justify-center'
            >
              <Image
                alt='search'
                src={SearchSVG}
                className=''
                style={{ width: '12px', height: '12px' }}
              />
            </button>
          </div>
        </div>

        <div>
          <label
            id='aria-label-sort'
            htmlFor='aria-sort-input'
          >
            Sort By
          </label>
          <Select
            className=' w-56'
            name='Sort By'
            aria-labelledby='aria-label-sort'
            inputId='aria-sort-input'
            instanceId={'aria-sort-input'}
            options={sortOptions}
            onChange={val => onSortChange(val)}
          />
        </div>

        {/* <button onClick={onReset} className='hover:bg-yellow-600 hover:text-white w-32 h-10'>Reset</button> */}
      </div>
      <div className='grid grid-cols-6 gap-4 ml-8 '>
        <div>
          <label 
            id='aria-label-hp' 
            htmlFor='aria-hp-input'
        >
            hp
          </label>
          <Select
            name='hp'
            aria-labelledby='aria-label-hp'
            inputId='aria-hp-input'
            instanceId={'aria-hp-input'}
            options={dpOptions}
            onChange={val => onFilterChange(val, 'hp')}
          />
        </div>
        <div>
          <label 
            id='aria-label-attack' 
            htmlFor='aria-attack-input'
        >
            attack
          </label>
          <Select
            name='attack'
            aria-labelledby='aria-label-attack'
            inputId='aria-attack-input'
            instanceId={'aria-attack-input'}
            options={dpOptions}
            onChange={val => onFilterChange(val, 'attack')}
          />
        </div>
        <div>
          <label 
            id='aria-label-defense' 
            htmlFor='aria-defense-input'
        >
            defense
          </label>
          <Select
            name='defense'
            aria-labelledby='aria-label-defense'
            inputId='aria-defense-input'
            instanceId={'aria-defense-input'}
            options={dpOptions}
            onChange={val => onFilterChange(val, 'defense')}
          />
        </div>
        <div>
          <label
            id='aria-label-special-attack'
            htmlFor='aria-special-attack-input'
          >
            special-attack
          </label>
          <Select
            name='special-attack'
            aria-labelledby='aria-label-special-attack'
            inputId='aria-special-attack-input'
            instanceId={'aria-special-attack-input'}
            options={dpOptions}
            onChange={val => onFilterChange(val, 'special-attack')}
          />
        </div>
        <div>
          <label
            id='aria-label-special-defense'
            htmlFor='aria-special-defense-input'
          >
            special-defense
          </label>
          <Select
            name='special-defense'
            aria-labelledby='aria-label-special-defense'
            inputId='aria-special-defense-input'
            instanceId={'aria-special-defense-input'}
            options={dpOptions}
            onChange={val => onFilterChange(val, 'special-defense')}
          />
        </div>
        <div>
          <label 
            id='aria-label-speed' 
            htmlFor='aria-speed-input'
        >
            speed
          </label>
          <Select
            name='speed'
            aria-labelledby='aria-label-speed'
            inputId='aria-speed-input'
            instanceId={'aria-speed-input'}
            options={dpOptions}
            onChange={val => onFilterChange(val, 'speed')}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchBar
