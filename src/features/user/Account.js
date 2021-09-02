import React from "react";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { LayoutMenu } from "../../components/LayoutMenu";
import { useStylesAccount } from "./style";

export default function Account(props) {
  const auth = useSelector((state) => state.user.user);
  const classes = useStylesAccount();

  return (
    <LayoutMenu>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {auth.email}
            </Typography>
            <Typography variant="h5" component="h2">
              {auth.name}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </LayoutMenu>
  );
}
