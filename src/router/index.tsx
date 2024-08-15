import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/pages/Layout'
import { lazy, Suspense } from 'react'

const Home = lazy(() => import("@/pages/Home"))
const Game = lazy(() => import("@/pages/Game/HiraganaGame"))


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children:[
      {
        index:true,
        element:
          <Suspense fallback={"加载中"}>
            <Home/>
        </Suspense>
    },
       {
        path:'/game',
        element: 
        <Suspense fallback={"加载中"}>
          <Game/>
        </Suspense>
      }
    ]
  },

])

export default router