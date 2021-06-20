import {
  TextField,
  Button,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import NavBar from "../../componentes/NavBar/NavBar";
import { UseAuth } from "../../contexto/AuthContext";
import { useStyles } from "./makeStyle";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "./Perfil.css";
import { useEffect, useState } from "react";

export default function Perfil() {
  const history = useHistory();
  const classes = useStyles();
  const { gravarUsuario, setGravarUsuario } = UseAuth();
  const [carregando, setCarregando] = useState(false);

  async function handlePerfil() {
    setCarregando(true);
    try {
      const response = await fetch("http://localhost:3300/perfil", {
        method: "GET",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + gravarUsuario.token,
        },
      });

      const perfil = await response.json();

      if (response.status !== 200) {
        toast.error(perfil);
      } else {
        toast.success(perfil);
        gravarUsuario.usuario = perfil;
        setGravarUsuario(gravarUsuario);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    handlePerfil();
  }, []);

  return (
    <div className="bodyperfil">
      <NavBar />
      <div className="main-perfil">
        <h1>{gravarUsuario.usuario.nome_loja}</h1>
        <h2>Perfil</h2>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="nome"
            label="Nome"
            value={gravarUsuario.usuario.nome}
          />
          <TextField
            id="nome_loja"
            label="Nome da loja"
            value={gravarUsuario.usuario.nome_loja}
          />
          <TextField
            id="email"
            label="E-mail"
            value={gravarUsuario.usuario.email}
          />
        </form>
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
            history.push("/perfil/editar");
          }}
        >
          Editar Perfil
        </Button>
      </div>
      <Backdrop className={classes.backdrop} open={carregando}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
