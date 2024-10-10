import $ from "jquery";
import { useEffect, useState } from "react";

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
            console.log(orders);
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
    console.log(order.id);
  }

  return <div>{orders.map((order) => generateOrderHistory(order))}</div>;
}

export default OrderHistory;
