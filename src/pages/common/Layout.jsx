import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header className="navbar">
        <Navbar />
      </header>

      <main className="content">{children}</main>

      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
