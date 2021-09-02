import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

import { HTTP_STATUS } from "../../config/apiConfig";
import { singUpAsync } from "./userSlice";
import { useStyles } from "./style";

export default function SingUp(props) {
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
      dispatch(singUpAsync(data, e));
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
              id="name"
              label="Nombre"
              name="name"
              autoComplete="name"
              {...register("name", { required: true })}
              autoFocus
            />
            {errors.email && (
              <Alert severity="error">El nombre es requerido</Alert>
            )}
            {auth?.errors?.Name !== undefined &&
              auth.status === HTTP_STATUS.REJECTED && (
                <Alert severity="error">{auth.errors.Name[0]}</Alert>
              )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              label="Correo Electronico"
              name="email"
              autoComplete="email"
              {...register("email", { required: true })}
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

            {auth.errors &&
              auth.errors.Password !== undefined &&
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
                Crear cuenta
              </Button>
            )}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="login">¿Tienes una cuenta? Iniciar sesión!</Link>
              </Grid>
            </Grid>
          </form>
          {auth.status === HTTP_STATUS.FULFILLED && (
            <Alert severity="success">Cuenta creada, Iniciar sesión!</Alert>
          )}
        </div>
      </Grid>
    </Grid>
  );
}
