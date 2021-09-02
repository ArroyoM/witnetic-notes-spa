import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Delete from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";

import { useStyles } from "./style";

function ItemBook(props) {
  const classes = useStyles();
  return (
    <Card className={classes.rootCard} variant="outlined">
      <CardHeader
        action={
          <IconButton
            aria-label="settings"
            onClick={() => props.onClick(props.idBook)}
          >
            <Delete />
          </IconButton>
        }
        title={props.name}
      />
      <CardContent>
        <Typography variant="body2" component="p">
          {props.description} {props.idBook}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Ver</Button>
        <Button size="small">Editar</Button>
      </CardActions>
    </Card>
  );
}

export default function ListBook(props) {
  const books = props.books.data;

  const listBook = books.map((b) => {
    return (
      <Grid item xs={4} key={b.idBook.toString()}>
        <ItemBook
          name={b.name}
          description={b.description}
          color={b.color}
          idBook={b.idBook}
          onClick={props.onClick}
        />
      </Grid>
    );
  });

  return <>{listBook}</>;
}
