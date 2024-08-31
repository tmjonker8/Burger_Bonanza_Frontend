import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Paper,
  Grid,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import PageHeader from "../General/PageHeader.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CartItems from "../Cart/CartItems.jsx";
import TextField from "@mui/material/TextField";
import CartService from "../Services/CartService.js";
import DialogBox from "../General/DialogBox.jsx";
import { useNavigate } from "react-router-dom";
import $ from "jquery";

function CheckOut(props) {
  useEffect(() => {
    props.persist();
  }, []);

  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      primary: {
        main: "#C41E3A",
      },
    },
  });

  let total = CartService.calculateTotal(props.data.menuItems);
  let currentCart = CartService.processDuplicates(props.data.menuItems);
  let userAddresses = [];

  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
  });

  let purchase = {};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  function handleChange(prop, event) {
    setValues({ ...values, [prop]: event.target.value });
  }

  // function that processes submit, calls method that sends POST request, and resets values to blank.
  function handleSubmit(event) {
    event.preventDefault();

    purchase = {
      menuItems: props.data.menuItems,
      totalPrice: total,
      username: JSON.parse(localStorage.getItem("user")).username,
      address: values,
    };

    handleClickOpen();
    postPurchase(purchase);

    setValues({
      ...values,
      name: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
    });
  }

  function handleSelectBoxChange(event) {
    let index = event.target.value;
    console.log(userAddresses[index]);

    setValues({
      ...values,
      name: userAddresses[index].name,
      address1: userAddresses[index].address,
      address2: userAddresses[index].address2,
      city: userAddresses[index].city,
      state: userAddresses[index].state,
      zipCode: userAddresses[index].zipCode,
    });
  }

  let user = JSON.parse(localStorage.getItem("user"));

  function postPurchase(purchase) {
    $.ajax({
      type: "post",
      headers: { Authorization: user.token },
      url: "http://localhost:8080/purchase",
      data: JSON.stringify(purchase),
      contentType: "application/json; charset=utf-8",
      traditional: true,

      success: function (data) {
        props.clear();
        props.persist();
        console.log("Successfully posted purchase");
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log("Error posting purchase");
      },
    });
  }

  function getUserAddresses() {
    $.ajax({
      type: "get",
      headers: { Authorization: user.token },
      url: "http://localhost:8080/addresses/" + user.username,
      contentType: "application/json; charset=utf-8",
      async: false,
      traditional: true,

      success: function (data) {
        console.log("Addresses retrieved successfully.");
        console.log(data);
        userAddresses = data;
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log("Error retrieving addresses.");
      },
    });
  }

  getUserAddresses();

  return (
    <Container maxWidth="xl">
      <Paper
        elevation={3}
        sx={{
          marginTop: 2,
          opacity: 0.9,
          marginBottom: 2,
        }}
      >
        <Grid container spacing={0} align="center" direction="column">
          <Grid item xs={12} l={12}>
            <PageHeader message="Cart" />
          </Grid>
          {currentCart.length > 0 ? (
            <CartItems
              data={currentCart}
              old={props.data}
              remove={props.remove}
            />
          ) : (
            <Grid
              container
              direction="row"
              justifyContent="center"
              sx={{ marginBottom: 3 }}
            >
              <Grid item l={3} sx={{ padding: 1 }}>
                <Typography variant="h5" component="div">
                  Your cart is empty.
                </Typography>
              </Grid>
            </Grid>
          )}
          {currentCart.length > 0 ? (
            <div>
              <Grid item xs={12} l={12}>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ marginBottom: 2 }}
                >
                  {"Total: $" + Math.round(total * 100) / 100}
                </Typography>
              </Grid>
            </div>
          ) : null}
        </Grid>
      </Paper>

      <Paper
        elevation={3}
        sx={{
          marginTop: 3,
          marginBottom: 10,
          alignItems: "center",
          opacity: 0.9,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{
              marginTop: 3,
            }}
          >
            <FormControl
              fullWidth
              sx={{ marginX: 1, marginTop: 3, width: 600 }}
            >
              <InputLabel id="select-box-label">Saved Addresses</InputLabel>
              <Select
                labelId="select-box-label"
                id="select-box"
                value=""
                label="Saved Addresses"
                onChange={handleSelectBoxChange}
              >
                {userAddresses.map((address, index) => (
                  <MenuItem key={address.id} value={index}>
                    {address.address}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="name-field"
              label="Name"
              variant="outlined"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={(e) => handleChange("name", e)}
              sx={{ marginX: 1, marginTop: 3, width: 600 }}
              required
            />
            <TextField
              id="address1-field"
              label="Address Line 1"
              variant="outlined"
              type="text"
              autoComplete="address-line1"
              value={values.address1}
              onChange={(e) => handleChange("address1", e)}
              sx={{ marginX: 1, marginTop: 3, width: 600 }}
              required
            />
            <TextField
              id="address2-field"
              label="Address Line 2"
              variant="outlined"
              type="text"
              autoComplete="address-line2"
              value={values.address2}
              onChange={(e) => handleChange("address2", e)}
              sx={{ marginX: 1, marginTop: 3, width: 600 }}
              required
            />
            <TextField
              id="city-field"
              label="City"
              variant="outlined"
              type="text"
              autoComplete="address-level2"
              value={values.city}
              onChange={(e) => handleChange("city", e)}
              sx={{ marginX: 1, marginTop: 3, width: 600 }}
              required
            />
            <TextField
              id="state-field"
              label="State"
              variant="outlined"
              type="text"
              autoComplete="address-level1"
              value={values.state}
              onChange={(e) => handleChange("state", e)}
              sx={{ marginX: 1, marginTop: 3, width: 600 }}
              required
            />
            <TextField
              id="zipCode-field"
              label="Zip Code"
              variant="outlined"
              type="text"
              autoComplete="postal-code"
              value={values.zipCode}
              onChange={(e) => handleChange("zipCode", e)}
              sx={{ marginX: 1, marginTop: 3, width: 600 }}
              required
            />
          </Grid>
          <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{
              marginTop: 3,
            }}
          >
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                type="submit"
                sx={{ marginBottom: 3 }}
              >
                Submit
              </Button>
            </ThemeProvider>
            <DialogBox
              open={open}
              title="Purchase Successful"
              text={"Your purchase has been processed!"}
              close={handleClose}
            />
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default CheckOut;
