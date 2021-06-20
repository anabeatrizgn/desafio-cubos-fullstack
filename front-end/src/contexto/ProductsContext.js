import { useState, useContext, createContext } from "react";
import { toast } from "react-toastify";
import { UseAuth } from "./AuthContext";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { useEffect } from "react";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const { gravarUsuario } = UseAuth();
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const history = useHistory();

  async function handleProdutos() {
    setCarregando(true);
    try {
      const response = await fetch("http://localhost:3300/produtos", {
        method: "GET",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + gravarUsuario.token,
        },
      });
      const lojaPessoal = await response.json();

      if (response.status !== 200) {
        toast.error(lojaPessoal);
      } else {
        setProdutos(lojaPessoal);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setCarregando(false);
    }
  }

  async function handleCadastrarProduto(data) {
    setCarregando(true);
    const body = JSON.stringify(data);
    try {
      const response = await fetch(`http://localhost:3300/produtos`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + gravarUsuario.token,
        },
        body,
      });

      const novoProduto = await response.json();

      if (response.status !== 200) {
        toast.error(novoProduto);
      } else {
        toast.success(novoProduto);
        history.push("/produtos");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setCarregando(false);
    }
  }

  async function handleEditarProduto(id, data) {
    setCarregando(true);
    const body = JSON.stringify(data);
    try {
      const response = await fetch(`http://localhost:3300/produtos/${id}`, {
        method: "PUT",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + gravarUsuario.token,
        },
        body,
      });

      const produtoEditado = await response.json();

      if (response.status !== 200) {
        toast.error(produtoEditado);
      } else {
        toast.success(produtoEditado);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setCarregando(false);
    }
  }

  async function handleDeletarProduto(id) {
    setCarregando(true);
    try {
      const response = await fetch(`http://localhost:3300/produtos/${id}`, {
        method: "DELETE",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + gravarUsuario.token,
        },
      });

      const deletar = await response.json();

      if (response.status !== 200) {
        toast.error(deletar);
      } else {
        const lista = [...produtos];
        const novaLista = lista.filter((item) => item.id !== id);
        setProdutos(novaLista);
        toast.success(deletar);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <ProductsContext.Provider
      value={{
        produtos,
        setProdutos,
        carregando,
        handleProdutos,
        handleEditarProduto,
        handleCadastrarProduto,
        handleDeletarProduto,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function UseProducts() {
  const {
    produtos,
    setProdutos,
    carregando,
    handleProdutos,
    handleEditarProduto,
    handleCadastrarProduto,
    handleDeletarProduto,
  } = useContext(ProductsContext);

  return {
    produtos,
    setProdutos,
    carregando,
    handleProdutos,
    handleEditarProduto,
    handleCadastrarProduto,
    handleDeletarProduto,
  };
}
