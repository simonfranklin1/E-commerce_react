import BagItem from "./BagItem"

const HistoricCard = ({ data }) => {
    const { orderDate, order } = data; 

  return (
    <div className="historic-card">
        <div className="date-order" style={{ fontWeight: "700", marginBottom: "1rem", marginLeft: ".5rem" }}>
            <p>{new Date(orderDate).toLocaleDateString("pt-BR", {hour: "2-digit",minute: "2-digit",})}</p>
        </div>
        <div className="orders" style={{ display: "flex", flexDirection: "column", gap: "15px"}}>
          {order && order.map((product) => <BagItem key={`${product.id + product.size}`} data={product} historic={true} />)}
        </div>
    </div>
  )
}

export default HistoricCard