import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center bg-emerald-800 text-white py-4 px-8'>
        <div className="icon">
            <span>iNotes</span>
        </div>
        <ul className='flex gap-8'>
            <li className='cursor-pointer hover:bg-white hover:text-black border hover:border-white transition-all py-1 px-2 rounded-3xl flex items-center justify-center'>Home</li>
            <li className='cursor-pointer hover:bg-white hover:text-black border hover:border-white transition-all py-1 px-2 rounded-3xl flex items-center justify-center'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
