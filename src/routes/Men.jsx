import { useState, useEffect, useContext } from "react"
import { StoreContext } from "../context/StoreContext"
import ProductCard from "../components/ProductCard";
import { fetchUrl } from "../utilities/utilities";
import Loading from "../components/Loading";

const Men = () => {
    const { url, loading, setLoading } = useContext(StoreContext);
    const [ products, setProducts ] = useState();
  
      useEffect(() => {
          setLoading(true);
          fetchUrl(url + '/products').then((response) => {
              setProducts(response);
              setLoading(false);
          })
      }, []);
  
      return (
          (loading && <Loading/>) || (
              <section className="container">
                    <p className="container_title">Produtos Masculinos</p>
                  <div className="products-container">
                      {products && products.map((product) => (
                          !product.women && <ProductCard key={product.id} data={{title: product.name, ...product}} />
                      ))}
                  </div>
              </section>
          )
      )
}

export default Men