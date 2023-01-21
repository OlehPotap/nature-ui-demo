import React from "react";
import {
  // Link,
  Outlet,
} from "react-router-dom";
import Header from "../Header";
import Container from "../Container";

export default function Layout({ handleOpenLeftPanel }) {
  return (
    <>
      <Header handleOpenLeftPanel={handleOpenLeftPanel} />
      {/* <div className="links">
        <Link to="/">Main-Desktop-Page </Link>
        <Link to="/login">Login-Page </Link>
        <Link to="/register">Register-Page </Link>
        <Link to="/add-wallet">Add-Wallet-Page </Link>
        <Link to="/new-wallet">New-Wallet-Page </Link>
        <Link to="/send">Send-Page </Link>
        <Link to="/recive">Recive-Page</Link>
      </div> */}
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
