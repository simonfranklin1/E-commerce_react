import './ProductsSection.css'
import Loading from './Loading'
import { useRef } from 'react'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ProductCard from './ProductCard';

const ProductsSection = ({products, title, category}) => {  
    if(!products) return <Loading />

    const sliderRef = useRef();

    const slider = (direction) => {
        const {current} = sliderRef;

        if(direction === "left") {
            current.scrollLeft -= 600;
        } else {
            current.scrollLeft += 600;
        }
    }

  return (
    <div className="products_section-container">
        <div className="products_section-title">
            <div></div>
            <p>{title}</p>
        </div>
        <div className="products_section-slider_container">
            <div className="products_section-slider" ref={sliderRef}>
                {
                    category === 'feminino' && products.map((product) => (
                        product.women ? <ProductCard key={product.id} data={{title: product.name, ...product}} slider={true} /> : ''
                    ))
                }
                {
                    category === 'masculino' && products.map((product) => (
                        product.women ? '' : <ProductCard key={product.id} data={{title: product.name, ...product}} slider={true} />
                    ))
                }
            </div>
            <div className="slider_btns">
                <div className="arrow_left-btn" onClick={() => slider('left')}>
                    <FaArrowLeft />
                </div>
                <div className="arrow_right-btn" onClick={() => slider('right')}>
                    <FaArrowRight />
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductsSection