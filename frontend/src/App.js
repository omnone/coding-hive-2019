import React from 'react';
import './App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';

import Header from './components/layout/Header';
import Login from './components/login/Login';

//////////////////////////////////////////////////////////////////////////////////////

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

//////////////////////////////////////////////////////////////////////////////////////

  render() {
    return (
          <div className="App">
          <Header/>
          <Login/>
          </div>
    );
  }
}


//////////////////////////////////////////////////////////////////////////////////////

export default App;
