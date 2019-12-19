import React from "react";

const  SignUpFooter = () => {
  const terms = {
    height: "18px",
    textAlign: "center",
    letterSpacing: 0,
    color: "#0B0547",
    fontSize: "10px"
  };

  const yellowish = {
    color: '#FF8000'
  }

  return (
    <div className="mt-4" style={terms}>
      <hr style={{width: '200px'}} />
      By clicking on Log In, you agree to our{" "}
      <span style={yellowish}>terms & conditions</span> and <br />
      <span style={yellowish}>privacy policy</span>{" "}
    </div>
  );
};
export default SignUpFooter;