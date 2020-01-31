import React from "react";
import "./404.scss";
import { Link } from "react-router-dom";
import SubmitButton from "../commons/styledComponents/SubmitButton";
import NavBarButton from "../commons/styledComponents/NavBarButton";
import apple from "../../images/app-store.png";
import google from "../../images/google-play.png";
import { useSelector } from "react-redux";
import Footer from "./Footer";

import { Navbar, Nav, Container } from "react-bootstrap";
const NotFoundPage = ({ history }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  return (
    <>
      <main className="contribute">
        <Navbar expand="lg" variant="light" className="navbar navbar-404">
          <Container>
            <Navbar.Brand>
              <Link to={isAuthenticated ? "/dashboard" : "/"}>
                <div className="logo">
                  <img src="https://res.cloudinary.com/xerdetech/image/upload/v1576741967/tudo_logo_jtzeop.png" alt="notFound"/>
                </div>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              {isAuthenticated ? (
                ""
              ) : (
                <Nav className="ml-auto">
                  <Link to="/login">
                    <NavBarButton>LOGIN</NavBarButton>
                  </Link>
                  <Link to="/signup">
                    <SubmitButton
                      className="font-weight-lighter sign-up-btn-landing"
                      boxShadow="0 5px 10px 0 rgba(165, 186, 255, 0.48);"
                      backgroundColor="#7594FB"
                      borderColor="transparent"
                      width="150px"
                      Height="45px"
                    >
                      Sign Up
                    </SubmitButton>
                  </Link>
                </Nav>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <section className="top-level-404">
          <h2>Oh No! Page not found</h2>
          <p>
            Apparently, this page took a day off to relax at the beach. Instead
            of waiting, why don't you <br />
            return to the homepage
          </p>
          <SubmitButton
            className="dsknmfleksnfjks"
            backgroundColor="#7594FB"
            borderColor="transparent"
            boxShadow="0 5px 10px 0 rgba(165, 186, 255, 0.48)"
            width="250px"
            Height="45px"
            onClick={() =>
              isAuthenticated ? history.push("/dashboard") : history.push("/")
            }
          >
            return to the homepage
          </SubmitButton>
        </section>

        <section className="middle-level-404">
          <h3>Get The App</h3>
          <p>Start enjoying the power of Tudo</p>
          <div className="footer-container-right-download kjnfcsjdlbnf">
            <div>
              <img src={google} alt="" />
            </div>
            <div>
              <img src={apple} alt="" />
            </div>
          </div>
        </section>

       <Footer/>
      </main>
    </>
  );
};

export default NotFoundPage;
