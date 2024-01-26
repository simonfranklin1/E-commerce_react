import { useContext, useState } from 'react'
import "./Sign.css"
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'

const SignIn = () => {
  const { loading, setLoading, signIn } = useContext(StoreContext);

  const navigate = useNavigate();
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");


  const handleSignIn = (e) => {
    e.preventDefault();

    setLoading(true);
    const signin = signIn(email, password);
    setLoading(false);

    if(!signin) {
      return;
    } else {
      navigate("/");
    }
  }

  return (
    <div className="container">
      <div className="form-wrapper">
        <div className="form-container">
          <h3 className="form-container_title">Entrar na sua Conta</h3>
          <form onSubmit={handleSignIn}>
            <div className="form-fields">
              <input type="email" placeholder='Digite seu Email' value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder='Digite sua Senha' value={password} onChange={(e) => setPassword(e.target.value)}  />
            </div>
            <button type="submit">
              {loading ? 'Entrando na conta...' : 'Entrar'}              
            </button>
          </form>
          <p className="form-container_link">Não tem uma conta? <Link to={"/sign-up"}>Cadastre-se</Link></p>
        </div>
      </div>
    </div>
  )
}

export default SignIn