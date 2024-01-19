import React, { useContext, useState } from 'react'
import "./Sign.css"
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'

const SignUp = () => {
  const { loading, setLoading, signUp } = useContext(StoreContext);

  const navigate = useNavigate();
  
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");


  const handleSignUp = ( e ) => {
    e.preventDefault();

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
              <input type="text" placeholder='Digite seu Nome' onChange={(e) => setName(e.target.value)} value={name} required />
              <input type="email" placeholder='Digite seu Email' onChange={(e) => setEmail(e.target.value)} value={email}  required />
              <input type="password" placeholder='Digite sua Senha' onChange={(e) => setPassword(e.target.value)} value={password}  required />
            </div>
            <button type="submit">
              {loading && 'Criando usuário...'}
              Inscrever-se
            </button>
          </form>
          <p className="form-container_link">Já tem uma conta? <Link to={"/sign-in"}>Entrar</Link></p>
        </div>
      </div>
    </div>
  )
}

export default SignUp