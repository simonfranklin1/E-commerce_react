import "./ProductCard.css";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utilities/utilities";

const ProductCard = ({data}) => {
    const {
        thumbnail,
        title,
        price,
        id,
        brand,
        women
    } = data;

  return (
    <Link to={`/products/${id}`}>
      <div className={`product-card ${ women? 'women' : 'male' }`}>
            <div className="product-image">
              <img src={thumbnail[0]} alt={`Image product-` + id} />
            </div>
            <div className="info">
              <p className="product-title">{`${title} | ${brand}`}</p>
              <p className="product-price">{formatCurrency(price, 'BRL')}</p>
            </div>
      </div>
    </Link>
  )
}

export default ProductCard