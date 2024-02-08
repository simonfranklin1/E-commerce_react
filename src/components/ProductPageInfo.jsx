import { useContext, useState } from 'react';
import FavoriteButton from '../components/FavoriteButton';
import { formatCurrency, saveLocalStorage, getLocalStorage } from '../utilities/utilities';
import { BsFillBagFill } from "react-icons/bs";
import { FaLongArrowAltDown } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';


const sizeOptions = ["PP", "P", "M", "G", "GG"];

const ProductPageInfo = ({ product }) => {
    const { bagItems, setBagItems, user, setUser } = useContext(StoreContext);

    const navigate = useNavigate();
    const [ toggleFavorite, setToggleFavorite ] = useState(false);
    const users = getLocalStorage("users_db");

    const [size, setSize] = useState(false);

    const handleSize = (e) => {
        const element = e.target;

        setSize(element.innerText);
        document.querySelectorAll(".select-size").forEach((btn) => btn.classList.remove('select-size'));

        element.classList.add('select-size');
    }

    const addToBag = () => {
        if (!size) {
            document.querySelector(".size-message").style.display = "inline-block";
        } else {
            const itemData = {
                id: product.id,
                title: product.name,
                price: product.price,
                quantity: 1,
                thumbnail: product.thumbnail,
                brand: product.brand,
                size: size
            }

            const alreadyAdded = bagItems.find((item) => item.id === itemData.id && item.size === itemData.size);

            if (alreadyAdded) {
                alreadyAdded.quantity += 1;
                setBagItems([...bagItems]);
                saveLocalStorage("bag", bagItems)
            } else {
                setBagItems([...bagItems, itemData]);
                saveLocalStorage("bag", [...bagItems, itemData]);
            }
        }
    }

    const favoriteItem = () => {
        if (user) {
            const alreadyFavorite = user.favorites.find((favorite) => favorite.id === product.id);

            const findUser = users?.find((fUser) => fUser.email === user.email);

            if (alreadyFavorite) {
                const filteredFavorites = user.favorites.filter((favorite) => favorite.id !== product.id);
                setUser({ ...user, favorites: filteredFavorites });
                findUser.favorites = filteredFavorites;
                setToggleFavorite(false);
            } else {
                setUser({ ...user, favorites: [...user.favorites, product] });
                findUser.favorites = [...user.favorites, product];
                setToggleFavorite(true)
            }

            saveLocalStorage("users_db", [...users]);

            /*const res = await fetch(url + `/users/${user.id}`, {
                method: "PATCH",
                headers: {
                    "Content-type" : "application/json"
                },
                body: JSON.stringify(updatedUser)
            })*/

        } else {
            window.alert("Para favoritar algum produto, faça login.");
            navigate("/sign-in");
        }
    }

    return (
        <div className="info-buy">
            <p className="page-title">
                {product.name}
            </p>

            <p className="brand">
                {product.brand}
            </p>

            <hr style={{ width: "100%", marginBottom: "1rem", marginTop: "1rem" }} />

            <div className="price-info">
                Preço:
                <div className="price">
                    <div className="past-price"> de <span>{formatCurrency(product.price * 2, 'BRL')}</span></div>
                    <div className="actual-price"> {formatCurrency(product.price, 'BRL')} <span className="discount-info"><FaLongArrowAltDown /> -50%</span></div>
                </div>
            </div>

            <div className="choose-size">
                <p>Tamanho: {size || <span className='size-message'>Escolha um tamanho, por favor</span>}  </p>
                <div className="size">
                    {sizeOptions.map((sizeoption) => (
                        <button key={sizeoption} className='size-btn' onClick={handleSize}>{sizeoption}</button>
                    ))}
                </div>
            </div>

            <div className="buttons">
                <button className="add-cart-btn" onClick={addToBag} >
                    Adicionar à Sacola <BsFillBagFill />
                </button>

                <FavoriteButton favoriteItem={favoriteItem} user={user} setToggleFavorite={setToggleFavorite} toggleFavorite={toggleFavorite} product={product} />
            </div>
        </div>
    )
}

export default ProductPageInfo