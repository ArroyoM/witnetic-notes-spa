import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundColor: "#fff",
  },
  right: {
    justifyContent: "flex-end",
  },
  noDecoration: {
    textDecoration: "none",
  },
  title: {
    flexGrow: 1,
  },
  logoName: {
    textDecoration: "none",
    color: "#fff",
  },
  rootCard: {
    maxWidth: 345,
  },
}));
