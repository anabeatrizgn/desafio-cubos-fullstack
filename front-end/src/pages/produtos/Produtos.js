import NavBar from "../../componentes/NavBar/NavBar";
import Card from "../../componentes/Card/Card";
import { useEffect } from "react";
import { UseAuth } from "../../contexto/AuthContext";
import { UseProducts } from "../../contexto/ProductsContext";
import { Button, Backdrop, CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router";
import { useStylesTwo } from "./makeStyle";
import "./Produtos.css";

export default function Produtos() {
  const { produtos, carregando, handleProdutos } = UseProducts();
  const { gravarUsuario } = UseAuth();
  const history = useHistory();
  const classes = useStylesTwo();

  useEffect(() => {
    handleProdutos();
  }, []);

  return (
    <div className="bodyprodutos">
      <NavBar />
      <div className="main-produtos">
        <h1>{gravarUsuario.usuario.nome_loja}</h1>
        <h2>Seus Produtos</h2>
        <div className="card-produto">
          {Array.isArray(produtos)
            ? produtos.map((produto) => (
                <Card
                  nome={produto.nome}
                  categoria={produto.categoria}
                  descricao={produto.descricao}
                  estoque={produto.estoque}
                  preco={produto.preco}
                  imagem={produto.imagem}
                  id={produto.id}
                />
              ))
            : produtos}
        </div>
        <Button
          style={{
            backgroundColor: "#007DFF",
            color: "#FFFFFF",
            marginTop: "2em",
            width: "15em",
            marginBottom: "0.5em",
          }}
          variant="contained"
          onClick={() => {
            history.push("./produtos/novo");
          }}
        >
          Adicionar Produto
        </Button>
      </div>
      <Backdrop className={classes.backdrop} open={carregando}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
