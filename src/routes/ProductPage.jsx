import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import Loading from '../components/Loading';
import { useParams } from 'react-router-dom';
import { BsFillBagFill } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { FaLongArrowAltDown } from "react-icons/fa";
import "./ProductPage.css";
import { fetchUrl, formatCurrency, saveLocalStorage } from '../utilities/utilities';
import Carousel from '../components/ProductPageSlider';

const ProductPage = () => {

    const { id } = useParams();
    const { url, loading, setLoading, bagItens, setBagItens, favorites, setFavorites } = useContext(StoreContext);

    const [ product, setProduct ] = useState({});

    useEffect(() => {
        setLoading(true);
        fetchUrl(url + `/products/${id}`).then((response) => {
            setProduct(response)
            setLoading(false)
        })

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }, []);

    const [ size, setSize ] = useState(false);

    const itemData = {
        id: product.id,
        title: product.name,
        price: product.price,
        quantity: 1,
        thumbnail: product.thumbnail,
        brand: product.brand,
        size: size
    }

    const handleSize = (e) => {
        const element = e.target;

        setSize(element.innerText);
        document.querySelectorAll(".select-size").forEach((btn) => btn.classList.remove('select-size'));

        element.classList.add('select-size')
    }

    const addToBag = () => {
        if(!size) {
            document.querySelector(".size-message").style.display = "inline-block";
        } else {
            const alreadyAdded = bagItens.find((item) => item.id === itemData.id && item.size === itemData.size);
            if(alreadyAdded) {
                alreadyAdded.quantity += 1;
                setBagItens([...bagItens]);
                saveLocalStorage("bag", bagItens)
            } else {
                setBagItens([...bagItens, itemData]);
                saveLocalStorage("bag", [...bagItens, itemData]); 
            }
        }    
    }

    const favoriteItem = () => {
        const alreadyAdded = favorites.find((item) => item.id === product.id);
        if(alreadyAdded) {
            return;
        } else {
            setFavorites([itemData, ...favorites]);
            saveLocalStorage("favorites", [itemData, ...favorites]);
        }
    }

  return (
    (!product.thumbnail && <Loading />) || (loading && <Loading />) || (
        <section className="container-product-page">
            <div className="product-page">
                    <Carousel thumbnail={product.thumbnail} id={product.id} />
                <div className="info-buy">
                    <p className="page-title">
                        {product.name}
                    </p>

                    <p className="brand">
                        {product.brand}
                    </p>

                    <hr style={{ width: "100%", marginBottom: "1rem", marginTop: "1rem" }} />

                    <div className="price-info">
                        Preço: <div className="price">
                                    <div className="past-price"> de <span>{formatCurrency(product.price * 2, 'BRL')}</span></div>
                                    <div className="actual-price"> {formatCurrency(product.price,'BRL')} <span className="discount-info"><FaLongArrowAltDown /> -50%</span></div>
                                </div>
                    </div>
                    
                    <div className="choose-size">
                        <p>Tamanho: { size || <span className='size-message'>Escolha um tamanho, por favor</span> }  </p>
                        <div className="size">
                            <button className='size-btn' onClick={handleSize}>PP</button>
                            <button className='size-btn' onClick={handleSize}>P</button>
                            <button className='size-btn' onClick={handleSize}>M</button>
                            <button className='size-btn' onClick={handleSize}>GG</button>
                            <button className='size-btn' onClick={handleSize}>G2</button>
                        </div>
                    </div>

                    <div className="buttons">
                        <button className="add-cart-btn" onClick={addToBag} >
                            Adicionar à Sacola <BsFillBagFill />
                        </button>

                        <button className="add-favorite-btn" onClick={favoriteItem}>
                            Adicionar aos favoritos <CiHeart />
                        </button>
                    </div>
                </div>
            </div>
    </section>
    )
  )
}

export default ProductPage