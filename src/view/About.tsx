import { useAppSelector, useAppDispatch } from "../store/hooks"


export default function About() {
  const num = useAppSelector((state)=>(
    state.r1.num
  ))

  const dispatch = useAppDispatch();
  const add = ()=>{
    dispatch({type:'configItem/add',payload:5})
  }
  return (
    <div className='home'>
        <p>The num is {num}</p>
        <button onClick={add}>Add</button>
    </div>
  )
}
