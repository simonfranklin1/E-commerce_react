import "./Checkout.css"
import CheckoutItem from "../components/CheckoutItem"
import { insertMaskInCep, validateCard, validadeDate, validateCVV, formatCurrency, saveLocalStorage, removeLocalStorage } from "../utilities/utilities"
import { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const { setBagItens, bagItens, user, setUser, checkout, setCheckout } = useContext(StoreContext);

    if(!checkout) {
        setCheckout(true);
    }

    const itens = bagItens;
    const totalPrice = itens.reduce((acc, item) => {
        return item.price * item.quantity + acc
    }, 0);

    const [name, setName] = useState('');
    const [cep, setCep] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiration, setExpiration] = useState('');

    const navigate = useNavigate()

    const actualDate = new Date();

    const orderPlaced = {
            nameUser: name,
            orderDate: actualDate,
            order: itens
        }

    const saveOrder = (e) => {
        e.preventDefault()

        if(itens.length === 0) {
            return;
        }

        setUser({...user, orders: [...user.orders, orderPlaced]});
        console.log({...user, orders: [...user.orders, orderPlaced]})
        setBagItens([]);
        removeLocalStorage("bag");
        navigate("/");
        setCheckout(false)
    }

  return (
    <div className="checkout">
        <form onSubmit={saveOrder}>
            <section className="user-data">
                <p className="title">Seus Dados</p>
                <div className="form">
                    <label>
                        <p>Nome</p>
                        <input type="text" name="nome"  placeholder='Nome Completo' value={name} onChange={(e) => setName(e.target.value)} required />
                    </label>
                </div>
                <div className="form">
                    <label>
                        <p>CEP</p>
                        <input type="text" name="cep"  placeholder='11122-333' value={cep} onChange={(e) => setCep(insertMaskInCep(e.target.value))} required />
                    </label>
                </div>
                <div className="form">
                    <label>
                        <p>Endereço</p>
                        <input type="text" name="endereco"  placeholder='Rua José' required />
                    </label>
                </div>
                <div className="flex-form">
                    <div className="form">
                        <label>
                            <p>Número</p>
                            <input type="text" name="numero"  placeholder='520' required />
                        </label>
                    </div>
                    <div className="form">
                        <label>
                            <p>Complemento</p>
                            <input type="text" name="complemento"  placeholder='100' />
                        </label>
                    </div>
                </div>
            </section>

            <section className="payment-data">
                <p className="title">Pagamento</p>
                <div className="form">
                    <label>
                        <p>Pagamento do Cartão</p>
                        <input type="text" name="cartao" placeholder='Numero do Cartão' value={cardNumber} onChange={(e) => setCardNumber(validateCard(e.target.value))} required/>
                    </label>
                </div>
                <div className="flex-form">
                <div className="form">
                    <label>
                        <p>CVV</p>
                        <input type="text" name="cvv"  placeholder='222' value={cvv} onChange={(e) => setCvv(validateCVV(e.target.value))} required />
                    </label>
                </div>
                <div className="form">
                    <label>
                        <p>Data de Validade</p>
                        <input type="text" name="validade"  placeholder='10/24' value={expiration} onChange={(e) => setExpiration(validadeDate(e.target.value))} required />
                    </label>
                </div>
                </div>
            </section>
            
            <section className="bag-data">
                <div className="bag-itens">
                    {itens && itens.map((item) =>  <CheckoutItem key={`${item.id} | ${item.size}`} data={item} />)}
                </div>

                <div className="finish-buying">
                    <div className="bag-price">
                        <p>Preço Total: <span> {formatCurrency(totalPrice, 'BRL')} </span></p>
                    </div>
                    <button className="checkout_button" type="submit">Finalizar Compra</button>
                </div>
            </section>
        </form>
    </div>
  )
}

export default Checkout