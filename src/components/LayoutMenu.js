import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import LogOutButton from "../features/user/LogOutButton";
import { useStyles } from "./style";

export function LayoutMenu({ children }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  let open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="relative">
        <Toolbar className={classes.right}>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.logoName} to="books">
              Wintetic
            </Link>
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link className={classes.noDecoration} to="account">
                  Perfil
                </Link>
              </MenuItem>
              <LogOutButton />
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Grid>
        <main>{children}</main>
      </Grid>
    </div>
  );
}
