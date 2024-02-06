import React, { useContext, useState } from 'react';
import "./Sign.css";
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { getLocalStorage, saveLocalStorage } from '../utilities/utilities';

const SignUp = () => {
  const { loading, setLoading, setUser } = useContext(StoreContext);

  const navigate = useNavigate();
  
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const signUp = () => {
    const users = getLocalStorage("users_db");

    const hasUser = users?.filter((user) => user.email === email);

    if (hasUser?.length) {
        window.alert("Já tem uma conta com esse E-mail");
    }

    const newUser = {
        name: name,
        email: email,
        password: password,
        orders: [],
        favorites: [],
    }

    if (users) {
        saveLocalStorage("users_db", [...users, newUser]);
    } else {
        saveLocalStorage("users_db", [newUser])
    }

    const token = Math.random().toString(36).substring(2);

    setUser(newUser);
    saveLocalStorage("user_token", { email, token });
}


  const handleSignUp = ( e ) => {
    e.preventDefault();

    if(!name || !email || !password) {
      window.alert("Preencha todos os campos!")
    }

    setLoading(true);
    signUp(name, email, password);
    setLoading(false);

    navigate("/");
  }

  return (
    <div className="container">
      <div className="form-wrapper">
        <div className="form-container">
          <h3 className="form-container_title">Crie sua conta</h3>
          <form onSubmit={handleSignUp}>
            <div className="form-fields">
              <label>
                <span>Nome</span>
                <input type="text" placeholder='Digite seu Nome' onChange={(e) => setName(e.target.value)} value={name} required />
              </label>
              <label>
                <span>E-mail</span>
                <input type="email" placeholder='Digite seu Email' onChange={(e) => setEmail(e.target.value)} value={email}  required />
              </label>
              <label>
                <span>Senha</span>
                <input type="password" placeholder='Digite sua Senha' onChange={(e) => setPassword(e.target.value)} value={password}  required />
              </label>
            </div>
            <button type="submit">
              {loading ?'Criando usuário...' : 'Inscrever-se'}
            </button>
          </form>
          <p className="form-container_link">Já tem uma conta? <Link to={"/sign-in"}>Entrar</Link></p>
        </div>
      </div>
    </div>
  )
}

export default SignUp