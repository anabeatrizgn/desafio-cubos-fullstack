const conexao = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../jwt-secret");

const cadastrarUsuario = async (req, res) => {
  const { nome, nome_loja, email, senha, confirmar_senha } = req.body;

  if (!nome) return res.status(400).json("nome obrigatório");
  if (!nome_loja) return res.status(400).json("nome da loja obrigatório");
  if (!email) return res.status(400).json("email obrigatório");
  if (!senha) return res.status(400).json("senha obrigatória");

  if (senha !== confirmar_senha) {
    return res.status(400).json("As senhas precisam ser iguais");
  }

  try {
    const queryConsulta = `select * from usuarios where email = $1`;
    const usuario = await conexao.query(queryConsulta, [email]);

    if (usuario.rowCount > 0) {
      return res.status(400).json("Email ja cadastrado");
    }

    const hash = await bcrypt.hash(senha, 10);
    const query = `insert into usuarios (nome, nome_loja, email, senha) values ($1, $2, $3, $4)`;
    const novoUsuario = await conexao.query(query, [
      nome,
      nome_loja,
      email,
      hash,
    ]);

    if (novoUsuario.rowCount === 0) {
      return res.status(400).json("Não foi possível cadastrar usuario");
    }

    return res.status(200).json("Usuario cadastrado com sucesso");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email) return res.status(400).json("email obrigatório");
  if (!senha) return res.status(400).json("senha obrigatória");

  try {
    const query = `select * from usuarios where email = $1`;
    const usuarios = await conexao.query(query, [email]);

    if (usuarios.rowCount === 0) {
      return res.status(400).json("Email ou senha inválidos");
    }

    const usuario = usuarios.rows[0];

    const verificarSenha = await bcrypt.compare(senha, usuario.senha);

    if (!verificarSenha) {
      return res.status(400).json("Email ou senha inválidos");
    }

    const token = jwt.sign(
      {
        id: usuario.id,
      },
      jwtSecret
    );

    const { senha: senhaUsuario, ...dados } = usuario;

    return res.status(200).json({
      usuario: dados,
      token,
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  cadastrarUsuario,
  login,
};
