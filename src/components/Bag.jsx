import "./Bag.css"
import { RiCloseCircleFill } from "react-icons/ri"
import { useContext } from 'react'
import BagItem from './BagItem'
import { StoreContext } from '../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import { formatCurrency } from "../utilities/utilities"

const Bag = () => {
  const { openBag, setOpenBag, bagItems, setCheckout, user } = useContext(StoreContext);

  const totalPrice = bagItems.reduce((acc, item) => {
    return item.price * item.quantity + acc
  }, 0);

  const navigate = useNavigate();

  const goToCheckout = () => {
    if(bagItems.length > 0) {
      navigate("/checkout");
      setOpenBag(false);
      setCheckout(true);
    } else {
      return;
    }  
  }

  const goToLogin = () => {
    navigate("/sign-in");
    setOpenBag(false);
  }

  return (
    <section className={`bag  ${ openBag ? 'open' : 'close'}`}>

        <div className="bag-header">
            <p>Sacola</p>
            <RiCloseCircleFill className='close-bag' onClick={() => setOpenBag(false)}/>
        </div>

        <div className={`bag-itens ${bagItems.length === 0 ?  'empty' : ''}`}>
            {bagItems.length === 0 && <p style={{ opacity: '.8', textAlign: 'center', fontSize: '20px'}}>Sua sacola está vazia</p>}
            {bagItems && bagItems.map((item) => <BagItem key={`${item.id} | ${item.size}`} data={item}></BagItem>)}
        </div>

        <div className="finish-buying">
            <div className="total-price">
              <p>{formatCurrency(totalPrice, 'BRL')}</p>
            </div>
            { user && (
                <button className="bag_button" onClick={goToCheckout}>
                  Finalizar compra
                </button>
              ) || (
                <button className="no-user_button" onClick={goToLogin}>
                  Faça Login para finalizar
                </button> 
              )
            }
        </div>

    </section>
  )
}

export default Bag