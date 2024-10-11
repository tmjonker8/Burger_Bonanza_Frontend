import { Typography, Grid, Button } from "@mui/material";
import PageHeader from "../General/PageHeader.jsx";

function Order(props) {
  let currentOrder = props.data.menuItems;

  let total = 0;

  currentOrder.forEach((item) => (total += item.price));

  function generateMenuItemsPerOrder(item) {
    return (
      <Grid container justifyContent="center" direction="row">
        <Grid item l={3} sx={{ border: 0, padding: 1, width: 150 }}>
          <img className="cart-item" alt="alt placeholder" src={item.imgPath} />
        </Grid>
        <Grid item l={3} sx={{ border: 0, padding: 1, width: 150 }}>
          <Typography variant="h5" component="div">
            {item.name}
          </Typography>
        </Grid>
        <Grid item l={3} sx={{ border: 0, padding: 1, width: 550 }}>
          <Typography variant="h5" component="div">
            {item.description}
          </Typography>
        </Grid>
        <Grid item l={3} sx={{ border: 0, padding: 1 }}>
          <Typography variant="h5" component="div">
            ${item.price}
          </Typography>
        </Grid>
        <Grid item l={3} sx={{ padding: 1 }}></Grid>
      </Grid>
    );
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      sx={{ marginBottom: 3 }}
    >
      <Grid item xs={12} l={12}>
        <PageHeader message={props.data.date} />
      </Grid>
      {props.data.menuItems.map((item) => generateMenuItemsPerOrder(item))}
      <Grid item xs={12} l={12}>
        <Typography variant="h4" component="div" sx={{ marginBottom: 2 }}>
          {"Total: $" + Math.round(total * 100) / 100}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Order;
