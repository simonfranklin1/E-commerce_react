import { useContext } from 'react';
import { FaTrash } from 'react-icons/fa';
import { BiMinus, BiPlus} from 'react-icons/bi';
import { saveLocalStorage } from '../utilities/utilities';
import { StoreContext } from '../context/StoreContext';
import './BagItem.css';
import { formatCurrency } from '../utilities/utilities';


const BagItem = ({data}) => {
    const { id, title, price, quantity, thumbnail, size } = data;

    const { bagItems, setBagItems } = useContext(StoreContext);

    const handleRemoveItem = () => { 
        const updatedItems = bagItems.filter((item) => item !== data);

        setBagItems(updatedItems);
        saveLocalStorage("bag", updatedItems);
    }

    const incrementItemQuantity = () => {
        data.quantity += 1;
        setBagItems([...bagItems]);
        saveLocalStorage("bag", bagItems);
    }

    const decrementItemQuantity = () => {
        if(data.quantity > 1) {
            data.quantity -= 1;
            setBagItems([...bagItems]);
            saveLocalStorage("bag", bagItems);
        } else {
            handleRemoveItem();
        }
    }

  return (
    <div className="bag-card">
        <img src={thumbnail} alt={"Image product " + id} />
        <div className="bag_info">
            <p className="item-title">
                {title}
            </p>
            <p className='item-size'>Tamanho: {size}</p>
            <p className="item-price">
            {formatCurrency(price, 'BRL')}
            </p>
        </div>

        <div className="quantity-items">
                <button> 
                    <BiMinus onClick={decrementItemQuantity} /> 
                </button>

                {quantity}
                
                <button> 
                    <BiPlus onClick={incrementItemQuantity} />
                </button>
        </div>
        <button className="delete-item" onClick={handleRemoveItem}>
            <FaTrash />
        </button>
    </div>
  )
}

export default BagItem