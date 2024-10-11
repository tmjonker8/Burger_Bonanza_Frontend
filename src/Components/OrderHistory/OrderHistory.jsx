import $ from "jquery";
import { useEffect, useState } from "react";
import { Typography, Container, Paper, Grid } from "@mui/material";
import PageHeader from "../General/PageHeader.jsx";
import Order from "./Order.jsx";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let user, token;

    function getUser() {
      user = JSON.parse(localStorage.getItem("user"));
      token = user.token;
    }
    function getPurchases() {
      if (localStorage.getItem("user") !== null) {
        getUser();

        $.ajax({
          type: "get",
          headers: { Authorization: token },
          url: "http://localhost:8080/purchase/" + user.id,
          contentType: "application/json; charset=utf-8",
          async: false,
          traditional: true,

          success: function (data) {
            setOrders(data);
            console.log(data);
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
          },
        });
      }
    }

    getPurchases();
  }, []);

  function generateOrderHistory(order) {
    return (
      <Grid>
        <Order data={order} />
      </Grid>
    );
  }

  return (
    <Container maxWidth="xl">
      <Paper
        elevation={3}
        sx={{
          marginTop: 2,
          opacity: 0.9,
          marginBottom: 8,
        }}
      >
        <Grid container spacing={0} align="center" direction="column">
          <Grid item xs={12} l={12}>
            <PageHeader message="Order History" />
          </Grid>
          {orders.length > 0 ? (
            orders.map((order) => generateOrderHistory(order))
          ) : (
            <Grid
              container
              direction="row"
              justifyContent="center"
              sx={{ marginBottom: 3 }}
            >
              <Grid item l={3} sx={{ padding: 1 }}>
                <Typography variant="h5" component="div">
                  You have no order history.
                </Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
}

export default OrderHistory;
