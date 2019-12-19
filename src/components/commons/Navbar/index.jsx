import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import NavBarButton from "../styledComponents/NavBarButton";
import SignUpButton from "../../commons/styledComponents/SubmitButton";
import "./navbar.scss";

const NavBar = ({ match: { url, path } }) => {
  let navLinks;

  if (url === "/") {
    navLinks = (
      <>
        <Link to="/login">
          <NavBarButton>LOGIN</NavBarButton>
        </Link>
        <Link to="/signup">
          <SignUpButton
            className="font-weight-lighter sign-up-btn-landing"
            boxShadow="0 5px 10px 0 rgba(165, 186, 255, 0.48);"
            backgroundColor="#7594FB"
            borderColor="transparent"
            width="150px"
            Height="45px"
          >
            Sign Up
          </SignUpButton>
        </Link>
      </>
    );
  }

  if (path === "/contribute/:todoID") {
    if (localStorage.TUDU_token) {
      return (
        <Navbar expand="lg" variant="light" className="navbar">
          <Container>
            <Navbar.Brand>
              <Link to="/dasboard">
                <div className="logo">
                  {/* <img src={logo} alt="logo" /> */}
                </div>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto"> </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    } else {
      return (
        <Navbar expand="lg" variant="light" className="navbar">
          <Container>
            <Navbar.Brand>
              <Link to="/">
                <div className="logo">
                  {/* <img src={logo} alt="logo" /> */}
                </div>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Link to="/login">
                  <NavBarButton>LOGIN</NavBarButton>
                </Link>
                <Link to="/signup">
                  <SignUpButton
                    className="font-weight-lighter sign-up-btn-landing"
                    boxShadow="0 5px 10px 0 rgba(165, 186, 255, 0.48);"
                    backgroundColor="#7594FB"
                    borderColor="transparent"
                    width="150px"
                    Height="45px"
                  >
                    Sign Up
                  </SignUpButton>
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    }
  }

  // Login Page
  if (url === "/login" || url === "/verify" || url === "/signup") {
    navLinks = "";
  }

  if (
    url === "/password-reset-request" ||
    url === "/password-reset-change/:uiid/:token"
  ) {
    navLinks = (
      <>
        <Nav.Link style={{ cursor: "auto" }} className="ml-2">
          {" "}
          <p className="mt-3 nav-paragraphs">Remember Password?</p>
        </Nav.Link>
        <Link to="/login">
          <NavBarButton>Login Here</NavBarButton>
        </Link>
      </>
    );
  }

  return (
    <Navbar expand="lg" variant="light" className="navbar">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <div className="logo">
              <img
                src="https://res.cloudinary.com/xerdetech/image/upload/v1576741967/tudo_logo_jtzeop.png"
                alt="logo"
              />
            </div>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">{navLinks}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default withRouter(NavBar);
