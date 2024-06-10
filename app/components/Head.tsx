import Image from "next/image";
import Link from "next/link";
import Logo from '@/app/asset/img/pokeapi.png'

const Head = () => {
    return ( 
        <header>
            <Link href={''}><Image src={Logo} alt="logo" /></Link>
        </header>
     );
};

export default Head;