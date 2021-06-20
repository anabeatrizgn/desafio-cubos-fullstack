import { useEffect } from "react";
import { useState, useContext, createContext } from "react";
import { useLocalStorage } from "react-use";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState({});
  const [gravarUsuario, setGravarUsuario, removeGravarUsuario] =
    useLocalStorage("valorToken", "");

  useEffect(() => {
    if (usuario.token) {
      setGravarUsuario(usuario);
    }
  }, [usuario]);

  const deslogar = (callback) => {
    removeGravarUsuario();
    callback();
  };

  return (
    <AuthContext.Provider
      value={{ deslogar, gravarUsuario, usuario, setUsuario, setGravarUsuario }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function UseAuth() {
  const { deslogar, gravarUsuario, usuario, setUsuario, setGravarUsuario } =
    useContext(AuthContext);

  return {
    deslogar,
    gravarUsuario,
    usuario,
    setUsuario,
    setGravarUsuario,
  };
}
