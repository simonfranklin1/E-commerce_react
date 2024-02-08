import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import Loading from '../components/Loading';
import { useParams } from 'react-router-dom';
import "./ProductPage.css";
import { fetchUrl } from '../utilities/utilities';
import Carousel from '../components/ProductPageSlider';
import ProductPageInfo from '../components/ProductPageInfo';

const ProductPage = () => {

    const { id } = useParams();
    const { url, loading, setLoading } = useContext(StoreContext);

    const [product, setProduct] = useState(false);  

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
    }, [id]);

    return (
        (!product.thumbnail && <Loading />) || (loading && <Loading />) || (
            <section className="container-product-page">
                <div className="product-page">
                    <Carousel thumbnail={product.thumbnail} id={product.id} />
                    <ProductPageInfo product={product} />
                </div>
            </section>
        )
    )
}

export default ProductPage