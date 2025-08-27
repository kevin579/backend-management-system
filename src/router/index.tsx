import React,{lazy, type JSX} from 'react'
import {Navigate } from 'react-router-dom'
import Login from '../view/Users/login'
import Register from '../view/Users/register'
const Home = lazy(()=>import('../view/Home'))
const Page1 = lazy(()=>import('../view/About'))


const withLoadingComponent = (component:JSX.Element)=>{
    return (
        <React.Suspense fallback={<div>Loading</div>}>
            {component}
        </React.Suspense>
    )
}
const paths = [
    {
        path:'/',
        element: <Home/>,
        children:[
            {
                path:'page1',
                element:withLoadingComponent(<Page1/>)
            },
            {
                path:'page2',
                element:withLoadingComponent(<Page1/>)
            },
            {
                path:'page3/page301',
                element:withLoadingComponent(<Page1/>)
            },
            {
                path:'page3/page302',
                element:withLoadingComponent(<Page1/>)
            },
            {
                path:'page3/page303',
                element:withLoadingComponent(<Page1/>)
            },
            {
                path:'page4/page401',
                element:withLoadingComponent(<Page1/>)
            },
            {
                path:'page4/page402',
                element:withLoadingComponent(<Page1/>)
            },
            {
                path:'page5',
                element:withLoadingComponent(<Page1/>)
            }
        ]
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'register',
        element:<Register/>
    },
    {
        path:'*',
        element: <Navigate to='/home'/>
    }
]

export default paths