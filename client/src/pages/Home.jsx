import React, { Fragment } from 'react'
import { useHandleLogout } from '../utils/useHandleLogout'

const Home = () => {

  const handleLogout = useHandleLogout();
    
  return (
    <Fragment>
       <header className='px-10 shadow-md flex items-center justify-between w-[100%] py-5 '>
           <div className='font-black'>TP</div>
          <button onClick={handleLogout} className='bg-red-500 text-white px-5 py-2'>Logout</button>
        </header>  
    <div className='flex items-center justify-center w-[100%] h-screen'>
        <div className='p-5 border rounded-lg flex flex-col items-center justify-center gap-5 w-[300px] shadow-md '>
           <h1 className='text-5xl bold'>Courses</h1>
           <a href="/course" className='px-3 rounded-lg py-2 bg-yellow-500 text-white'>View Courses</a>
        </div>
    </div>
    </Fragment>
  )
}

export default Home