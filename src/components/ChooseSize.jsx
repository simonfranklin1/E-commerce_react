import React from 'react'
import './ChooseSize.css'

const ChooseSize = ({size, handleSize}) => {
  return (
    <div className="choose-size">
        <p>Tamanho: {size || <span className='size-message'>Escolha um tamanho, por favor</span>}  </p>
        <div className="size">
            <button className='size-btn' onClick={handleSize}>PP</button>
            <button className='size-btn' onClick={handleSize}>P</button>
            <button className='size-btn' onClick={handleSize}>M</button>
            <button className='size-btn' onClick={handleSize}>GG</button>
            <button className='size-btn' onClick={handleSize}>G2</button>
        </div>
    </div>
  )
}

export default ChooseSize