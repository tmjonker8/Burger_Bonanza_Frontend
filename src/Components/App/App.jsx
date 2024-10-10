import React, { useState, useEffect } from "react";
import "../../App.css";
import SignInForm from "../SignInForm/SignInForm.jsx";
import NavBar from "../Nav/NavBar.jsx";
import Container from "@mui/material/Container";
import AddForm from "../Admin/AddForm.jsx";
import Footer from "../Footer/Footer.jsx";
import MainPage from "../MainPage/MainPage.jsx";
import Menu from "../Menu/Menu.jsx";
import ChangePassword from "../ChangePassword/ChangePassword.jsx";
import Contact from "../Contact/Contact.jsx";
import $ from "jquery";
import Cart from "../Cart/Cart.jsx";
import Register from "../Register/Register.jsx";
import { Routes, Route } from "react-router-dom";
import CheckOut from "../Checkout/CheckOut.jsx";
import OrderHistory from "../OrderHistory/OrderHistory.jsx";

function App() {
  const [quantity, setQuantity] = useState(0);

  const [cart, setCart] = useState({
    numItems: quantity,
    menuItems: [],
  });

  useEffect(() => {
    // Saves user cart when quantity changes.
    setUserCart();
  }, [quantity]);

  useEffect(() => {
    getUserCart();
  }, []);

  let user, token;

  // Saves user cart to database.
  function setUserCart() {
    if (localStorage.getItem("user") !== null) {
      getUser();

      let shoppingCart = {
        numItems: quantity,
        menuItems: cart.menuItems,
      };

      $.ajax({
        type: "post",
        headers: { Authorization: token },
        url: "http://localhost:8080/cart/" + user.username,
        data: JSON.stringify(shoppingCart),
        contentType: "application/json; charset=utf-8",
        traditional: true,

        success: function () {
          console.log("Cart successfully saved!");
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          localStorage.clear();
        },
      });
    }
  }

  function getUser() {
    user = JSON.parse(localStorage.getItem("user"));
    token = user.token;
  }

  // Retrieves user cart from database.
  function getUserCart() {
    if (localStorage.getItem("user") !== null) {
      getUser();

      $.ajax({
        type: "get",
        headers: { Authorization: token },
        url: "http://localhost:8080/cart/" + user.username,
        contentType: "application/json; charset=utf-8",
        traditional: true,

        success: function (data) {
          console.log("Cart has been retrieved!");
          let cart = JSON.parse(JSON.stringify(data));
          setCart({ ...cart, menuItems: cart.menuItems });
          setQuantity(cart.numItems);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          console.log("Error when retrieving cart.");
        },
      });
    }
  }

  function addToCart(item) {
    setQuantity(quantity + 1);

    setCart((prevState) => ({
      ...cart,
      menuItems: [...prevState.menuItems, item],
    }));
  }

  function removeFromCart(item) {
    setQuantity(quantity - 1);

    setCart({
      ...cart,
      menuItems: cart.menuItems.filter((i, index) => index !== item),
    });
  }

  function clearCart() {
    setCart({ ...cart, menuItems: [] });
    setQuantity(0);
  }

  return (
    <main>
      <NavBar quantity={quantity} clear={clearCart} persist={setUserCart} />
      <Container
        sx={{
          paddingY: 3,
        }}
      >
        <Routes>
          <Route exact path="/" element={<MainPage get={getUserCart} />} />
          <Route exact path="history" element={<OrderHistory />} />
          <Route exact path="add" element={<AddForm />} />
          <Route
            exact
            path="sign-in"
            element={
              <SignInForm
                persist={setUserCart}
                get={getUserCart}
                quantity={quantity}
              />
            }
          />
          <Route
            exact
            path="menu"
            element={
              <Menu
                data={cart.menuItems}
                add={addToCart}
                persist={setUserCart}
              />
            }
          />
          <Route exact path="change" element={<ChangePassword />} />
          <Route exact path="contact" element={<Contact />} />
          <Route
            exact
            path="cart"
            element={
              <Cart
                data={cart.menuItems}
                remove={removeFromCart}
                persist={setUserCart}
              />
            }
          />
          <Route
            exact
            path="register"
            element={<Register persist={setUserCart} />}
          />
          <Route
            exact
            path="order"
            element={
              <CheckOut
                data={cart}
                remove={removeFromCart}
                persist={setUserCart}
                clear={clearCart}
              />
            }
          />
        </Routes>
      </Container>
      <Footer />
    </main>
  );
}

export default App;
