import { useAppSelector, useAppDispatch } from "../store/hooks"
import {add,add2} from '../store/actions'

export default function Test() {
  const num = useAppSelector((state)=>(
    state.r1.num
  ))

  const dispatch = useAppDispatch()


  return (
    <div className='home'>
        <h1>This is an example usage of redux store</h1>
        <p>The current value is {num}</p>
        <button onClick ={()=>dispatch(add())}>Add</button>
        <button onClick ={()=>dispatch(add2())}>Add</button>
    </div>
  )
}
