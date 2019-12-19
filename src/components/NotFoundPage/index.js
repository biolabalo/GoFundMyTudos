import React from "react";
import "./404.scss";
import { Link } from "react-router-dom";
import SubmitButton from "../commons/styledComponents/SubmitButton";
import NavBarButton from "../commons/styledComponents/NavBarButton";
import apple from "../../images/app-store.png";
import google from "../../images/google-play.png";
import facebook from "../../images/facebook.png";
import instagram from "../../images/instagram.png";
import linkedin from "../../images/linkedin.png";
import twitter from "../../images/twitter.png";
import { useSelector } from "react-redux";

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
                  <img src="https://res.cloudinary.com/xerdetech/image/upload/v1576741967/tudo_logo_jtzeop.png" />
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

        <div className="footer-404">
          <div className="footer-container-404">
            <div className="row">
              <div className="col-md-8 col-sm-12">
                <div className="footer-container-left">
                  <div className="footer-container-left-logo">
                    <h2>
                      <span>Tudo.</span>
                    </h2>
                  </div>
                  <p>
                    Cras gravida bibendum dolor eu varius. Morbi fermentum velit
                    nisl, eget vehicula lorem sodales eget. Donec quis volutpat
                    orci. Sed ipsum felis, tristique id egestas et, convallis ac
                    velit.
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="footer-container-right">
                  {/* <div className="footer-container-right-download">
                    <div>
                      <img src={google} alt="" />
                    </div>
                    <div>
                      <img src={apple} alt="" />
                    </div>
                  </div> */}
                  <div className="footer-container-right-socials footer-container-right-socials-404">
                    <div>
                      <img src={facebook} alt="" />
                    </div>
                    <div>
                      <img src={instagram} alt="" />
                    </div>
                    <div>
                      <img src={linkedin} alt="" />
                    </div>
                    <div>
                      <img src={twitter} alt="" />
                    </div>
                  </div>
                  <div className="footer-container-right-contact">
                    <p>(409)388-4384 | (977)778-3805</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFoundPage;
