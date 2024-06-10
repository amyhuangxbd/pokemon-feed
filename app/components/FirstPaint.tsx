import PokemonItem from "./PokemonItem";

const FirstPaint = props => {
    const { totalCount, details } = props
    return (
        <>
            {
                details.map((item, index) => (
                    <PokemonItem key={index} pokemon={item} />
                ))
            }
        </>
    );
};

export default FirstPaint;