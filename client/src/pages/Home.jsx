import React from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Home = () => {
    const handleClick = ()=>{
          toast.success('How is it!')
     }
    const user = useSelector(state=>state.user.user);
    console.log("user",user);
    
  return (
    <div>
        <button onClick={handleClick} className='p-5 border border-black active:scale-95'>Clice Me See Magiv</button>
    </div>
  )
}

export default Home