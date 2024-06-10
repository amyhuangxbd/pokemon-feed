import Head from "./components/Head";
import SearchBar from "./components/SearchBar";
import MainContent from './components/MainContent';
import FirstPaint from "./components/FirstPaint";

const Home = async () => {
    
    return ( 
        <div>
            <div className=" sticky top-0 z-50 bg-slate-100">
                <Head />
                <SearchBar />
            </div>
            
            <div>
                
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