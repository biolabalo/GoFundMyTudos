import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "../../axios-instance";
import Footer from "../Footer";
import NavBar from "../commons/Navbar";
import { Redirect } from "react-router-dom";
import "./contribute.scss";
import { ProgressBar } from "react-bootstrap";
import SubmitButton from "../commons/styledComponents/SubmitButton";
import PayModal from "./paymentModal";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavBarButton from "../commons/styledComponents/NavBarButton";
import { logout } from "../../redux/auth/authAction";

const Contribute = ({ history, match: { params } }) => {
  const [ContributionDetails, setContributionDetails] = useState(null);
  const [isFecthedDetails, setFecthedDetails] = useState({
    isFetchedError: false,
    isLoading: false
  });
  const [showPaymentModal, setPaymentModal] = useState(false);
  const { isAuthenticated } = useSelector(state => state.auth);
  const { isFetchedError, isLoading } = isFecthedDetails;

  const { todoID } = params;

  useEffect(() => {
    (async function() {
      if (!todoID) return <Redirect to="/404" />;

      setFecthedDetails({
        isFetchedError: false,
        isLoading: true
      });

      try {
        const response = await axios.get(`/shared-tudo/${todoID}`);
        const {
          data: { data }
        } = response;
        setFecthedDetails({
          isFetchedError: false,
          isLoading: false
        });
        setContributionDetails(data);
      } catch (err) {
        setFecthedDetails({
          isFetchedError: true,
          isLoading: false
        });
      }
    })();
  }, [todoID]);

  const dispatch = useDispatch();

  const logoutUser = () => {
    logout(history, dispatch);
  };

  const numberWithCommas = number =>
    number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (!ContributionDetails && !isFetchedError && !isLoading) {
    return (
      <>
        <main className="contribute">
          <NavBar />
          <div className="contribute-tudu-details  clearfix">
            <div className="tudu-body-content-image">
              <img
                src="https://res.cloudinary.com/xerdetech/image/upload/v1574816688/Layer_2_eresxf.png"
                alt=""
              />
            </div>

            <section className="float-left left-wing-contribute">
              <div className="todo-image-holder linear-background "></div>

              <div className="font-weight-lighter mt-4 jkdnsf ">
                <div className="row no-gutters mb-4 mt-2">
                  <div className="col-md-2"></div>
                </div>
                <div className="amount-raised-card linear-background-smaller mt-5 mb-3">
                  <p className="font-weight-bo text-left linear-background-smaller mt-0 mb-0 p-3"></p>
                  <p className="p-2 linear-background-smaller"></p>
                </div>
              </div>
            </section>
            <section className="float-right linear-background right-wing-contribute">
              <div className="amount-raised-card linear-background mb-3"></div>
            </section>
          </div>
          <Footer />
        </main>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <main className="contribute">
          <NavBar isAuthenticated={false} />
          <div className="contribute-tudu-details  clearfix">
            <div className="tudu-body-content-image">
              <img
                src="https://res.cloudinary.com/xerdetech/image/upload/v1574816688/Layer_2_eresxf.png"
                alt=""
              />
            </div>

            <section className="float-left left-wing-contribute">
              <div className="todo-image-holder linear-background "></div>

              <div className="font-weight-lighter mt-4 jkdnsf ">
                <div className="row no-gutters mb-4 mt-2">
                  <div className="col-md-2"></div>
                </div>
                <div className="amount-raised-card linear-background-smaller mt-5 mb-3">
                  <p className="font-weight-bo text-left linear-background-smaller mt-0 mb-0 p-3"></p>
                  <p className="p-2 linear-background-smaller"></p>
                </div>
              </div>
            </section>
            <section className="float-right linear-background right-wing-contribute">
              <div className="amount-raised-card linear-background mb-3"></div>
            </section>
          </div>
          <Footer />
        </main>
      </>
    );
  }

  if (isFetchedError && !isLoading) {
    return <Redirect to="/404" />;
  }

  return (
    <>
      <main className="contribute">
        <Navbar expand="lg" variant="light" className="navbar navbar-404">
          <Container>
            <Navbar.Brand>
              <Link to={isAuthenticated ? "/dashboard" : "/"}>
                <div className="logo">
                  <img
                    src="https://res.cloudinary.com/xerdetech/image/upload/v1576741967/tudo_logo_jtzeop.png"
                    alt="notFound"
                  />
                </div>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              {isAuthenticated ? (
                <Nav className="ml-auto">
                  <Link to="/">
                    <SubmitButton
                      className="font-weight-lighter sign-up-btn-landing"
                      boxShadow="0 5px 10px 0 rgba(165, 186, 255, 0.48);"
                      backgroundColor="#7594FB"
                      borderColor="transparent"
                      width="150px"
                      Height="45px"
                      onClick={() => {
                        logoutUser();
                      }}
                    >
                      Log out
                    </SubmitButton>
                  </Link>
                </Nav>
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
        <div className="contribute-tudu-details  clearfix">
          <div className="tudu-body-content-image">
            <img
              src="https://res.cloudinary.com/xerdetech/image/upload/v1574816688/Layer_2_eresxf.png"
              alt=""
            />
          </div>

          <section className="float-left left-wing-contribute">
            <h3 className="bold-otouke mb-4">
              Contribute to {ContributionDetails.user.first_name}'s{" "}
              {ContributionDetails.goal_name}
            </h3>

            {ContributionDetails.tudo_media ? (
              <div className="todo-image-holder">
                {ContributionDetails.tudo_media.endsWith(".mp4") ||
                ContributionDetails.tudo_media.endsWith(".avi") ||
                ContributionDetails.tudo_media.endsWith(".ogg") ? (
                  <video src={ContributionDetails.tudo_media} controls></video>
                ) : (
                  <img
                    src={ContributionDetails.tudo_media}
                    className="auto"
                    alt="tudo-pic"
                  />
                )}
              </div>
            ) : (
              ""
            )}

            <div className="font-weight-lighter mt-4 jkdnsf ">
              <div className="mb-4 mt-2">
                <div className="col-1-vsdk float-left mr-2">
                  {" "}
                  <img
                    src={ContributionDetails.user.profile_image}
                    alt="Todo-pic"
                  />
                </div>
                <div className="col-11-vsdk">
                  {ContributionDetails.user.first_name}
                  &nbsp; {ContributionDetails.user.last_name}
                  &nbsp; started this tudo <br />
                  <small>
                    {moment(`${ContributionDetails.created_at}`).fromNow()}
                  </small>
                </div>
              </div>
              <div className="amount-raised-card mt-5 mb-3">
                <p className="font-weight-bo text-left dsefwe mt-0 mb-0 p-3">
                  <span className="bold-otouke">Goal Statement</span>
                </p>
                <p className="p-2">
                  <small>{ContributionDetails.goal_description}</small>
                </p>
              </div>

              <span className="btn-for-smaller-screen mt-4 mb-4">
                <SubmitButton
                  backgroundColor="#7594FB"
                  borderColor="transparent"
                  boxShadow="0 5px 10px 0 rgba(165, 186, 255, 0.48)"
                  width="350px"
                  Height="45px"
                  onClick={() => setPaymentModal(true)}
                >
                  Contribute
                </SubmitButton>
              </span>
            </div>
          </section>
          <section className="float-right">
            <div className="amount-raised-card mb-3">
              <p className="font-weight-bo text-left dsefwe mt-0 mb-0 p-3">
                <span className="bold-otouke">Amount raised</span>
              </p>

              <div className="p-4">
                <p className="mt-2 mb-2">
                  {" "}
                  <span className="bold-otouke">
                    N{" "}
                    {numberWithCommas(
                      ContributionDetails.amount_generated / 100
                    )}
                  </span>{" "}
                  /
                  <span className="dfdiosfsxz">
                    {" "}
                    {numberWithCommas(ContributionDetails.amount / 100)}
                  </span>
                </p>
                <hr className="mt-3 mb-3" />
                <p className="mt-2 mb-2">
                  {" "}
                  {ContributionDetails.contributions_percentage}% achieved
                </p>
                <ProgressBar
                  now={ContributionDetails.contributions_percentage}
                  variant="success"
                  className="mt-3"
                />
              </div>

              <p className="text-left dsefwe mt-0 mb-0 p-3">
                <span className="bold-otouke">
                  {" "}
                  {ContributionDetails.contributions}{" "}
                </span>{" "}
                {ContributionDetails.contributions
                  ? "contributions made so far"
                  : "contribution made so far"}
              </p>
            </div>
            <span className="btn-for-larger-screen">
              <SubmitButton
                backgroundColor="#7594FB"
                borderColor="transparent"
                boxShadow="0 5px 10px 0 rgba(165, 186, 255, 0.48)"
                width="350px"
                Height="45px"
                onClick={() => setPaymentModal(true)}
              >
                Contribute
              </SubmitButton>
            </span>
          </section>
        </div>
        <Footer />
      </main>
      <PayModal
        showPaymentModal={showPaymentModal}
        setPaymentModal={setPaymentModal}
        todoID={todoID}
      />
    </>
  );
};

export default Contribute;
