import { useEffect } from "react";
import { CiHeart } from "react-icons/ci";

const FavoriteButton = ({user, toggleFavorite, setToggleFavorite, product, favoriteItem}) => {
    useEffect(() => {
        if(user !== null) {
            const alreadyFavorite = user.favorites.find((favorite) => favorite.id === product.id);
            
            if(alreadyFavorite) {
                setToggleFavorite(true)
            }
        }
    })

  return (
    <button className="add-favorite-btn" onClick={favoriteItem}>
        { toggleFavorite ? "Remover dos Favoritos" : "Adicionar aos favoritos"} <CiHeart />
    </button>
  )
}

export default FavoriteButton