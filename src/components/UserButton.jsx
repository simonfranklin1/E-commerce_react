import { useContext, useState } from 'react'
import {FaRegUser} from 'react-icons/fa6'
import "./UserButton.css"
import { StoreContext } from '../context/StoreContext'
import { Link } from 'react-router-dom'

const UserButton = () => {
  const { user, setUser } = useContext(StoreContext);
  const [ openMenu, setOpenMenu ] = useState(false);

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("user_db");
  }

  return (
    <button className='user-btn' onClick={() => setOpenMenu(!openMenu)}>
      <FaRegUser />
      <div className="user-menu" style={ openMenu ? { display: "flex"} : { display: "none" }}>
          { user && (
            <ul className="user-menu_options">
              <li>
                <Link to={"/favorites"}>Favoritos</Link>
              </li>
              <li>
                <Link to={"/historic"}>Histórico</Link>
              </li>
              <li onClick={logOut}>
                Sair
              </li>
            </ul>
          ) || (
            <ul className="user-menu_options">
              <li>
                <Link to={"/sign-up"}>Registrar</Link>
              </li>
              <li>
                <Link to={"/sign-in"}>Entrar</Link>
              </li>
            </ul>
          )
          }
      </div>
    </button>
  )
}

export default UserButton