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
import { useState } from "react";
import { useStyles, useStylesTwo } from "./MakeStyle";
import clsx from "clsx";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { UseAuth } from "../../contexto/AuthContext";

export default function CardLogin() {
  const auth = UseAuth();
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

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (
      errors.email?.type === "required" ||
      errors.senha?.type === "required"
    ) {
      toast.error("Digite email e senha");
    }
  }, [errors.email, errors.senha]);

  async function onSubmit(data) {
    setCarregando(true);
    const body = JSON.stringify(data);

    try {
      const response = await fetch("http://localhost:3300/login", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body,
      });

      const login = await response.json();

      if (response.status !== 200) {
        toast.error(login);
      } else {
        auth.setUsuario(login);
        history.push("/produtos");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="bodylogin">
      <div className="card-login">
        <h1 className="titulo-login">Login</h1>

        <div className="inputs-login">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={classes.root}
            noValidate
            autoComplete="off"
          >
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
                value={values.password}
                onChange={handleChange("password")}
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
                marginTop: "2em",
              }}
              variant="contained"
              type="submit"
            >
              Enviar
            </Button>
          </form>

          <div className="link-cadastro">
            Primeira vez aqui? <Link to="/cadastro">CRIE UMA CONTA</Link>
          </div>
        </div>
      </div>
      <Backdrop className={classes.backdrop} open={carregando}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
