import NavBar from "../../componentes/NavBar/NavBar";
import { UseAuth } from "../../contexto/AuthContext";
import { useHistory } from "react-router-dom";
import { useStyles, useStylesTwo } from "./makeStyle";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  TextField,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  IconButton,
  Button,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import clsx from "clsx";
import { toast } from "react-toastify";
import "./EditarPerfil.css";

export default function EditarPerfil() {
  const { gravarUsuario } = UseAuth();
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const classes = useStyles();
  const classesTwo = useStylesTwo();
  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const [carregando, setCarregando] = useState(false);

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function onSubmit(data) {
    setCarregando(true);
    const body = JSON.stringify(data);

    try {
      const response = await fetch("http://localhost:3300/perfil", {
        method: "PUT",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + gravarUsuario.token,
        },
        body,
      });

      const perfilEditado = await response.json();

      if (response.status !== 200) {
        toast.error(perfilEditado);
      } else {
        toast.success(perfilEditado);
        history.push("/perfil");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="bodyeditarperfil">
      <NavBar />
      <div className="main-editarperfil">
        <h1>{gravarUsuario.usuario.nome_loja}</h1>
        <h2>Editar Perfil</h2>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField id="nome" label="Seu nome" {...register("nome")} />
          <TextField
            id="nome_loja"
            label="Nome da loja"
            {...register("nome_loja")}
          />
          <TextField id="email" label="E-mail" {...register("email")} />
          <FormControl
            className={clsx(classesTwo.margin, classesTwo.textField)}
          >
            <InputLabel htmlFor="standard-adornment-password">Senha</InputLabel>
            <Input
              id="senha"
              {...register("senha")}
              type={values.showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl
            className={clsx(classesTwo.margin, classesTwo.textField)}
          >
            <InputLabel htmlFor="standard-adornment-password">
              Repetir senha
            </InputLabel>
            <Input
              id="confirmar_senha"
              {...register("confirmar_senha")}
              type={values.showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div
            className="botoes-editarperfil"
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
                history.push("/perfil");
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
              Editar Perfil
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
