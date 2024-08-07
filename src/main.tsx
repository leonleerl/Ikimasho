
import ReactDOM from 'react-dom/client'
import './tailwind.css'
import router from './router/index.tsx'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/index.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
)
