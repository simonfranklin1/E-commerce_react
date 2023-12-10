import React from 'react'
import "./Historic.css"
import { useContext } from "react"
import { StoreContext } from "../context/StoreContext"
import HistoricCard from '../components/HistoricCard'
import Loading from "../components/Loading";


const Historic = () => {
  const {historic} = useContext(StoreContext);

  return (
    <div className="container">
      <div className="historic">
          <h3 className='historic-header'>Seu Histórico de compras</h3>
          <section className="historic-orders">
              {historic && historic.map((order) => (
                <HistoricCard key={`${order.userName} | ${order.orderDate}`} data={order} />
              ))}
          </section>
      </div>
    </div>
  )
}

export default Historic