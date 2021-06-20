CREATE DATABASE market_cubos;

CREATE TABLE usuarios (
    id serial primary key, 
    nome text not null, 
    nome_loja text not null, 
    email text not null unique, 
    senha text not null
);

CREATE TABLE produtos (
    id serial primary key,
    usuario_id int references usuarios(id),
    nome text not null,
    estoque int not null,
    categoria text,
    preco int not null,
    descricao text not null,
    imagem text
);