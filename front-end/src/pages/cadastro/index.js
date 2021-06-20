import "./style.css";
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
import { useState, useEffect } from "react";
import { useStyles, useStylesTwo } from "./makeStyle";
import clsx from "clsx";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CardCadastro() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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

  useEffect(() => {
    if (
      errors.email?.type === "required" ||
      errors.nome?.type === "required" ||
      errors.nome_loja?.type === "required" ||
      errors.senha?.type === "required" ||
      errors.confirmar_senha?.type === "required"
    ) {
      toast.error("Todos os campos são obrigatórios");
    }
  }, [
    errors.email,
    errors.senha,
    errors.nome,
    errors.nome_loja,
    errors.confirmar_senha,
  ]);

  async function onSubmit(data) {
    setCarregando(true);
    try {
      const body = JSON.stringify(data);
      const response = await fetch("http://localhost:3300/cadastro", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body,
      });

      const cadastro = await response.json();

      if (response.status !== 200) {
        toast.error(cadastro);
      } else {
        toast.success(cadastro, {
          onClose: () => {
            history.push("/");
          },
        });
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="bodycadastro">
      <div className="card-cadastro">
        <h1 className="titulo-cadastro">Cadastro</h1>

        <div className="inputs-cadastro">
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              id="nome"
              label="Seu nome"
              {...register("nome", { required: true })}
            />
            <TextField
              id="nome_loja"
              label="Nome da loja"
              {...register("nome_loja", { required: true })}
            />
            <TextField
              id="email"
              label="E-mail"
              {...register("email", { required: true })}
            />

            <FormControl
              className={clsx(classesTwo.margin, classesTwo.textField)}
            >
              <InputLabel htmlFor="standard-adornment-password">
                Senha
              </InputLabel>
              <Input
                id="senha"
                {...register("senha", { required: true })}
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
                {...register("confirmar_senha", { required: true })}
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

            <Button
              style={{
                backgroundColor: "#007DFF",
                color: "#FFFFFF",
                marginTop: "3em",
              }}
              variant="contained"
              type="submit"
            >
              CRIAR CONTA
            </Button>
          </form>
          <div className="link-login">
            Já possui uma conta? <Link to="/">ACESSE</Link>
          </div>
        </div>
      </div>
      <Backdrop className={classes.backdrop} open={carregando}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
