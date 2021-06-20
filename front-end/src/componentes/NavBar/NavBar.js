import "./NavBar.css";
import { ReactComponent as Home } from "../../assets/store.svg";
import { ReactComponent as HomeSelected } from "../../assets/store-selected.svg";
import { ReactComponent as Fechar } from "../../assets/close.svg";
import { ReactComponent as Usuario } from "../../assets/user.svg";
import { ReactComponent as UsuarioSelected } from "../../assets/user-selected.svg";
import { Link, useHistory } from "react-router-dom";
import { UseAuth } from "../../contexto/AuthContext";

export default function NavBar() {
  const { deslogar } = UseAuth();
  const history = useHistory();
  const pagina = window.location.pathname;

  return (
    <div className="navbar">
      <Link to="/produtos" className="home">
        {pagina.includes("/produtos") ? <HomeSelected /> : <Home />}
      </Link>
      <Link to="/perfil" className="perfil">
        {pagina.includes("/perfil") ? <UsuarioSelected /> : <Usuario />}
      </Link>
      <button className="deletar">
        <Fechar onClick={() => deslogar(() => history.push("/"))} />
      </button>
    </div>
  );
}
