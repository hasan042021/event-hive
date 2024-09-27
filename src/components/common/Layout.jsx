import React from "react";
import Footer from "./Footer";
import Message from "./Alert";
import NavbarCustom from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header className="navbar">
        <NavbarCustom />
      </header>
      <main className="content">{children}</main>

      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
