import { Container, Paper, Grid } from "@mui/material";
import React from "react";
import $ from "jquery";
import DeactivatedMenuItem from "./DeactivatedMenuItem.jsx";
import MenuItem from "./MenuItem.jsx";
import PageHeader from "../General/PageHeader.jsx";
import { useEffect } from "react";

function Menu(props) {
  let menu;
  let user;

  useEffect(() => {}, [menu]);

  // GET request to retrieve menu items from database.
  function getMenu() {
    $.ajax({
      type: "get",
      url: "http://localhost:8080/api/menu",
      contentType: "application/json; charset=utf-8",
      async: false,
      traditional: true,

      success: function (data) {
        data = JSON.stringify(data);
        menu = JSON.parse(data);
      },
    });
  }

  function deactivateMenuItem(item) {
    $.ajax({
      type: "get",
      url: "http://localhost:8080/api/menu/deactivate/" + item.id,
      contentType: "application/json; charset=utf-8",
      async: false,
      traditional: true,

      success: function () {
        window.location.reload();
      },
    });
  }

  function activateMenuItem(item) {
    $.ajax({
      type: "get",
      url: "http://localhost:8080/api/menu/activate/" + item.id,
      contentType: "application/json; charset=utf-8",
      async: false,
      traditional: true,

      success: function () {
        window.location.reload();
      },
    });
  }

  // Creates a new MenuItem component to be displayed.
  function createMenuItem(menu) {
    let menuItem = {
      key: menu.id,
      id: menu.id,
      name: menu.name,
      price: menu.price,
      description: menu.description,
      imgPath: menu.imgPath,
      category: menu.category,
    };

    return (
      <MenuItem
        key={menuItem.key}
        item={menuItem}
        add={props.add}
        persist={props.persist}
        deactivate={deactivateMenuItem}
      />
    );
  }

  function createDeactivatedMenuItem(menu) {
    let menuItem = {
      key: menu.id,
      id: menu.id,
      name: menu.name,
      price: menu.price,
      description: menu.description,
      imgPath: menu.imgPath,
      category: menu.category,
    };

    return (
      <DeactivatedMenuItem
        key={menuItem.key}
        item={menuItem}
        add={props.add}
        persist={props.persist}
        activate={activateMenuItem}
      />
    );
  }

  getMenu(); // GET menu items from database before returning view.

  function getUser() {
    user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
  }

  function generateDeactivatedSection() {
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
        <Paper
          elevation={3}
          sx={{
            marginTop: 4,
            marginBottom: 8,
            opacity: 0.9,
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} l={12}>
              <PageHeader message="Deactivated" />
            </Grid>
            {menu.map((item) =>
              item.active === false ? createDeactivatedMenuItem(item) : null
            )}
          </Grid>
        </Paper>
      );
    }
  }

  return (
    <Container maxWidth="xl">
      <Paper
        elevation={3}
        sx={{
          marginTop: 2,
          opacity: 0.9,
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} l={12}>
            <PageHeader message="Appetizers" />
          </Grid>
          {menu.map((item) =>
            item.active === true && item.category === "Appetizer"
              ? createMenuItem(item)
              : null
          )}
        </Grid>
      </Paper>
      <Paper
        elevation={3}
        sx={{
          marginTop: 4,
          marginBottom: 8,
          opacity: 0.9,
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} l={12}>
            <PageHeader message="Burgers" />
          </Grid>
          {menu.map((item) =>
            item.active === true && item.category === "Burger"
              ? createMenuItem(item)
              : null
          )}
        </Grid>
      </Paper>

      <Paper
        elevation={3}
        sx={{
          marginTop: 4,
          marginBottom: 8,
          opacity: 0.9,
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} l={12}>
            <PageHeader message="Salads" />
          </Grid>
          {menu.map((item) =>
            item.active === true && item.category === "Salad"
              ? createMenuItem(item)
              : null
          )}
        </Grid>
      </Paper>
      <Paper
        elevation={3}
        sx={{
          marginTop: 4,
          marginBottom: 8,
          opacity: 0.9,
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} l={12}>
            <PageHeader message="Desserts" />
          </Grid>
          {menu.map((item) =>
            item.active === true && item.category === "Dessert"
              ? createMenuItem(item)
              : null
          )}
        </Grid>
      </Paper>
      {generateDeactivatedSection()}
    </Container>
  );
}

export default Menu;
