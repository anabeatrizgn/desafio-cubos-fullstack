import NavBar from "../../componentes/NavBar/NavBar";
import { UseAuth } from "../../contexto/AuthContext";
import { useHistory } from "react-router-dom";
import { UseProducts } from "../../contexto/ProductsContext";
import { Button, Backdrop, CircularProgress } from "@material-ui/core";
import { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { useStyles } from "./makeStyle";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "./NovoProduto.css";

export default function NovoProduto() {
  const { handleCadastrarProduto, carregando } = UseProducts();
  const { gravarUsuario } = UseAuth();
  const history = useHistory();
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (
      errors.nome?.type === "required" ||
      errors.preco?.type === "required" ||
      errors.estoque?.type === "required" ||
      errors.descricao?.type === "required"
    ) {
      toast.error(
        "Campos: Nome do produto, preço, estoque e descrição são obrigatórios"
      );
    }
  }, [errors.nome, errors.preco, errors.estoque, errors.descricao]);

  return (
    <div className="bodynovoproduto">
      <NavBar />
      <div className="main-adicionar">
        <h1>{gravarUsuario.usuario.nome_loja}</h1>
        <h2>Adicionar Produto</h2>

        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit((data) => {
            handleCadastrarProduto(data);
            history.push("/produtos");
          })}
        >
          <TextField
            id="nome"
            label="Nome do produto"
            {...register("nome", { required: true })}
          />
          <TextField
            id="preco"
            label="Preço"
            {...register("preco", { required: true })}
          />
          <TextField
            id="estoque"
            label="Estoque"
            {...register("estoque", { required: true })}
          />
          <TextField
            id="descricao"
            label="Descrição"
            {...register("descricao", { required: true })}
          />
          <TextField
            id="categoria"
            label="Categoria"
            {...register("categoria")}
          />
          <TextField id="imagem" label="Imagem" {...register("imagem")} />
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
              Adicionar Produto
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
