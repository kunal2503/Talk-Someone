import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
    const navigate = useNavigate();

    const handleClick = () =>{
        navigate("/")
    }

  return (
    <>
        <div className='flex flex-col justify-center items-center bg-gray-900 min-h-screen '>
            <h1 className='text-white text-6xl font-semibold'>404</h1>
            <p className='text-white text-2xl m-2'>Page Not Found</p>
            <button onClick={handleClick} className='py-2 px-4 bg-blue-500 hover:bg-blue-600 mt-2 rounded-sm hover:rounded-full'>Go Home</button>
        </div>
    </>
  )
}

export default PageNotFound