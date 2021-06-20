const conexao = require("../conexao");

const listarProdutos = async (req, res) => {
  const { id } = req.usuario;

  try {
    const query = `select * from produtos where usuario_id = $1 order by id`;
    const produtos = await conexao.query(query, [id]);

    if (produtos.rowCount === 0) {
      return res.status(200).json("Sem produtos Cadastrados");
    }

    return res.status(200).json(produtos.rows);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const obterProduto = async (req, res) => {
  const { usuario } = req;
  const { id } = req.params;
  try {
    const query = `select * from produtos where id = $1 and usuario_id = $2`;
    const produto = await conexao.query(query, [id, usuario.id]);

    if (produto.rowCount === 0) {
      return res.status(200).json("Produto não encontrado ou Id incorreto");
    }

    return res.status(200).json(produto.rows[0]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const cadastrarProduto = async (req, res) => {
  const { usuario } = req;
  const { nome, estoque, categoria, preco, descricao, imagem } = req.body;

  if (!nome) return res.status(400).json("nome obrigatório");
  if (!estoque) return res.status(400).json("estoque obrigatório");
  if (!preco) return res.status(400).json("preço obrigatório");
  if (!descricao) return res.status(400).json("descrição obrigatória");

  try {
    const query = `select * from produtos where usuario_id = $1 and nome = $2`;
    const produtos = await conexao.query(query, [usuario.id, nome]);

    if (produtos.rowCount > 0) {
      return res.status(400).json("Produto já cadastrado");
    }

    const queryInserir = `insert into produtos (nome, estoque, categoria, preco, descricao, imagem, usuario_id) values ($1, $2, $3, $4, $5, $6, $7)`;
    const novoProduto = await conexao.query(queryInserir, [
      nome,
      estoque,
      categoria || null,
      preco,
      descricao,
      imagem || null,
      usuario.id,
    ]);

    if (novoProduto.rowCount === 0) {
      return res.status(400).json("Não foi possível cadastrar produto");
    }

    return res.status(200).json("Produto cadastrado com sucesso");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
};

const atualizarProduto = async (req, res) => {
  const { usuario } = req;
  const { id } = req.params;
  const { nome, estoque, categoria, preco, descricao, imagem } = req.body;

  if (!nome && !estoque && !preco && !descricao && !categoria && !imagem) {
    return res.status(400).json("Insira algum campo para ser alterado");
  }

  try {
    const query = `select * from produtos where id = $1 and usuario_id = $2`;
    const produto = await conexao.query(query, [id, usuario.id]);

    if (produto.rowCount === 0) {
      return res.status(200).json("Produto não encontrado ou Id incorreto");
    }

    const queryAtualizar = `update produtos set nome = coalesce($1, nome), estoque = coalesce($2, estoque), categoria = coalesce($3, categoria), preco = coalesce($4, preco), descricao = coalesce($5, descricao), imagem = coalesce($6, imagem) where id = $7`;
    const produtoAtualizado = await conexao.query(queryAtualizar, [
      nome || null,
      estoque || null,
      categoria,
      preco || null,
      descricao || null,
      imagem || null,
      id,
    ]);

    if (produtoAtualizado.rowCount === 0) {
      return res.status(404).json("Não foi possível atualizar o produto");
    }

    return res.status(200).json("Produto alterado");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const deletarProduto = async (req, res) => {
  const { usuario } = req;
  const { id } = req.params;

  try {
    const query = `select * from produtos where id = $1 and usuario_id = $2`;
    const produto = await conexao.query(query, [id, usuario.id]);

    if (produto.rowCount === 0) {
      return res.status(200).json("Produto não encontrado ou Id incorreto");
    }

    const queryDelete = `delete from produtos where id = $1`;
    const produtoDeletado = await conexao.query(queryDelete, [id]);

    if (produtoDeletado.rowCount === 0) {
      return res.status(404).json("Não foi possível deletar o produto");
    }

    return res.status(200).json("Produto excluído");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  listarProdutos,
  obterProduto,
  cadastrarProduto,
  atualizarProduto,
  deletarProduto,
};
