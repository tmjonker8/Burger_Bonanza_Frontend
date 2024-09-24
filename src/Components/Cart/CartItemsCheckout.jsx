import React from "react";
import { Typography, Grid, Button } from "@mui/material";

function CartItemsCheckout(props) {
  function onRemove(cartItem) {
    let index;

    props.old.map((current, i) => {
      if (current.id === cartItem.item.id) index = i;
    });

    props.remove(index);
  }

  return props.data.map((current, index) => (
    <React.Fragment key={index}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ marginBottom: 3 }}
      >
        <Grid item l={3} sx={{ border: 0, padding: 1, width: 150 }}>
          <img
            className="cart-item"
            alt="alt placeholder"
            src={current.item.imgPath}
          />
        </Grid>
        <Grid item l={3} sx={{ border: 0, padding: 1, width: 150 }}>
          <Typography variant="h5" component="div">
            {current.item.name}
          </Typography>
        </Grid>
        <Grid item l={3} sx={{ border: 0, padding: 1, width: 550 }}>
          <Typography variant="h5" component="div">
            {current.item.description}
          </Typography>
        </Grid>
        <Grid item l={3} sx={{ border: 0, padding: 1 }}>
          <Typography variant="h5" component="div">
            {current.quantity}
          </Typography>
        </Grid>
        <Grid item l={3} sx={{ border: 0, padding: 1 }}>
          <Typography variant="h5" component="div">
            ${current.item.price * current.quantity}
          </Typography>
        </Grid>
        <Grid item l={3} sx={{ padding: 1 }}></Grid>
      </Grid>
    </React.Fragment>
  ));
}

export default CartItemsCheckout;
