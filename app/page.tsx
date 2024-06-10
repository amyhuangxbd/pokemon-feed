import Head from "./components/Head";
import SearchBar from "./components/SearchBar";
import MainContent from './components/MainContent';
import FirstPaint from "./components/FirstPaint";

const Home = async () => {
    
    return ( 
        <div>
            <Head />
            <div>
                <SearchBar />
                <div className=" flex flex-wrap w-full  justify-center">
                    <FirstPaint>
                        {/* @ts-ignore */}
                        <MainContent />
                    </FirstPaint>
                </div>
            </div>
        </div>
    );
};

export default Home;