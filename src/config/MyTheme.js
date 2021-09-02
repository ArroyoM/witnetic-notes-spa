import { createTheme } from "@material-ui/core/styles";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#595959",
      main: "#303030", //negro claro
      dark: "#212121",
      contrastText: "#FFF", //blanco
    },
    secondary: {
      light: "#f50057", //rosado oscuro
      main: "#f44336", //rojo
      dark: "#ba000d", //rojo oscuro
      contrastText: "#000", //negro
    },
  },
});
