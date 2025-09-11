
import {useRoutes } from "react-router-dom"
import router from './router'
function App() {
  // const [count, setCount] = useState(0)
  const outlet = useRoutes(router)
  return (
    <div className="app">
      {/* <NavLink to='/home'>Home</NavLink>
      <NavLink to='/about'>About</NavLink> */}
      {/* <Outlet/> */}
      {outlet}
    </div>
  )
}

export default App
