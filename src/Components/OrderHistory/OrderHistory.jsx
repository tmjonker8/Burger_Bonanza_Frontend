import $ from "jquery";
import { useEffect } from "react";

function OrderHistory() {
  let user, token;
  let orders;

  useEffect(() => {
    getPurchases();
  });

  function getUser() {
    user = JSON.parse(localStorage.getItem("user"));
    token = user.token;
  }

  function getPurchases() {
    if (localStorage.getItem("user") !== null) {
      getUser();
    }

    $.ajax({
      type: "get",
      headers: { Authorization: token },
      url: "http://localhost:8080/purchase/" + user.id,
      contentType: "application/json; charset=utf-8",
      traditional: true,

      success: function (data) {
        orders = JSON.parse(JSON.stringify(data));
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        localStorage.clear();
      },
    });
  }

  return <div>{orders.map((order) => {})}</div>;
}

export default OrderHistory;
