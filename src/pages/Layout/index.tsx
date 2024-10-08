

import { Outlet } from "react-router-dom";

const Layout = () => {

    return <>
        <nav className="bg-red-400 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">一緒に勉強しましょう</div>
        <div className="space-x-4">
          <a href="/" className="text-white hover:text-gray-300">
            Home
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