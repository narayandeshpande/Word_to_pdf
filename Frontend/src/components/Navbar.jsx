import React from 'react'

const Navbar = () => {
  return (
    <>
      <div className='max-w-screen-2xl mx-auto container px-6 md:px-40 py-3 shadow-lg h-16 fixed'>
        <div className='flex justify-between items-center'>
            <h1 className='text-2xl cursor-pointer font-bold text-center'>Word<span className='text-green-500 text-3xl'>To</span>PDF</h1>
            <h1 className='text-2xl cursor-pointer font-bold mx-1 hover:scale-125 duration-300'>Home</h1>
        </div>
      </div>
    </>
  )
}

export default Navbar
