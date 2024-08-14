import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
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
        path:'/game',
        element: <Game />,
      }
    ]
  },

])

export default router