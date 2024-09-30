import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import PageHeader from "../General/PageHeader.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import $ from "jquery";

const theme = createTheme({
  palette: {
    primary: {
      main: "#C41E3A",
    },
  },
});

function ChangePassword(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state;

  const [values, setValues] = React.useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  function handleSubmit(event) {
    event.preventDefault();

    signIn(values);

    setValues({
      ...values,
      oldPassword: "",
      newPassword: "",
    });
  }

  function signIn(values) {
    const credentials = {
      username: user.username,
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };

    // POST request to authenticate login information.  Token is returned by server and stored in localStorage.
    $.ajax({
      type: "post",
      headers: { Authorization: user.token },
      url: "http://localhost:8080/change",
      data: JSON.stringify(credentials),
      contentType: "application/json; charset=utf-8",
      traditional: true,
      success: function (user) {
        alert("Password successfully changed...");

        navigate("/");
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("Password Incorrect");
      },
    });
  }

  // if valid token isn't passed over, then page was accessed without a sign-in.  User must sign-in to access this page.
  if (user === null) {
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
        >
          <Paper
            elevation={3}
            sx={{
              marginTop: 10,
              marginBottom: 16,
              height: 570,
              width: 400,
              alignItems: "center",
              opacity: 0.9,
            }}
          >
            <PageHeader message="Change Password" />
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
                  defaultValue={user.username}
                  sx={{ marginX: 1, marginTop: 3 }}
                  disabled
                />
                <TextField
                  id="old-password-field"
                  label="Old Password"
                  variant="outlined"
                  type="password"
                  autoComplete="current-password"
                  value={values.oldPassword}
                  onChange={handleChange("oldPassword")}
                  sx={{ marginX: 1, marginTop: 3 }}
                  required
                />
                <TextField
                  id="new-password-field"
                  label="New Password"
                  variant="outlined"
                  type="password"
                  autoComplete="new-password"
                  value={values.newPassword}
                  onChange={handleChange("newPassword")}
                  sx={{ marginX: 1, my: 3 }}
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

export default ChangePassword;
