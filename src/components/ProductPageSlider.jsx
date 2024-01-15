import { useState } from "react"
import "./ProductPageSlider.css"
import { MdArrowForwardIos } from "react-icons/md"
import { MdArrowBackIosNew } from "react-icons/md"

const Images = ({thumbnail, id}) => {

    const [index, setIndex] = useState(0);
    const changeImage = (e, i) => {
      document.querySelector('.selected-image').classList.remove('selected-image');

      const element = e.target;
      element.classList.add('selected-image');

      setIndex(i);
    }

    const increment = () => {
      if(index === thumbnail.length - 1) {
        setIndex(0)
      } else {
        setIndex(index + 1)
      }
    }

    const decrement = () => {
      if(index === 0) {
        setIndex(thumbnail.length - 1)
      } else {
        setIndex(index - 1)
      }
    }
    
  return (
    <div className="images-container">
        <div className="actual-image">
            <img src={thumbnail[index]} alt={"Imagem produto-" + id} />
            <div className="slider">
              <button className="slider-btn" onClick={decrement}> <MdArrowBackIosNew /> </button>
              <button className="slider-btn" onClick={increment}> <MdArrowForwardIos /> </button>
            </div>
        </div>
        <ul className="image-buttons">
            <li className="selected-image" onClick={(e) => changeImage(e, 0)}><img className="image-btn" src={thumbnail[0]} alt={`Imagem produto ${id}/1`}/></li>
            <li onClick={(e) => changeImage(e, 1)}><img className="image-btn" src={thumbnail[1]} alt={`Imagem produto ${id}/2`} /></li>
            <li onClick={(e) => changeImage(e, 2)}><img className="image-btn" src={thumbnail[2]} alt={`Imagem produto ${id}/3`} /></li>
            <li onClick={(e) => changeImage(e, 3)}><img className="image-btn" src={thumbnail[3]} alt={`Imagem produto ${id}/4`} /></li>
        </ul>
    </div>
  )
}

export default Images