import React, {memo} from 'react';

interface IProps {
    pokemon: Record<string, any>
}

const PokemonItem = (props: IProps) => {
    const { pokemon } = props;
    return ( 
        <div className=" xl:w-1/5 w-1/4 mt-0 ml-4 mb-8 rounded-lg flex flex-col justify-center" style={{ backgroundColor: 'transparent' }}>
            <img src={pokemon?.image} alt={pokemon?.name} crossOrigin="anonymous" />
            <h3 className=" text-center font-bold">{pokemon?.name}</h3>
            <ul className=" p-3">
                {pokemon?.stats?.map((stat: Record<string, any>) => (
                <li key={stat.name}>{stat.name}: {stat.value}</li>
                ))}
            </ul>
        </div>
     );
};

export default memo(PokemonItem);