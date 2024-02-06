import CheckoutItem from "./CheckoutItem";
import "./HistoricCard.css";

const HistoricCard = ({ data }) => {
    const { orderDate, order } = data; 

  return (
    <div className="historic-card">
        <div className="date-order">
            <p>{new Date(orderDate).toLocaleDateString("pt-BR", {hour: "2-digit",minute: "2-digit",})}</p>
        </div>
        <div className="orders">
          {order && order.map((product) => <CheckoutItem key={`${product.id + product.size}`} data={product} />)}
        </div>
    </div>
  )
}

export default HistoricCard