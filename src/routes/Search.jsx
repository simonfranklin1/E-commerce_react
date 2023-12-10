import { useSearchParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../context/StoreContext';
import { fetchUrl } from '../utilities/utilities';
import ProductCard from '../components/ProductCard';
import "./Search.css"

const Search = () => {
  const [searchParams] = useSearchParams();
  const url = "https://heliotrope-exultant-hisser.glitch.me/catalogo?" + searchParams;

  const { loading, setLoading, query } = useContext(StoreContext);
  const [ products, setProducts ] = useState();


  useEffect(() => {
    setLoading(true);

    fetchUrl(url).then((response) => {
      setProducts(response);
      setLoading(false);
    })

  }, [url]);

  return (
    (loading && <Loading />) || (
        <section className='container'>
          <p className="container_title">Resultados para: <span>{query}</span></p>
          {products.length > 0 ? (
            <div className="search-container">
              {products.map((product) => <ProductCard key={product.id} data={{title: product.nome, thumbnail: product.imagem, brand: product.marca, women: product.feminino, id: product.id, price: product.preco}}/>)}
            </div>
          ) : (
            <p className="not-found" style={{textAlign: 'center', marginTop: '3.5rem'}}>Produto não encontrado</p>
          )}
        </section>
    )
  )
}

export default Search