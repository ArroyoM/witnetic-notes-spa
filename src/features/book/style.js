import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rightBottom: {
    position: "absolute",
    bottom: 0,
    right: 0,
    paddingRight: "15px",
    paddingBottom: "15px",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  rootModel: {
    margin: 0,
    padding: theme.spacing(2),
    minWidth: 350,
    width: 450,
  },
  form: {
    width: "90%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));
