import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import PageHeader from "../General/PageHeader.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import $ from "jquery";

const theme = createTheme({
  palette: {
    primary: {
      main: "#C41E3A",
    },
  },
});

function Contact() {
  const [values, setValues] = React.useState({
    from: "",
    subject: "",
    body: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  function handleSubmit(event) {
    event.preventDefault();

    sendMessage(values)

    setValues({
      ...values,
      from: "",
      subject: "",
      body: "",
    });
  }

  function sendMessage() {
    const message = {
        from: values.from,
        subject: values.subject,
        body: values.body
    };

    // POST request to authenticate login information.  Token is returned by server and stored in localStorage.
    $.ajax({
      type: "post",
      url: "http://localhost:8081/contact",
      data: JSON.stringify(message),
      contentType: "application/json; charset=utf-8",
      traditional: true,

      success: function (data) {
        alert("message successfully sent!");
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("message was not sent.");
      }
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
            paddingX: 6,
            marginTop: 10,
            marginBottom: 16,
            height: 540,
            width: 500,
            alignItems: "center",
            opacity: 0.9,
          }}
        >
          <PageHeader message="Contact Us" />
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
                fullWidth
                id="email-field"
                label="Your email address"
                variant="outlined"
                type="text"
                autoComplete="email"
                value={values.from}
                onChange={handleChange("from")}
                sx={{ marginX: 1, marginTop: 3 }}
              />
              <TextField
                fullWidth
                id="subject-field"
                label="Subject"
                variant="outlined"
                type="text"
                value={values.subject}
                onChange={handleChange("subject")}
                sx={{ marginX: 1, marginTop: 3 }}
              />
              <TextField
                fullWidth
                multiline
                maxRows={3}
                id="body-field"
                label="Message"
                variant="outlined"
                type="text"
                value={values.body}
                onChange={handleChange("body")}
                sx={{ marginX: 1, my: 3 }}
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

export default Contact;
