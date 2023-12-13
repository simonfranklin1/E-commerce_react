import Logo from "../assets/img/logo-f-store-2.png";
import "./Header.css";
import BagButton from './BagButton';
import UserButton from './UserButton';
import SearchBar from './SearchBar';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { StoreContext } from "../context/StoreContext";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";

const Header = () => {
    const { checkout, setCheckout } = useContext(StoreContext);
    const navigate = useNavigate();
    const [ toggleMenu, setToggleMenu ] = useState(false)

    const returnToProductsPage = () => {
        if(checkout) {
            setCheckout(false);
        }

        navigate("/");
    }

  return (
    <header className={checkout ? "absolute" : ""} id="header">
        <div className="menu_mobile-background" style={ toggleMenu ? { display: 'block'} : {display: 'none'}} />
        <div className="menu_mobile-container" style={ toggleMenu ? { left: '0'} : {left: '-100%'}} >
                <div className="close_menu-mobile" onClick={() => setToggleMenu(false)}>
                    <MdClose />
                </div>
                <div className="menu_mobile-container_links">
                    <Link to={"/"} onClick={() => setToggleMenu(false)}>
                        <p className='mobile_link'>Início</p>
                    </Link>
                    <Link to={"/produtos"} onClick={() => setToggleMenu(false)}>
                        <p className='mobile_link'>Produtos</p>
                    </Link>
                    <Link to={"/masculino"} onClick={() => setToggleMenu(false)}>
                        <p className='mobile_link'>Masculino</p>
                    </Link>
                    <Link to={"/feminino"} onClick={() => setToggleMenu(false)}>
                        <p className='mobile_link'>Feminino</p>
                    </Link>
                </div>
            </div>
        <div className="header">
            <div className="menu-logo">
                <button className="menu" onClick={() => setToggleMenu(true)}>
                    <FiMenu />
                </button>
                <div className="logo">
                    <img src={Logo} alt="Logo Franklin Store" onClick={returnToProductsPage} />
                </div>
            </div>
            <div className="search">
                <SearchBar/>
            </div>
            <div className={`icons ${ checkout ? 'hidden' : ''}`}>
                <BagButton />
                <Link to={"/historico"}>
                    <UserButton />
                </Link>
            </div>
        </div>
        <div className="mobile-search">
            <SearchBar/>
        </div>
        <div className={`navbar ${ checkout ? 'hidden' : ''}`}>
        <Link to={"/"}>
                <p className='link'>Início</p>
            </Link>
            <Link to={"/produtos"}>
                <p className='link'>Produtos</p>
            </Link>
            <Link to={"/masculino"}>
                <p className='link'>Masculino</p>
            </Link>
            <Link to={"/feminino"}>
                <p className='link'>Feminino</p>
            </Link>
        </div>
    </header>
  )
}

export default Header