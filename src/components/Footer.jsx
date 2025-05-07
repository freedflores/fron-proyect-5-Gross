import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="">
      <Container className="text-center">
        <small style={{ marginTop: "20px", display: "block" }}>
          &copy; {new Date().getFullYear()} App - Massimo Gross - Pucallpa
        </small>
      </Container>
    </footer>
  );
};

export default Footer;