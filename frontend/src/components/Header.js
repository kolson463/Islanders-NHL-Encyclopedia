import React from "react";

const Header = (username) => {
  return (
    <div className="container">
      <div className="row">
        <h1 className="col">NHL Encyclopedia</h1>
        <h5 className="col">{username} Logged In</h5>
        <button className="col">Log Out</button>
      </div>
    </div >
  );
};

export default Header;
