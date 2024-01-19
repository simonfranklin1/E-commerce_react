import { useSearchParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../context/StoreContext';
import { fetchUrl } from '../utilities/utilities';
import ProductCard from '../components/ProductCard';

const Search = () => {
  const [searchParams] = useSearchParams();

  const { loading, setLoading, query, url } = useContext(StoreContext);
  const [ products, setProducts ] = useState();


  useEffect(() => {
    setLoading(true);

    fetchUrl(url + `/products?${searchParams}`).then((response) => {
      setProducts(response);
      setLoading(false);
    })

  }, [query]);

  return (
    (loading && <Loading />) || (
        <section className='container' style={{ position: "relative" }}>
          <p className="container_title">Resultados para: <span>{query}</span></p>
          {products.length > 0 ? (
            <div className="products-container">
              {products.map((product) => <ProductCard key={product.id} data={{title: product.name, ...product}}/>)}
            </div>
          ) : (
            <p className="not-found" style={{ position: "absolute", top: "50%", textAlign: "center", width: "100%"}}>Produto não encontrado.</p>
          )}
        </section>
    )
  )
}

export default Search