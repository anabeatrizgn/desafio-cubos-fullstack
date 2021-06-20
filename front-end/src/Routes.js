import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import CardLogin from "./pages/login";
import CardCadastro from "./pages/cadastro";
import Produtos from "./pages/produtos/Produtos";
import Perfil from "./pages/perfil/Perfil";
import { AuthProvider } from "./contexto/AuthContext";
import { UseAuth } from "./contexto/AuthContext";
import { ProductsProvider } from "./contexto/ProductsContext";
import NovoProduto from "./pages/produtos/NovoProduto";
import EditarProduto from "./pages/produtos/EditarProduto";
import EditarPerfil from "./pages/perfil/EditarPerfil";

function AuthPath(props) {
  const { gravarUsuario } = UseAuth();

  return (
    <Route
      render={() =>
        gravarUsuario.token ? props.children : <Redirect to="/" />
      }
    />
  );
}

function Routes() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={CardLogin} />
            <Route exact path="/cadastro" component={CardCadastro} />
            <AuthPath>
              <Route exact path="/produtos" component={Produtos} />
              <Route
                exact
                path="/produtos/:id/editar"
                component={EditarProduto}
              />
              <Route exact path="/produtos/novo" component={NovoProduto} />
              <Route exact path="/perfil" component={Perfil} />
              <Route exact path="/perfil/editar" component={EditarPerfil} />
            </AuthPath>
          </Switch>
        </Router>
      </ProductsProvider>
    </AuthProvider>
  );
}

export default Routes;
