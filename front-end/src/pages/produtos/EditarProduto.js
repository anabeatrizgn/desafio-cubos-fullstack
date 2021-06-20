import NavBar from "../../componentes/NavBar/NavBar";
import { UseAuth } from "../../contexto/AuthContext";
import { useHistory } from "react-router-dom";
import { UseProducts } from "../../contexto/ProductsContext";
import { Button, Backdrop, CircularProgress } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useStyles } from "./makeStyle";
import { useForm } from "react-hook-form";
import "./EditarProduto.css";

export default function EditarProduto() {
  const { handleEditarProduto, produtos, carregando } = UseProducts();
  const { gravarUsuario } = UseAuth();
  const history = useHistory();
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const idPagina = window.location.pathname.split("/")[2];

  function handleProduto(id) {
    const lista = [...produtos];
    const produtoEditado = lista.find((item) => item.id === Number(id));

    return produtoEditado;
  }

  return (
    <div className="bodyeditarproduto">
      <NavBar />
      <div className="main-editar">
        <h1>{gravarUsuario.usuario.nome_loja}</h1>
        <h2>Editar Produto</h2>

        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit((data) => {
            handleEditarProduto(idPagina, data);
            history.push("/produtos");
          })}
        >
          <div className="inputs-editar" style={{ marginBottom: "4em" }}>
            <TextField
              id="nome"
              label="Nome do produto"
              {...register("nome")}
            />
            <TextField id="preco" label="Preço" {...register("preco")} />
            <TextField id="estoque" label="Estoque" {...register("estoque")} />
            <TextField
              id="descricao"
              label="Descrição"
              {...register("descricao")}
            />
            <TextField
              id="categoria"
              label="Categoria"
              {...register("categoria")}
            />
            <TextField id="imagem" label="Imagem" {...register("imagem")} />
            <div
              className="imagem-produto"
              style={{
                background: `url(${handleProduto(idPagina).imagem}) no-repeat `,
                backgroundPosition: "center center",
                backgroundSize: "cover",
              }}
            ></div>
          </div>
          <div
            className="botoes-novoproduto"
            style={{
              display: "flex",
              flexDirection: "row",
              width: "22.5em",
              gap: "1em",
            }}
          >
            <Button
              style={{
                backgroundColor: "#007DFF",
                color: "#FFFFFF",
                marginTop: "2em",
              }}
              variant="contained"
              onClick={() => {
                history.push("/produtos");
              }}
            >
              Cancelar
            </Button>
            <Button
              style={{
                backgroundColor: "#007DFF",
                color: "#FFFFFF",
                marginTop: "2em",
              }}
              variant="contained"
              type="submit"
            >
              Salvar Alterações
            </Button>
          </div>{" "}
        </form>
      </div>
      <Backdrop className={classes.backdrop} open={carregando}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
