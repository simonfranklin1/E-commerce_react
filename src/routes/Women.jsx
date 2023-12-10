import { useState, useEffect, useContext } from "react"
import { StoreContext } from "../context/StoreContext"
import ProductCard from "../components/ProductCard";
import { fetchUrl } from "../utilities/utilities";
import Loading from "../components/Loading";

const Women = () => {
  const { url, loading, setLoading } = useContext(StoreContext);
  const [ products, setProducts ] = useState();

    useEffect(() => {
        setLoading(true);
        fetchUrl(url).then((response) => {
            setProducts(response);
            setLoading(false);
        })
    }, []);

    return (
        (loading && <Loading/>) || (
            <section className="container">
                <p className="container_title">Produtos Femininos</p>
                <div className="products-container">
                    {products && products.map((product) => (
                        product.feminino ? <ProductCard key={product.id} data={{title: product.nome, thumbnail: product.imagem, brand: product.marca, women: product.feminino, id: product.id, price: product.preco}} /> : ''
                    ))}
                </div>
            </section>
        )
    )
}

export default Women