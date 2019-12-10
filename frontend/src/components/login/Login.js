import React, { Component } from 'react'
import Home from '../Home'

//////////////////////////////////////////////////////////////////////////////////////

export class Login extends Component {

    state = {username: '', password: '', isAuthenticated: false, open: false};

//////////////////////////////////////////////////////////////////////////////////////
//Methods

    login = () => {  

        const user = {username: this.state.username, password: this.state.password};    

        fetch('/api/auth', {    
            method: 'POST', 
             headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
            } ,
            body: JSON.stringify(user)    
        })    
        .then((response) => response.json())    
        .then((responseData) => {    
           console.log(responseData)

           const jwtToken = responseData['jwt'];    

            if (jwtToken !== null) {    

                sessionStorage.setItem("jwt", jwtToken);    
                this.setState({isAuthenticated: true});    
            }    
            else {    
                this.setState({open: true});    
            }    
        })    
            .catch(err => console.error(err))    
       
    };  

    handleChange = (e) => this.setState({
        [e.target.name] : e.target.value
    }, function () {
        console.log(JSON.stringify({username: this.state.username, password: this.state.password}) );
    });

logout = () =>{
    this.setState({isAuthenticated: false});
    sessionStorage.removeItem("jwt");
}

//////////////////////////////////////////////////////////////////////////////////////
//Render
    render() {
        if (this.state.isAuthenticated === true || sessionStorage.getItem("jwt")) {    
            return (<Home value={this.logout}/>);    
        }    
        else {   
        return (
            <div id="login">
                <div className="container has-text-centered" style ={{paddingTop:'3%'}}>
                <div className="column is-4 is-offset-4">
                    <h3 className="title has-text-black">Login</h3>
                    <hr className="login-hr"/>
                    <p className="subtitle has-text-black">Please login to proceed.</p>
                    <div className="box">
                            <div className="field">
                                <div className="control has-icons-left">
                                    <input className="input is-medium" onChange={this.handleChange} type="text" name="username" placeholder="Your Username" />
                                    <span className="icon is-small is-left">
                                         <i className="fa fa-user"></i>
                                    </span>
                                </div>
                            </div>

                            <div className="field">
                                <div className="control has-icons-left">
                                    <input className="input is-medium" onChange={this.handleChange} type="password" name="password" placeholder="Your Password"/>
                                    <span className="icon is-small is-left">
                                         <i className="fa fa-lock"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <label className="checkbox">
                                <input type="checkbox"/>
                                Remember me
                                </label>
                            </div>
                            <input type="submit" name="submit"  className="button is-block is-info is-medium is-fullwidth" onClick={this.login} value="Login"/>
                    </div>
                    <p className="has-text-grey">
                        <a href="../">Sign Up</a> &nbsp;·&nbsp;
                        <a href="../">Forgot Password</a> &nbsp;·&nbsp;
                        <a href="../">Need Help?</a>
                    </p>
                </div>
            </div>
            </div>
        )
    }
}
}

export default Login
