import { Typography, Paper, Grid, Button } from "@mui/material";
import React, { useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#C41E3A",
    },
  },
});

function DeactivatedMenuItem(props) {
  function handleActivateClick(item) {
    props.activate(item);
  }

  function generateActivateButton() {
    return (
      <Button
        onClick={() => handleActivateClick(props.item)}
        variant="contained"
        sx={{ marginTop: 6, marginLeft: 2 }}
      >
        Activate
      </Button>
    );
  }

  return (
    <Grid item xs={12} lg={4}>
      <Paper
        elevation={3}
        sx={{
          textAlign: "center",
          margin: 2,
          padding: 1,
          height: 401,
        }}
      >
        <img className="menu-item" src={props.item.imgPath} alt="appetizer 1" />
        <Typography variant="h5" gutterBottom component="div">
          {props.item.name}
        </Typography>
        <Typography variant="h6" gutterBottom component="div">
          {props.item.price}
        </Typography>
        <Typography variant="subtitle2" gutterBottom component="div">
          {props.item.description}
        </Typography>
        <ThemeProvider theme={theme}>{generateActivateButton()}</ThemeProvider>
      </Paper>
    </Grid>
  );
}

export default DeactivatedMenuItem;
