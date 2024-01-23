import { useEffect, useState, useContext } from "react"
import ProductCard from "../components/ProductCard";
import { StoreContext } from "../context/StoreContext";
import Loading from "../components/Loading";

const Favorites = () => {
    const { loading, user } = useContext(StoreContext);
    const [ products, setProducts ] = useState([]);
    
    useEffect(() => {
      setProducts(user?.favorites);
    }, [user]);

    return (
      (loading && <Loading />) || (
          <section className='container'>
            <p className="container_title">Favoritos</p>
            <div className="products-container">
              {products && products.map((product) => (
                <ProductCard key={product.id} data={{title: product.name, ...product}}></ProductCard>
              ))}
            </div>
          </section>
      )
    )
}

export default Favorites