import React, { Component } from "react";
import Home from "../Home";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ErrorIcon from "@material-ui/icons/Error";
import Alert from "react-bootstrap/Alert";

import $ from "jquery";

//////////////////////////////////////////////////////////////////////////////////////

export class Login extends Component {
  //state of main component
  state = {
    username: "",
    password: "",
    userId: "",
    isAuthenticated: false,
    open: false,
    status: 1,
    isCreateState: false,
    isUpdateState: false,
    isSearchState: true
  };

  constructor(props) {
    super(props);
    this.state = {
      permissions_pr: [],
      username: "",
      password: "",
      userId: "",
      isAuthenticated: false,
      open: false,
      status: 1,
      isCreateState: false,
      isUpdateState: false,
      isSearchState: true
    };
    this.myRef = React.createRef();
  }

  //persist login parameters after a refresh
  componentDidMount() {
    let auth = localStorage.getItem("isAuthenticated");

    //the user is authenticated so get all auth parameters from localStorage
    if (auth === "true") {
      let perms = localStorage.getItem("permissions");
      this.setState({
        isAuthenticated: true,
        username: localStorage.getItem("username"),
        userId: localStorage.getItem("userId"),
        permissions_pr: JSON.parse(perms)
      });
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////
  //Functions
  //handle login process
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

        if (responseData["status"] !== 403) {
          //user successfully logged in

          //save all authentications parameters to localStorage
          const permissions = responseData["user"].permission;
          const jwtToken = responseData["jwt"];

          localStorage.setItem("jwt", jwtToken);
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("username", this.state.username);
          localStorage.setItem("userId", responseData["user"].userId);
          localStorage.setItem("permissions", JSON.stringify(permissions));

          this.setState({
            isAuthenticated: true,
            permissions_pr: permissions,
            userId: responseData["user"].userId
          });
          console.log(this.state.permissions_pr + "perms");
        } else {
          //user failed to loggin
          this.setState({ open: true, status: responseData["status"] });
          localStorage.setItem("isAuthenticated", false);
          $("#password").attr("error", true);
          // document.getElementById("password").
        }
      })
      .catch(err => console.error(err));
  };

  // -------------------------------------------------------------------------
  //set state for username and password
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

  // -------------------------------------------------------------------------
  //if user is logging out remove jwt token from storage
  logout = () => {
    this.setState({
      permissions_pr: [],
      username: "",
      password: "",
      userId: "",
      isAuthenticated: false,
      open: false,
      status: 1,
      isCreateState: false,
      isUpdateState: false,
      isSearchState: true
    });

    localStorage.clear();
    localStorage.removeItem("jwt");
  };

  // -------------------------------------------------------------------------
  //clear login forms fields
  clearFields = () => {
    this.setState({
      username: "",
      password: ""
    });

    document.getElementById("password").value = "";
    document.getElementById("username").value = "";
  };
  // -------------------------------------------------------------------------

  createIssue = () => {
    this.setState({
      isCreateState: true,
      isSearchState: false,
      isUpdateState: false
    });
  };
  // -------------------------------------------------------------------------

  searchIssue = () => {
    this.setState({
      isCreateState: false,
      isSearchState: true,
      isUpdateState: false
    });
  };
  // -------------------------------------------------------------------------

  updateIssue = () => {
    this.setState({
      isCreateState: false,
      isSearchState: false,
      isUpdateState: true
    });
  };

  //////////////////////////////////////////////////////////////////////////////////////
  //Render
  render() {
    let mess;

    if (this.state.isAuthenticated === true) {
      //user is authenticated
      this.state.status = 1;

      //return home component with user parameters
      return (
        <Home
          value={this.logout}
          username={this.state.username}
          id={this.state.userId}
          create={this.createIssue}
          search={this.searchIssue}
          update={this.updateIssue}
          isCreate={this.state.isCreateState}
          isSearch={this.state.isSearchState}
          isUpdate={this.state.isUpdateState}
          permissions={this.state.permissions_pr}
        />
      );
    } else if (this.state.status === 403) {
      //user failed login , show proper message
      mess = (
        <Alert
          variant="danger"
          style={{
            backgroundColor: "rgb(248, 215, 218)"
          }}
        >
          <ErrorIcon /> Η σύνδεση απέτυχε! Παρακαλώ δοκιμάστε ξανά.
        </Alert>
      );
    }

    //return login page
    return (
      <div id="login">
        <div
          className="container has-text-centered"
          style={{
            backgroundColor: "rgba(0,0, 0, 0.4)",
            borderRadius: "7px",
            padding: "10px",
            marginTop: "3%",
            width: "30%"
          }}
        >
          <div
            className="column is-full"
            style={{
              marginTop: "5%",
              marginBottom: "3%",
              backgroundColor: "white",
              borderRadius: "7px",
              witdh: "100%"
            }}
          >
            <h3 className="title has-text-black">Login</h3>
            <hr className="login-hr" />
            <p className="subtitle has-text-black">Please login to proceed.</p>
            <p> {mess}</p>
            <div className="box">
              <div className="field">
                <div className="control has-icons-left">
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={this.handleChange}
                    error={this.state.status === 403}
                  />
                </div>
              </div>

              <div className="field">
                <div className="control has-icons-left">
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="password"
                    error={this.state.status === 403}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <Button onClick={this.clearFields}>Clear</Button>
              </div>
              <input
                type="submit"
                name="submit"
                className="button is-block is-info is-medium is-fullwidth"
                onClick={this.login}
                value="Login"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////
export default Login;
