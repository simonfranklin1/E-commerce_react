import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import { useEffect } from 'react'
import HomeImage from '../assets/img/Imagem Home Franklin Store.png'
import Loading from '../components/Loading'
import ProductsSection from '../components/ProductsSection'

const Home = () => {
  const { url, loading, setLoading } = useContext(StoreContext);
  const [ products, setProducts ] = useState(false);

  useEffect(() => {
    setLoading(true);

    const getData = async() => {
      const res = await fetch(url + '/products');
      const data = await res.json();

      return data;
    }

    getData().then((response) => {
      setProducts(response)
      setLoading(false)
    })
  }, [])

  return (
    (loading && <Loading />) || (
        <section className='container'>
          <img src={HomeImage} alt="Home" style={{ width: '100%', objectFit: 'cover', borderRadius: '10px', marginBottom: '25px', objectPosition: 'top'}} />
        <div className="home-container">
          <ProductsSection key={'male'} title={'Masculinos'} products={products} category={'masculino'} />
          <ProductsSection key={'women'} title={'Femininos'} products={products} category={'feminino'} />
        </div>
        </section>
    )
  )
}

export default Home