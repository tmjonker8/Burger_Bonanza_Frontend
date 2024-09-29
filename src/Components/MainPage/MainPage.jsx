import React, { useEffect } from "react";

function MainPage(props) {

  useEffect(() => {
    props.get();
  }, []);

  return (
    <div className="logo-div">
      <img className="logo" src="./images/burger_bonanza.png" alt="logo"></img>
    </div>
  );
}

export default MainPage;
