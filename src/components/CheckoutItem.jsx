import React from 'react';
import "./CheckoutItem.css";

const CheckoutItem = ({data}) => {
    const { title, id, thumbnail, price, size, quantity } = data;

  return (
    <div className="checkout-card">
        <img className='checkout-image'  src={thumbnail} alt={"Image product " + id} />
        <div className="checkout_info">
            <p className="item-title">
                {title} x {quantity}
            </p>
            <p className='item-size'>Tamanho: {size}</p>
            <p className="item-price">
                R$ {price},00
            </p>
        </div>
    </div>
  )
}

export default CheckoutItem