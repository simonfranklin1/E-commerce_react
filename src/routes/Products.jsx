import { useEffect, useState, useContext } from "react"
import ProductCard from "../components/ProductCard";
import { StoreContext } from "../context/StoreContext";
import Loading from "../components/Loading";
import { fetchUrl } from "../utilities/utilities";


const Products = () => {
  const { loading, setLoading, url } = useContext(StoreContext);
  const [ products, setProducts ] = useState();

  useEffect(() => {
    setLoading(true);

    fetchUrl(url).then((response) => {
      setProducts(response);
      setLoading(false);
    })

  }, []);

  return (
    (loading && <Loading />) || (
        <section className='container'>
          <p className="container_title">Todos os Produtos</p>
          <div className="products-container">
            {products && products.map((product) => (
              <ProductCard key={product.id} data={{title: product.nome, thumbnail: product.imagem, brand: product.marca, women: product.feminino, id: product.id, price: product.preco}}></ProductCard>
            ))}
          </div>
        </section>
    )
  )
}

export default Products