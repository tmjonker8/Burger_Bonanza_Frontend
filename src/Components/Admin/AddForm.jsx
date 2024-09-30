import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button, OutlinedInput } from "@mui/material";
import { FormControl, InputLabel, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import PageHeader from "../General/PageHeader.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import $ from "jquery";

const theme = createTheme({
  palette: {
    primary: {
      main: "#C41E3A",
    },
  },
});

function AddForm(props) {
  const location = useLocation();
  let user;
  if (location.state !== null) {
    user = location.state; // Token that is passed over from signing in.
  } else {
    user = props.user; // Token that is passed when user is already logged in and access the sign in page.
  }

  let isAdmin = checkIsAdmin();

  // initialize values
  const [values, setValues] = React.useState({
    id: 0,
    price: 0,
    desc: "",
    category: "",
    name: "",
    img: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  function handleSubmit(event) {
    event.preventDefault();

    postMenuItem(values);
    setValues({
      ...values,
      id: 0,
      category: "",
      name: "",
      price: 0.0,
      desc: "",
      img: "",
    });
  }

  function postMenuItem(values) {
    const menuItem = {
      id: values.id,
      category: values.category,
      name: values.name,
      description: values.desc,
      price: values.price,
      imgPath: values.img,
    };

    $.ajax({
      type: "post",
      headers: { Authorization: user.token },
      url: "http://localhost:8080/api/menu/" + values.id,
      data: JSON.stringify(menuItem),
      contentType: "application/json; charset=utf-8",
      traditional: true,
      success: function (menuItem) {
        alert("Menu Item successfully added...");
      },
    });
  }

  function checkIsAdmin() {
    for (let i = 0; i < user.roles.length; i++) {
      if (user.roles[i].name === "ADMIN") return true;
    }
    return false;
  }

  // if valid token isn't passed over, then page was accessed without a sign-in.  User must sign-in to access this page.
  if (user === null || !isAdmin) {
    return (
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            display: { xs: "flex" },
          }}
        >
          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{
                marginTop: 10,
                marginBottom: 16,
                height: 200,
                width: 650,
                alignItems: "center",
                opacity: 0.9,
              }}
            >
              <PageHeader message="Authorization Required" />
              <p className="unauthorized">Must be authorized!</p>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  } else {
    return (
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            display: { xs: "flex" },
          }}
        >
          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{
                paddingX: 6,
                marginTop: 10,
                marginBottom: 16,
                height: 530,
                width: 600,
                alignItems: "center",
                opacity: 0.9,
              }}
            >
              <PageHeader message="Add" />
              <form onSubmit={handleSubmit}>
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
                  <TextField
                    required
                    inputProps={{
                      title: "Must be a value greater than 0.",
                      pattern:
                        "^(?:[1-9][0-9]{3}|[1-9][0-9]{2}|[1-9][0-9]|[1-9])$", // pattern must match 1-9999.
                    }}
                    error={values.id <= 0 || values.id === undefined}
                    type="text"
                    id="id-field"
                    label="ID"
                    variant="outlined"
                    value={values.id}
                    onChange={handleChange("id")}
                    sx={{ marginX: 1 }}
                  />
                  <TextField
                    required
                    error={values.name === ""}
                    id="name-field"
                    label="Name"
                    type="text"
                    variant="outlined"
                    value={values.name}
                    onChange={handleChange("name")}
                    sx={{ marginX: 1 }}
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
                  <FormControl fullWidth sx={{ maxWidth: 230, m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Price
                    </InputLabel>
                    <OutlinedInput
                      required
                      inputProps={{
                        title: "Must be in ##.## format.",
                        pattern: "^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*.[0-9]{2}$", // must be ##.## format to be accepted.
                      }}
                      error={values.price <= 0 || values.price === undefined}
                      type="text"
                      id="price-field"
                      value={values.price}
                      onChange={handleChange("price")}
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      label="Price"
                    />
                  </FormControl>
                  <Box sx={{ minWidth: 230, marginX: 1 }}>
                    <FormControl fullWidth>
                      <InputLabel id="select-category">Category</InputLabel>
                      <Select
                        required
                        inputProps={{
                          MenuProps: { disableScrollLock: true },
                        }}
                        error={values.category === ""}
                        labelId="select-category"
                        id="select-category"
                        value={values.category}
                        label="Category"
                        onChange={handleChange("category")}
                      >
                        <MenuItem value={"Appetizer"}>Appetizer</MenuItem>
                        <MenuItem value={"Salad"}>Salad</MenuItem>
                        <MenuItem value={"Burger"}>Burger</MenuItem>
                        <MenuItem value={"Dessert"}>Dessert</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <TextField
                    fullWidth
                    required
                    error={values.desc === ""}
                    multiline
                    maxRows={2}
                    id="description-field"
                    label="Description"
                    variant="outlined"
                    type="text"
                    value={values.desc}
                    onChange={handleChange("desc")}
                    sx={{ marginX: 1, marginTop: 3 }}
                  />
                  <TextField
                    fullWidth
                    required
                    error={values.img === ""}
                    id="image-field"
                    label="Image Path"
                    variant="outlined"
                    type="text"
                    value={values.img}
                    onChange={handleChange("img")}
                    sx={{ marginX: 1, marginTop: 3 }}
                  />
                  <ThemeProvider theme={theme}>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        marginTop: 3,
                      }}
                    >
                      Submit
                    </Button>
                  </ThemeProvider>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default AddForm;
