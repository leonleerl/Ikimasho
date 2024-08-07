
import { AppDispatch } from "@/store";
import { getCardList } from "@/store/modules/cardStore";
import { useEffect} from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

const Layout = () => {

    const dispatch : AppDispatch = useDispatch();
    useEffect(()=>{
        dispatch(getCardList());
    }, [dispatch])
    return <>
        <nav className="bg-red-400 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">一緒に行きましょ！</div>
        <div className="space-x-4">
          <a href="/" className="text-white hover:text-gray-300">
            Home
          </a>
          <a href="/about" className="text-white hover:text-gray-300">
            About
          </a>
          <a href="/service" className="text-white hover:text-gray-300">
            Service
          </a>
          <a href="/game" className="text-white hover:text-gray-300">
            Games
          </a>
        </div>
      </div>
    </nav>
    <Outlet/>
    </>
}


export default Layout;