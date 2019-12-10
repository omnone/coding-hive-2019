import React, { Component } from "react";
import Home from "../Home";
import Message from "../layout/Message";

//////////////////////////////////////////////////////////////////////////////////////

export class Login extends Component {
  state = {
    username: "",
    password: "",
    isAuthenticated: false,
    open: false,
    failed: false
  };

  //////////////////////////////////////////////////////////////////////////////////////
  //Methods

  login = () => {
    const user = {
      username: this.state.username,
      password: this.state.password
    };

    fetch("/api/auth", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);

        const jwtToken = responseData["jwt"];
        console.log(jwtToken);

        if (typeof jwtToken !== "undefined" && jwtToken !== null) {
          localStorage.setItem("jwt", jwtToken);
          this.setState({ isAuthenticated: true });
        } else {
          this.setState({ open: true, failed: true });
        }
      })
      .catch(err => console.error(err));
  };

  handleChange = e =>
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      function() {
        console.log(
          JSON.stringify({
            username: this.state.username,
            password: this.state.password
          })
        );
      }
    );

  logout = () => {
    this.setState({ isAuthenticated: false });
    localStorage.removeItem("jwt");
  };

  //////////////////////////////////////////////////////////////////////////////////////
  //Render
  render() {
    let mess;

    if (this.state.isAuthenticated === true) {
      return <Home value={this.logout} />;
    } else if (this.state.failed === true) {
      mess = (
        <article class="message is-danger">
          <div class="message-header">
            <p>Η Σύνδεση σας απέτυχε!</p>
            <button class="delete" aria-label="delete"></button>
          </div>
          <div class="message-body">
             Τα στοιχεία που δώσατε είναι λανθασμένα! Παρακαλώ δοκιμάστε ξανά.
          </div>
        </article>
      );
    }

    return (
      <div id="login">
        {mess}

        <div
          className="container has-text-centered"
          style={{ paddingTop: "3%" }}
        >
          <div className="column is-4 is-offset-4">
            <h3 className="title has-text-black">Login</h3>
            <hr className="login-hr" />
            <p className="subtitle has-text-black">Please login to proceed.</p>
            <div className="box">
              <div className="field">
                <div className="control has-icons-left">
                  <input
                    className="input is-medium"
                    onChange={this.handleChange}
                    type="text"
                    name="username"
                    placeholder="Your Username"
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-user"></i>
                  </span>
                </div>
              </div>

              <div className="field">
                <div className="control has-icons-left">
                  <input
                    className="input is-medium"
                    onChange={this.handleChange}
                    type="password"
                    name="password"
                    placeholder="Your Password"
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-lock"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="checkbox">
                  <input type="checkbox" />
                  Remember me
                </label>
              </div>
              <input
                type="submit"
                name="submit"
                className="button is-block is-info is-medium is-fullwidth"
                onClick={this.login}
                value="Login"
              />
            </div>
            <p className="has-text-grey">
              <a href="../">Sign Up</a> &nbsp;·&nbsp;
              <a href="../">Forgot Password</a> &nbsp;·&nbsp;
              <a href="../">Need Help?</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
