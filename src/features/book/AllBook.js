import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";

import { LayoutMenu } from "../../components/LayoutMenu";
import ListBook from "../../components/ListBook";
import { HTTP_STATUS } from "../../config/apiConfig";
import { allBooksAsync, createBookAsyns, deleteBookAsyns } from "./bookSlice";
import { useStyles } from "./style";

export default function AllBook(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const books = useSelector((state) => state.book);
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(allBooksAsync());
  }, []);

  const onSubmit = (data, e) => {
    try {
      e.preventDefault();
      dispatch(createBookAsyns(data));
      setOpen(false);
      reset();
    } catch (error) {
      console.log("err");
    }
  };

  const doDelete = (id) => {
    console.log(`libro ${id}`);
    dispatch(deleteBookAsyns(id));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <LayoutMenu>
      {books.errors && books.status === HTTP_STATUS.REJECTED && (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {books.errors.noConnection !== undefined && (
            <p>{books.errors.noConnection}</p>
          )}
          {books.errors.unAuthorized !== undefined && (
            <p>{books.errors.unAuthorized}</p>
          )}
        </Grid>
      )}
      <div className={classes.root}>
        {books.status === HTTP_STATUS.PENDING && (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Grid>
        )}
        {books?.book?.data?.length === 0 &&
          books.status === HTTP_STATUS.FULFILLED && (
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <p>No hay Libros</p>
            </Grid>
          )}
        {books?.book?.data?.length > 0 &&
          books.status === HTTP_STATUS.FULFILLED && (
            <Grid container direction="row" spacing={2}>
              <ListBook books={books.book} onClick={doDelete} />
            </Grid>
          )}
      </div>
      {/* botton float*/}
      <div className={classes.rightBottom}>
        <SpeedDial
          onClick={handleClickOpen}
          open={false}
          ariaLabel="SpeedDial example"
          icon={<SpeedDialIcon />}
        />
      </div>
      {/* Modal */}
      <div>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <MuiDialogTitle
            id="customized-dialog-title"
            disableTypography
            className={classes.rootModel}
          >
            <Typography variant="h6">Crear nuevo Libro</Typography>

            {handleClose ? (
              <IconButton
                aria-label="close"
                className={classes.closeButton}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            ) : null}
          </MuiDialogTitle>
          <MuiDialogContent dividers>
            <form
              className={classes.form}
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Nombre del Libro"
                name="name"
                autoComplete="name"
                {...register("name", { required: true })}
                autoFocus
              />
              {errors.name && (
                <Alert severity="error">El nombre es requerido</Alert>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Descripción"
                name="description"
                multiline
                autoComplete="description"
                {...register("description", { required: true })}
              />

              {errors.description && (
                <Alert severity="error">La descripción es requerido</Alert>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="color"
                label="color"
                name="color"
                type="color"
                {...register("color", { required: true })}
              />

              {errors.color && (
                <Alert severity="error">El color es requerido</Alert>
              )}
            </form>
          </MuiDialogContent>
          <MuiDialogActions>
            <Button onClick={handleSubmit(onSubmit)} color="primary">
              Guardar
            </Button>
          </MuiDialogActions>
        </Dialog>
      </div>
    </LayoutMenu>
  );
}
