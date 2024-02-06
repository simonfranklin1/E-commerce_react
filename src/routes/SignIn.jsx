import { useContext, useState } from 'react';
import "./Sign.css";
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { getLocalStorage, saveLocalStorage } from '../utilities/utilities';

const SignIn = () => {
  const { loading, setLoading, setUser } = useContext(StoreContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    if (!email, !password) {
      window.alert("Preencha todos os campos!")
    } else {
      const users = getLocalStorage("users_db");

      const hasUser = users?.filter((user) => user.email === email);

      if (hasUser?.length) {
        if (hasUser[0].email === email && hasUser[0].password === password) {
          const token = Math.random().toString(36).substring(2);
          saveLocalStorage("user_token", { email, token });
          setUser(hasUser[0]);
          return true;
        } else {
          window.alert("E-mail ou senha incorretos");
          return false;
        }
      } else {
        window.alert("Usuário não cadastrado");
        return false;
      }
    }
  }

  const handleSignIn = (e) => {
    e.preventDefault();

    setLoading(true);
    const signin = signIn();
    setLoading(false);

    if (!signin) {
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
              <label>
                <span>E-mail</span>
                <input type="email" placeholder='Digite seu Email' value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
              <label>
                <span>Senha</span>
                <input type="password" placeholder='Digite sua Senha' value={password} onChange={(e) => setPassword(e.target.value)} />
              </label>
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