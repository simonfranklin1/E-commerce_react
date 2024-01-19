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
    <Link to={`/products/${id}`}>
      <div className={`slider_card ${ women? 'women' : 'male' }`}>
            <div className="slider_card-image">
              <img src={thumbnail[0]} alt={`Image product-` + id} />
            </div>
            <div className="info">
              <p className="slider_card-title">{`${title} | ${brand}`}</p>
              <p className="slider_card-price">{formatCurrency(price, 'BRL')}</p>
            </div>
      </div>
    </Link>
  )
}

export default SliderCard