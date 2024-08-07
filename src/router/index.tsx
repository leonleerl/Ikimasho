import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Service from '../pages/Service'
import Game from '../pages/Game'
import Layout from '@/pages/Layout'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children:[
        {
            index:true,
            element:<Home/>
        },
        {
            path: '/about',
            element: <About />,
          },  {
            path: '/service',
            element: <Service />,
          },  {
            path: '/game',
            element: <Game />,
          },
    ]
  },

])

export default router