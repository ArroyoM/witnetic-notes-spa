import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import { HTTP_STATUS } from "../../config/apiConfig";
import { singInAsync } from "./userSlice";
import { useStyles } from "./style";

export default function SingIn(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    try {
      e.preventDefault();
      dispatch(singInAsync(data));
    } catch (error) {
      console.log("err");
    }
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      className={classes.r}
    >
      <Grid item className={classes.root}>
        <Alert severity="info">
          Nota: el proyecto no esta terminado como es uno de ejemplo no estoy
          seguro de terminarlo, pero funciona
        </Alert>
        {auth?.errors?.noConnection !== undefined &&
          auth.status === HTTP_STATUS.REJECTED && (
            <Alert severity="error">{auth.errors.noConnection}</Alert>
          )}

        {auth?.errors?.noFund !== undefined &&
          auth.status === HTTP_STATUS.REJECTED && (
            <Alert severity="error">{auth.errors.noFund}</Alert>
          )}

        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Witnetic Notes
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electronico"
              name="email"
              autoComplete="email"
              {...register("email", { required: true })}
              autoFocus
            />
            {errors.email && (
              <Alert severity="error">El correo es requerido</Alert>
            )}
            {auth?.errors?.Email !== undefined &&
              auth.status === HTTP_STATUS.REJECTED && (
                <Alert severity="error">{auth.errors.Email[0]}</Alert>
              )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              {...register("password", { required: true })}
              autoComplete="current-password"
            />
            {errors.password && (
              <Alert severity="error">La Contraseña es requerido</Alert>
            )}

            {auth?.errors?.Password !== undefined &&
              auth.status === HTTP_STATUS.REJECTED && (
                <Alert severity="error">{auth.errors.Password[0]}</Alert>
              )}

            {auth.status === HTTP_STATUS.PENDING ? (
              <Grid container justifyContent="center">
                <CircularProgress />
              </Grid>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Iniciar sesión
              </Button>
            )}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="signup">¿No tienes una cuenta? Crea una cuenta!</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
