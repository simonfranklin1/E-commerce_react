import { useContext } from "react"
import ProductCard from "../components/ProductCard";
import { StoreContext } from "../context/StoreContext";
import Loading from "../components/Loading";

const Favorites = () => {
    const { user } = useContext(StoreContext);
    

    return (
      (!user && <Loading />) || (
          <section className='container'>
            <p className="container_title">Favoritos</p>
            <div className="products-container">
              {user && user.favorites.map((product) => (
                <ProductCard key={product.id} data={{title: product.name, ...product}}></ProductCard>
              ))}
            </div>
          </section>
      )
    )
}

export default Favorites