import { useAppSelector, useAppDispatch } from "../store/hooks"
import {add,add2} from '../store/actions'

export default function About() {
  const num = useAppSelector((state)=>(
    state.r1.num
  ))

  const dispatch = useAppDispatch()


  return (
    <div className='home'>
        <h1>This is an example usage of redux store</h1>
        <p>The num is {num}</p>
        <button onClick ={()=>dispatch(add())}>Add</button>
        <button onClick ={()=>dispatch(add2())}>Add</button>
    </div>
  )
}
