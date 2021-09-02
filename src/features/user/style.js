import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "90%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#1c54b2",
    "&:hover": {
      backgroundColor: "#5393ff",
    },
  },
  root: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    paddingTop: 5,
    minWidth: 350,
    width: 450,
    marginBottom: 25,
  },
  r: {
    height: "100vh !important",
  },
}));

export const useStylesAccount = makeStyles({
  root: {
    minWidth: 275,
  },
});
