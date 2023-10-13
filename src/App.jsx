import React from 'react'
import './App.css'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import {MainLayout,Home,Cryptocurrencies,CryptoDetails,News,Exchanges} from './components'
import { store } from './Redux/store'
import { Provider } from 'react-redux'

const router = createHashRouter([
    {path:'/',element:<MainLayout/>,children:[
        {index:true,element:<Home/>},
        {path:'/cryptocurrencies',element:<Cryptocurrencies/>},
        {path:'/exchanges',element:<Exchanges/>},
        {path:'/news',element:<News/>},
        {path:'/crypto/:coinId',element:<CryptoDetails/>},
    ]}
])

export default function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </>
  )
}
