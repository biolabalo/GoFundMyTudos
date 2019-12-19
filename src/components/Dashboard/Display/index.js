import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ListGroup, Form } from "react-bootstrap";
import Dot from "../../commons/styledComponents/Dot";
import Button from "../../commons/styledComponents/SubmitButton";

import "./display.scss";

const colorLibrary = [
  {
    color: "#7594fb",
    isSelected: true,
    colorTitle: "Default"
  },
  {
    color: "#FA73B2",
    isSelected: false,
    colorTitle: "Boy Bye"
  },
  {
    color: "#77C3FB",
    isSelected: false,
    colorTitle: "Ice Cool"
  },
  {
    color: "#FBC977",
    isSelected: false,
    colorTitle: "Radical"
  },
  {
    color: "#7E74FB",
    isSelected: false,
    colorTitle: "Faniyi"
  },
  {
    color: "#4EE38B",
    isSelected: false,
    colorTitle: "green"
  }
];

const Display = () => {
  const {
    backgroundColor,
    titleColor,
    colorPalete,
    color,
    cardHeaderBackgroundColor,
    cardBackgroundColor
  } = useSelector(state => state.auth.userThemePrefrences);
  const dispatch = useDispatch();

  const setBackgroundColor = color => {
    dispatch({ type: color === "dark" ? "SET_BG_TO_DARK" : "SET_BG_TO_WHITE" });
  };

  return (
    <div className="tudu">
      <div className="tudu-body">
        <div className="settings-body-content">
          <div className="tudu-body-content-image">
            <img
              src="https://res.cloudinary.com/xerdetech/image/upload/v1574816688/Layer_2_eresxf.png"
              alt=""
            />
          </div>
          <div className="display-view-dashboard">
            <p className="mb-1">
              Display settings affect all of your Tudu account on this browser.
              These settings are only visible to you
            </p>
            <ListGroup>
              <ListGroup.Item
                style={{
                  color: titleColor,
                  background: cardHeaderBackgroundColor
                }}
                className="color-engine-card-tile"
              >
                Colour palette
              </ListGroup.Item>
              {colorLibrary.map((eachColor, index) => (
                <ListGroup.Item
                  key={index}
                  onClick={() =>
                    dispatch({
                      type: "UPDATE_COLOR_PALETTE",
                      payload: eachColor.color
                    })
                  }
                  style={{
                    background: cardBackgroundColor
                  }}
                  className="hoverable-list"
                >
                  <Dot backgroundColor={eachColor.color}>
                    {eachColor.color === colorPalete ? (
                      // while looping through colorArray check where user prefrence from redux matches a color from the colorArray
                      <span className="markedDotSymbol">✓</span>
                    ) : (
                      ""
                    )}
                  </Dot>
                  <p className="float-right">{eachColor.colorTitle}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <ListGroup>
              <ListGroup.Item
                style={{
                  color: titleColor,
                  background: cardHeaderBackgroundColor
                }}
                className="color-engine-card-tile"
              >
                Background
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  background: cardBackgroundColor
                }}
                className="hoverable-list"
              >
                <div className="row">
                  <div className="col">
                    <Button
                      className="theme-background-white-btn xzawope"
                      backgroundColor="white"
                      borderColor={
                        backgroundColor === "#101522" ? "#ffffff" : colorPalete
                      }
                      boxShadow="none"
                      width="150px"
                      borderRadius="5px"
                      Height="45px"
                      buttonColor={color}
                    >
                      {/* backend Api: on page load automatically tick the checkbox */}
                      <Form.Check
                        onChange={() => setBackgroundColor("white")}
                        type="radio"
                        name="background-colors"
                        label="White"
                        checked={backgroundColor === "#ffffff" ? true : false}
                      />
                    </Button>
                  </div>
                  <div className="col">
                    <Button
                      className="theme-background-dark-btn"
                      backgroundColor="#222222"
                      borderColor={
                        backgroundColor !== "#101522" ? "#222222" : colorPalete
                      }
                      boxShadow="none"
                      width="150px"
                      borderRadius="5px"
                      Height="45px"
                      buttonColor={titleColor}
                    >
                      <Form.Check
                        onChange={() => setBackgroundColor("dark")}
                        type="radio"
                        name="background-colors"
                        label="Dark"
                        checked={backgroundColor === "#101522" ? true : false}
                      />
                    </Button>
                  </div>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
