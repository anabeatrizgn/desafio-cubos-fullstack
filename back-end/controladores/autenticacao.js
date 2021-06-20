const conexao = require("../conexao");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../jwt-secret");

const middleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(404).json("Token não informado");
  }

  try {
    const token = authorization.replace("Bearer", "").trim();

    const { id } = jwt.verify(token, jwtSecret);

    const query = `select * from usuarios where id = $1`;
    const { rows, rowCount } = await conexao.query(query, [id]);

    if (rowCount === 0) {
      res.status(404).json("O usuario não foi encontrado");
    }

    const { senha, ...usuario } = rows[0];

    req.usuario = usuario;

    next();
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = middleware;
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIzNzYyNzM4fQ.unQrrpbCtuYto_U-4gVWFvqUKJxFmdF5atg5mOOt9TI
