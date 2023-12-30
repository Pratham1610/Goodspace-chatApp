import React from 'react'
import logoImage from './Group.png';
const Intro = () => {
  return (
    <>
    <div className="pt-20 pl-16">
   <div className="w-96 h-80 flex flex-col justify-start items-start">
  <div className="w-30 h-44 relative p-4">
    <img src={logoImage} alt="Logo" className="logo object-cover w-full h-full" />
  </div>
  <div className="text-center text-white text-5xl font-bold font-poppins">Welcome to</div>
  <div className="text-center text-white text-5xl font-bold font-poppins">Goodspace Communications</div>
</div>
</div>
    </>
  )
}

export default Intro