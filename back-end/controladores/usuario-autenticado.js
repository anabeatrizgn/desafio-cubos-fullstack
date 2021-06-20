const conexao = require("../conexao");
const bcrypt = require("bcrypt");

const acessarPerfil = async (req, res) => {
  const { id } = req.usuario;

  try {
    const query = `select * from usuarios where id = $1`;
    const perfil = await conexao.query(query, [id]);

    const { senha, ...usuario } = perfil.rows[0];

    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const atualizarPerfil = async (req, res) => {
  const { id } = req.usuario;
  const { nome, nome_loja, email, senha, confirmar_senha } = req.body;

  if (!nome && !nome_loja && !email && !senha)
    return res.status(400).json("insira um campo para ser alterado");

  if (email) {
    const queryConsulta = `select * from usuarios where email = $1`;
    const usuario = await conexao.query(queryConsulta, [email]);

    if (usuario.rowCount > 0) {
      return res.status(400).json("Email ja cadastrado");
    }
  }

  if (senha !== confirmar_senha) {
    return res.status(400).json("As senhas precisam ser iguais");
  }

  try {
    const hash = senha ? await bcrypt.hash(senha, 10) : null;
    const queryAtualizar = `update usuarios set nome = coalesce($1, nome), nome_loja = coalesce($2, nome_loja), email = coalesce($3, email), senha = coalesce($4, senha) where id = $5`;
    const perfilAtualizar = await conexao.query(queryAtualizar, [
      nome || null,
      nome_loja || null,
      email || null,
      hash,
      id,
    ]);

    if (perfilAtualizar.rowCount === 0) {
      return res.status(400).json("Não foi possível atualizar usuario");
    }

    return res.status(200).json("Usuario atualizado com sucesso");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  acessarPerfil,
  atualizarPerfil,
};
