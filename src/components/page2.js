import React from 'react'
import Camera from './camera'
import Chatbox from './chatbox'
import './page2.css'

const Page2 = () => {
  return (
    <>
      <div className='flex items-center justify-center h-screen'>
      <Camera />
      <Chatbox />
      </div>
    </>
  )
}

export default Page2
