import React from 'react'
import {FaRegUser} from 'react-icons/fa6'
import "./UserButton.css"

const UserButton = () => {
  return (
    <button className='user-btn'>
      <FaRegUser />
    </button>
  )
}

export default UserButton