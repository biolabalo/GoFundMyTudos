import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "../../axios-instance";
import Footer from "../Footer";
import NavBar from "../commons/Navbar";
import { Redirect } from "react-router-dom";
import "./contribute.scss";
import { ProgressBar } from "react-bootstrap";
import SubmitButton from "../commons/styledComponents/SubmitButton";
import userAvatar from "../../images/avatar-png.png";
import PayModal from "./paymentModal";

const Contribute = ({ match: { params } }) => {
  const [ContributionDetails, setContributionDetails] = useState(null);
  const [isFecthedDetails, setFecthedDetails] = useState({
    isFetchedError: false,
    isLoading: false
  });
  const [showPaymentModal, setPaymentModal] = useState(false);

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
        <NavBar isAuthenticated={false} />
        <div className="contribute-tudu-details  clearfix">
          <div className="tudu-body-content-image">
            <img
              src="https://res.cloudinary.com/xerdetech/image/upload/v1574816688/Layer_2_eresxf.png"
              alt=""
            />
          </div>

          <section className="float-left left-wing-contribute">
            <h3 className="bold-otouke mb-4">
              {ContributionDetails.goal_name}
            </h3>
            <div className="todo-image-holder">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT7dDvpTRKTH8jO3dYKySJxDA_5Omjnx1IfZeJjO7rM4NTLA8Hm"
                className="auto"
                alt="Todo-pic"
              />
              {/* <img src={ContributionDetails.tudo_media} alt="Todo-pic" /> */}
            </div>

            <div className="font-weight-lighter mt-4 jkdnsf ">
              <div className="row no-gutters mb-4 mt-2">
                <div className="col-md-2">
                  {" "}
                  <img src={userAvatar} alt="Todo-pic" />
                </div>
                <div className="col-md-10">
                  Abiola Balogun started this todo <br />
                  <small>
                    {moment(`${ContributionDetails.start_date}`).fromNow()}
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
            </div>
          </section>
          <section className="float-right mt-5 right-wing-contribute">
            <div className="amount-raised-card mb-3">
              <p className="font-weight-bo text-left dsefwe mt-0 mb-0 p-3">
                <span className="bold-otouke">Amount raised</span>
              </p>

              <div className="p-4">
                <p className="mt-2 mb-2">
                  {" "}
                  <span className="bold-otouke">
                    N {ContributionDetails.amount_generated}
                  </span>{" "}
                  /
                  <span className="dfdiosfsxz">
                    {" "}
                    {ContributionDetails.amount}
                  </span>
                </p>
                <hr className="mt-3 mb-3" />
                <p className="mt-2 mb-2">
                  {" "}
                  {(ContributionDetails.amount_generated * 100) /
                    ContributionDetails.amount}
                  % achieved
                </p>
                <ProgressBar
                  now={
                    (ContributionDetails.amount_generated * 100) /
                    ContributionDetails.amount
                  }
                  variant="success"
                  className="mt-3"
                />
              </div>

              <p className="text-left dsefwe mt-0 mb-0 p-3">
                <span className="bold-otouke">3 </span>contributions made so far
              </p>
            </div>
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
