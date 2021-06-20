const express = require("express");
const middleware = require("./controladores/autenticacao");
const { cadastrarUsuario, login } = require("./controladores/usuarios");
const {
  acessarPerfil,
  atualizarPerfil,
} = require("./controladores/usuario-autenticado");
const {
  listarProdutos,
  obterProduto,
  cadastrarProduto,
  atualizarProduto,
  deletarProduto,
} = require("./controladores/produtos");
const rotas = express();

rotas.post("/cadastro", cadastrarUsuario);
rotas.post("/login", login);

rotas.use(middleware);

rotas.get("/perfil", acessarPerfil);
rotas.put("/perfil", atualizarPerfil);

rotas.get("/produtos", listarProdutos);
rotas.get("/produtos/:id", obterProduto);
rotas.post("/produtos", cadastrarProduto);
rotas.put("/produtos/:id", atualizarProduto);
rotas.delete("/produtos/:id", deletarProduto);

module.exports = rotas;
