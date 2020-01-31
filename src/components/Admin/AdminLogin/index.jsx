import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import validationHelper from "../../../helpers/validation";
import tudoLogo from "../../../images/tudo logo.svg";
import tudoLogoBlue from "../../../images/tudo logo-1.svg";
import tudoLogoGreen from "../../../images/tudo logo-2.svg";
import tudoLogoPink from "../../../images/tudo logo-3.svg";
import "./AdminLogin.scsss.scss";
import { adminLogin } from "../../../redux/admin/adminAction";

export class AdminLogin extends React.Component {
  state = {
    formValues: {
      email: "",
      password: ""
    },
    errors: {
      email: "",
      password: ""
    }
  };

  componentDidMount() {
    this.persistAdminLogin(localStorage.admin_token);
  }

  componentDidUpdate() {
    const {
      admin: { isAdminAuthenticated }
    } = this.props;

    this.persistAdminLogin(isAdminAuthenticated);
  }

  persistAdminLogin = bool => {
    if (bool) {
      window.location.assign("/admin/dashboard");
    }
  };

  handleChange = e => {
    const {
      target: { value, id }
    } = e;
    const { errors } = this.state;

    const checked = validationHelper.checkAllFields(value, id, errors);

    this.setState({
      ...this.state,
      formValues: {
        ...this.state.formValues,
        [id]: value
      },
      errors: {
        ...this.state.errors,
        ...checked
      }
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const {
      formValues: { email, password }
    } = this.state;

    const { adminLoginAction, history } = this.props;

    await adminLoginAction({ email, password }, history);
  };

  render() {
    const {
      formValues: { email, password },
      errors
    } = this.state;

    const {
      admin: { isAdminLoginLoading }
    } = this.props;

    return (
      <>
        <div className="admin-login">
          <div className="admin-login-image">
            <img className="admin-login-logo" src={tudoLogo} alt="logo" />
            <img className="admin-login-logo_blue" src={tudoLogoBlue} alt="" />
            <img
              className="admin-login-logo_green"
              src={tudoLogoGreen}
              alt=""
            />
            <img className="admin-login-logo_pink" src={tudoLogoPink} alt="" />
          </div>
          <div className="admin-login-form">
            <div className="admin-login-form-body">
              <h2>Welcome</h2>
              <form onSubmit={e => this.handleSubmit(e)}>
                <div className="admin-login-form-body-container">
                  <label htmlFor="email">Email</label>
                  <input
                    className={
                      errors.email && "admin-login-form-body-errorBorder"
                    }
                    onChange={e => this.handleChange(e)}
                    type="email"
                    id="email"
                    value={email}
                    required={true}
                  />
                  {errors.email && (
                    <p className="admin-login-form-body-error">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="admin-login-form-body-container">
                  <label htmlFor="password">Password</label>
                  <input
                    className={
                      errors.password && "admin-login-form-body-errorBorder"
                    }
                    onChange={e => this.handleChange(e)}
                    type="password"
                    id="password"
                    value={password}
                    required={true}
                  />
                  {errors.password && (
                    <p className="admin-login-form-body-error">
                      {errors.password}
                    </p>
                  )}
                </div>
                <input
                  type="submit"
                  value="Log In"
                  className={
                    isAdminLoginLoading ? "admin-login-form-body-loading" : ""
                  }
                  disabled={isAdminLoginLoading}
                />
              </form>
              <Link to="#">Forgot Password?</Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ admin }) => {
  return {
    admin
  };
};

const mapDispatchToProps = dispatch => ({
  adminLoginAction: (data, history) => {
    dispatch(adminLogin(data, history));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);
