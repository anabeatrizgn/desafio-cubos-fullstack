import { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./MakeStyle";
import { ReactComponent as Lixo } from "../../assets/garbage.svg";
import { UseProducts } from "../../contexto/ProductsContext";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import "./Card.css";
import { useHistory } from "react-router-dom";

export default function MediaCard({
  nome,
  categoria,
  estoque,
  descricao,
  imagem,
  preco,
  id,
}) {
  const { handleDeletarProduto } = UseProducts();
  const classes = useStyles();
  const [aberto, setAberto] = useState(false);
  const history = useHistory();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <button
          className="deletar-produto"
          onClick={() => {
            setAberto(true);
          }}
        >
          <Lixo />
        </button>
        <Dialog
          open={aberto}
          onClose={() => {
            setAberto(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Remover produto do catálogo?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Esta ação não poderá ser desfeita.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setAberto(false);
              }}
              color="primary"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => handleDeletarProduto(id)}
              color="primary"
              autoFocus
            >
              Remover
            </Button>
          </DialogActions>
        </Dialog>
        <CardMedia className={classes.media} image={imagem} title={nome} />
        <CardContent onClick={() => history.push(`/produtos/${id}/editar`)}>
          <Typography gutterBottom variant="h5" component="h2">
            {nome}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {descricao === null ? "" : descricao}
            <br />
            Categoria: {categoria}
            <br />
            R${preco / 1000} REAIS
            <br />
            {estoque} UNID
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
