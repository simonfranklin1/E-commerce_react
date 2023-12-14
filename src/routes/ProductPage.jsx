import { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import Loading from '../components/Loading'
import { useParams } from 'react-router-dom'
import { BsFillBagFill } from "react-icons/bs"
import "./ProductPage.css"
import { fetchUrl, formatCurrency, saveLocalStorage } from '../utilities/utilities'
import Images from '../components/ProductPageSlider'

const ProductPage = () => {

    const { id } = useParams();
    const { url, loading, setLoading, bagItens, setBagItens } = useContext(StoreContext);

    const [ product, setProduct ] = useState({});

    useEffect(() => {
        setLoading(true);
        fetchUrl(url + `/${id}`).then((response) => {
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
        title: product.nome,
        price: product.preco,
        quantity: 1,
        thumbnail: product.imagem,
        brand: product.marca,
        size: size
    }

    const handleSize = (e) => {
        const element = e.target;

        setSize(element.innerText);
        document.querySelectorAll(".select-size").forEach((btn) => btn.classList.remove('select-size'));

        element.classList.add('select-size')
    }

    const handleItem = () => {
        if(!size) {
            document.querySelector(".size-message").style.display = "inline-block"
            return;
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

  return (
    (loading.imagem && <Loading />) || (!product.imagem && <Loading />) || (
        <section className="container-product-page">
            <div className="product-page">
                    <Images arr={product.imagem} id={product.id} />
                <div className="info-buy">
                    <p className="page-title">
                        {product.nome}
                    </p>
                    <div className="brand">
                        {product.marca}
                    </div>
                    <div className="price-info">
                        Preço: <div className="price">
                                    <div className="past-price"> de {formatCurrency(product.preco * 1.5, 'BRL')}</div>
                                    <div className="actual-price"> {formatCurrency(product.preco,'BRL')}</div>
                                </div>
                    </div>
                    
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

                    <div className="add-to-cart">
                        <button className="add-cart-btn" onClick={handleItem} >
                            Adicionar à Sacola <BsFillBagFill />
                        </button>
                    </div>
                </div>
            </div>
    </section>
    )
  )
}

export default ProductPage