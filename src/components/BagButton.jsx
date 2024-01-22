import React from 'react';
import {BsBag} from 'react-icons/bs';
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import "./BagButton.css";


const BagButton = () => {
  const { setOpenBag, bagItems } = useContext(StoreContext)

  const numberOfItens = bagItems.reduce((acc, item) => {
    return item.quantity + acc
  }, 0)

  return (
    <button className="bag-btn" onClick={() => setOpenBag(true)}>
      <BsBag/>
          {bagItems.length > 0 && (<span className='notification'> {numberOfItens} </span>)}
    </button>
  )
}

export default BagButton
