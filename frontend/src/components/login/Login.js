import React, { Component } from "react";
import Home from "../Home";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ErrorIcon from "@material-ui/icons/Error";

//////////////////////////////////////////////////////////////////////////////////////

export class Login extends Component {
  //state of main component
  state = {
    username: "",
    password: "",
    isAuthenticated: false,
    open: false,
    status: 1,
    isCreateState: false,
    isSearchState: true
  };

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  //persist login parameters after a refresh
  componentDidMount() {
    let auth = localStorage.getItem("isAuthenticated");

    if (auth === "true") {
      this.setState({
        isAuthenticated: true,
        username: localStorage.getItem("username")
      });
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////
  //Methods

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

        const jwtToken = responseData["jwt"];
        console.log(jwtToken);

        if (typeof jwtToken !== "undefined" && jwtToken !== null) {
          localStorage.setItem("jwt", jwtToken);
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("username", this.state.username);
          this.setState({ isAuthenticated: true });
        } else {
          this.setState({ open: true, status: responseData["status"] });
          localStorage.setItem("isAuthenticated", false);
        }
      })
      .catch(err => console.error(err));
  };

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

  //if user is logging out remove jwt token from storage
  logout = () => {
    this.setState({ isAuthenticated: false });
    localStorage.removeItem("jwt");
  };

  //clear login forms fields
  clearFields = () => {
    this.setState({
      username: "",
      password: ""
    });

    document.getElementById("password").value = "";
    document.getElementById("username").value = "";
  };

  createIssue = () => {
    this.setState({
      isCreateState:true,
      isSearchState:false
    });
  }

  searchIssue = () => {
    this.setState({
      isCreateState:false,
      isSearchState:true
    });
  }

  //////////////////////////////////////////////////////////////////////////////////////
  //Render
  render() {
    let mess;

    if (this.state.isAuthenticated === true) {
      this.state.status = 1;
      return <Home 
               value={this.logout} 
               username={this.state.username}  
               create={this.createIssue}
               search= {this.searchIssue}
               isCreate = {this.state.isCreateState}
               isSearch = {this.state.isSearchState}
               />;
    } else if (this.state.status === 403) {

      //Login failed message
      mess = (
        <article className="message is-danger">
          <div className="message-header">
            <p>
              <ErrorIcon /> Η σύνδεση σας απέτυχε!
            </p>
          </div>
          <div className="message-body">
            Τα στοιχεία που δώσατε είναι λανθασμένα! Παρακαλώ δοκιμάστε ξανά.
          </div>
        </article>
      );
    }

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

export default Login;
