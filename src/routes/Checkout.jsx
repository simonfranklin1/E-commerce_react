import "./Checkout.css"
import { insertMaskInCep, validateCard, validadeDate, validateCVV, formatCurrency, saveLocalStorage, removeLocalStorage, getLocalStorage } from "../utilities/utilities"
import { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const { setBagItems, bagItems, user, setUser, checkout, setCheckout, url } = useContext(StoreContext);
    const [ users, setUsers] = useState(getLocalStorage("users_db") || []);

    if(!checkout) {
        setCheckout(true);
    }

    const items = bagItems;
    const totalPrice = items.reduce((acc, item) => {
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
        order: items
    }

    const saveOrder = (e) => {
        e.preventDefault();

        if(items.length === 0) {
            return;
        }

        const findUser = users?.find((fUser) => fUser.email === user.email);
        setUser({...user, orders: [orderPlaced, ...user.orders]});
        findUser.orders = [orderPlaced, ...user.orders];

        saveLocalStorage("users_db", [...users]);

        /*const res = await fetch(url + `/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify(updatedUser)
        }); */
            

        setBagItems([]);
        removeLocalStorage("bag");
        navigate("/");
        setCheckout(false);
    }

  return (
    <div className="checkout">
        <form onSubmit={saveOrder}>
            <h2 className="form-title">Preencha os dados para finalizar a compra</h2>
            <div className="checkout-data">
                <section>
                    <div className="form-field">
                        <label>
                            <p>Nome Completo</p>
                            <input type="text" name="nome"  placeholder='Nome Completo' value={name} onChange={(e) => setName(e.target.value)} required />
                        </label>
                    </div>
                    <div className="form-field">
                        <label>
                            <p>CEP</p>
                            <input type="text" name="cep"  placeholder='11122-333' value={cep} onChange={(e) => setCep(insertMaskInCep(e.target.value))} required />
                        </label>
                    </div>
                    <div className="form-field">
                        <label>
                            <p>Endereço</p>
                            <input type="text" name="endereco"  placeholder='Rua José' required />
                        </label>
                    </div>
                    <div className="flex-form">
                        <div className="form-field">
                            <label>
                                <p>Número</p>
                                <input type="text" name="numero"  placeholder='520' required />
                            </label>
                        </div>
                        <div className="form-field">
                            <label>
                                <p>Complemento</p>
                                <input type="text" name="complemento"  placeholder='100' />
                            </label>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="form-field">
                        <label>
                            <p>Número do Cartão</p>
                            <input type="text" name="cartao" placeholder='Numero do Cartão' value={cardNumber} onChange={(e) => setCardNumber(validateCard(e.target.value))} required/>
                        </label>
                    </div>
                    <div className="flex-form">
                        <div className="form-field">
                            <label>
                                <p>CVV</p>
                                <input type="text" name="cvv"  placeholder='222' value={cvv} onChange={(e) => setCvv(validateCVV(e.target.value))} required />
                            </label>
                        </div>
                        <div className="form-field">
                            <label>
                                <p>Data de Validade</p>
                                <input type="text" name="validade"  placeholder='10/24' value={expiration} onChange={(e) => setExpiration(validadeDate(e.target.value))} required />
                            </label>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="finish-checkout">
                        <div className="checkout-price">
                            <p>Preço Total: <span> {formatCurrency(totalPrice, 'BRL')} </span></p>
                        </div>
                        <button className="checkout_button" type="submit">Finalizar Compra</button>
                    </div>
                </section>
            </div>
        </form>
    </div>
  )
}

export default Checkout