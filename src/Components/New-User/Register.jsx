import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import PageHeader from "../General/PageHeader.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import ValidateService from "../Services/ValidateService.js";
import DialogBox from "../General/DialogBox.jsx";

function Register(props) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#C41E3A",
      },
    },
  });

  const navigate = useNavigate();

  const [pwOpen, setPwOpen] = React.useState(false);
  const [unOpen, setUnOpen] = React.useState(false);

  function handlePwClickOpen() {
    setPwOpen(true);
  }

  function handlePwClose() {
    setPwOpen(false);
  }

  function handleUnClickOpen() {
    setUnOpen(true);
  }

  function handleUnClose() {
    setUnOpen(false);
  }

  const [values, setValues] = React.useState({
    username: "",
    password1: "",
    password2: "",
  });

  function handleChange(prop, event) {
    setValues({ ...values, [prop]: event.target.value });
  }

  // function that processes submit, calls method that sends POST request, and resets values to blank.
  function handleSubmit(event) {
    event.preventDefault();

    if (
      ValidateService.validatePasswordsMatch(values) &&
      ValidateService.validatePassword1(values) &&
      ValidateService.validatePassword2(values)
    ) {
      if (ValidateService.validateUsername(values)) {
        setValues({
          ...values,
          username: "",
          password1: "",
          password2: "",
        });

        register();
      } else {
        handleUnClickOpen();
      }
    } else {
      handlePwClickOpen();
    }
  }

  function register() {
    const credentials = {
      username: values.username,
      password1: values.password1,
      password2: values.password2,
    };

    // POST request to authenticate login information.  Token is returned by server and stored in localStorage.
    $.ajax({
      type: "post",
      url: "http://localhost:8080/register",
      data: JSON.stringify(credentials),
      contentType: "application/json; charset=utf-8",
      traditional: true,

      success: function (data) {
        navigate("/sign-in");
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("User with that username already exists.");
      },
    });
  }

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
            width: 400,
            alignItems: "center",
            opacity: 0.9,
          }}
        >
          <PageHeader message="Register" />
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
                error={!ValidateService.validateUsername(values)}
                id="username-field"
                label="Username"
                variant="outlined"
                type="text"
                autoComplete="username"
                value={values.username}
                onChange={(e) => handleChange("username", e)}
                sx={{ marginX: 1, marginTop: 3 }}
                required
              />
              <DialogBox
                open={unOpen}
                title="Invalid Username"
                text={"Username is invalid."}
                close={handleUnClose}
              />
              <TextField
                error={
                  !ValidateService.validatePasswordsMatch(values) ||
                  !ValidateService.validatePassword1(values)
                }
                id="password1-field"
                label="Password"
                variant="outlined"
                type="password"
                helperText={
                  !ValidateService.validatePassword1(values)
                    ? "Passwords must meet guidelines."
                    : ""
                }
                autoComplete="current-password"
                value={values.password1}
                onChange={(e) => handleChange("password1", e)}
                sx={{ marginX: 1, marginTop: 3 }}
                required
              />
              <TextField
                error={
                  !ValidateService.validatePasswordsMatch(values) ||
                  !ValidateService.validatePassword2(values)
                }
                id="password2-field"
                label="Verify Password"
                variant="outlined"
                type="password"
                helperText={
                  !ValidateService.validatePassword2(values)
                    ? "Passwords must meet guidelines."
                    : ""
                }
                value={values.password2}
                onChange={(e) => handleChange("password2", e)}
                sx={{ marginX: 1, marginTop: 3 }}
                required
              />
            </Grid>
            <Grid
              container
              spacing={0}
              direction="row"
              alignItems="center"
              justifyContent="center"
              sx={{ marginY: 1 }}
            >
              <button onClick={() => handlePwClickOpen()}>
                <Typography variant="subtitle1" noWrap component="div">
                  Password Guidelines
                </Typography>
              </button>
              <DialogBox
                open={pwOpen}
                title="Password Guidelines"
                text={
                  "Password must be 8 characters or longer, must contain 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
                }
                close={handlePwClose}
              />
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
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ marginBottom: 3 }}
                >
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

export default Register;
