import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import PageHeader from "../General/PageHeader.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import AddForm from "../Admin/AddForm.jsx";
import { Link } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#C41E3A",
    },
  },
});

function SignInForm(props) {
  const navigate = useNavigate();

  const [values, setValues] = React.useState({
    username: "",
    password: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // function that processes submit, calls method that sends POST request, and resets values to blank.
  function handleSubmit(event) {
    event.preventDefault();

    signIn(values);

    setValues({
      ...values,
      username: "",
      password: "",
    });
  }

  function signIn(values) {
    const credentials = {
      username: values.username,
      password: values.password,
    };

    // POST request to authenticate login information.  Token is returned by server and stored in localStorage.
    $.ajax({
      type: "post",
      url: "http://localhost:8080/authenticate",
      data: JSON.stringify(credentials),
      contentType: "application/json; charset=utf-8",
      traditional: true,

      success: function (data) {
        let tokenString = JSON.stringify(data);
        let token = JSON.stringify({
          token: "Bearer " + JSON.parse(tokenString).token.token,
          username: credentials.username,
          password: credentials.password,
          roles: JSON.parse(tokenString).user.roles,
        });

        localStorage.setItem("user", token);

        let user = JSON.parse(token);

        if (props.quantity <= 0) {
          props.get(); // Retrieves saved user cart upon sign-in.
        }

        user.username === "admin"
          ? navigate("/add", { state: user })
          : navigate("/menu", { state: user.token });
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("Password Incorrect");
      },
    });
  }

  const user = JSON.parse(localStorage.getItem("user"));

  if (user !== null) {
    return <AddForm token={user.token} />;
  } else {
    return (
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Paper
            elevation={3}
            sx={{
              marginTop: 10,
              marginBottom: 16,
              height: 420,
              width: 400,
              alignItems: "center",
              opacity: 0.9,
            }}
          >
            <PageHeader message="Sign-in" />
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
                  id="username-field"
                  label="Username"
                  variant="outlined"
                  type="text"
                  autoComplete="username"
                  value={values.username}
                  onChange={handleChange("username")}
                  sx={{ marginX: 1, marginTop: 3 }}
                  required
                />
                <TextField
                  id="password-field"
                  label="Password"
                  variant="outlined"
                  type="password"
                  autoComplete="current-password"
                  value={values.password}
                  onChange={handleChange("password")}
                  sx={{ marginX: 1, marginTop: 3, marginBottom: 1 }}
                  required
                />
              </Grid>
              <Grid
                container
                spacing={0}
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <Link
                  to={"forgot"}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Typography variant="subtitle1" noWrap component="div">
                    Forgot Password?
                  </Typography>
                </Link>
              </Grid>
              <Grid
                container
                spacing={0}
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                  marginTop: 2,
                }}
              >
                <ThemeProvider theme={theme}>
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </ThemeProvider>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </div>
    );
  }
}

export default SignInForm;
