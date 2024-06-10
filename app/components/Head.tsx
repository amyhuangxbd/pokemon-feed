import Image from "next/image";
import Link from "next/link";
import Logo from '@/app/asset/img/pokeapi.png'

const Head = () => {
    return ( 
        <header className="flex justify-between items-center pl-6 pr-6">
            <Link href={''}><Image src={Logo} alt="logo" /></Link>
            <aside>Wechat/Tel: 15721169252</aside>
        </header>
     );
};

export default Head;