import "./SliderCard.css"
import { Link } from "react-router-dom";
import { formatCurrency } from "../utilities/utilities";

const SliderCard = ({data}) => {
    const {
        thumbnail,
        title,
        price,
        id,
        brand,
        women
    } = data;

  return (
    <Link to={`/produtos/${id}`}>
      <div className={`slider-card ${ women? 'women' : 'male' }`}>
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

export default SliderCard