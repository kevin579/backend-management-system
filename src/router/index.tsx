import React,{lazy, type JSX} from 'react'
import {Navigate } from 'react-router-dom'

const Home = lazy(()=>import('../view/Home'))
// const About = lazy(()=>import('../view/About'))
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
        element: <Navigate to='/home'/>
    },
    {
        path:'/home',
        element: withLoadingComponent(<Home/>),
        children:[
            {
                path:'page1',
                element:<Page1/>
            }
        ]
    }
]

export default paths