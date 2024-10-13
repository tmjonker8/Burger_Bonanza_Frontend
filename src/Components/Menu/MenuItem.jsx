import { Typography, Paper, Grid, Button } from "@mui/material";
import React, { useEffect } from "react";
import DialogBox from "../General/DialogBox.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#C41E3A",
    },
  },
});

function MenuItem(props) {
  let user;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleClick(item) {
    props.add(item);
    handleClickOpen();
  }

  function handleDeactivateClick(item) {
    props.deactivate(item);
  }

  function getUser() {
    user = JSON.parse(localStorage.getItem("user"));
  }

  function generateAdminButton() {
    getUser();

    let isAdmin = false;

    if (user !== null) {
      for (let x = 0; x < user.roles.length; x++) {
        if (user.roles[x].name === "ADMIN") {
          isAdmin = true;
        }
      }
    }
    if (isAdmin) {
      return (
        <Button
          onClick={() => handleDeactivateClick(props.item)}
          variant="contained"
          sx={{ marginTop: 6, marginLeft: 2 }}
        >
          Deactivate
        </Button>
      );
    }
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
        <ThemeProvider theme={theme}>
          <Button
            onClick={() => handleClick(props.item)}
            variant="contained"
            sx={{ marginTop: 6 }}
          >
            Add To Cart
          </Button>
          {generateAdminButton()}
        </ThemeProvider>
        <DialogBox
          open={open}
          title="Cart"
          text={props.item.name + " has been added to your cart."}
          close={handleClose}
        />
      </Paper>
    </Grid>
  );
}

export default MenuItem;
