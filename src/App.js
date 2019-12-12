import React from 'react';
import * as firebase from "firebase/app";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Auth from './Components/Auth/Auth'
import Layout from './HOC/Layout/Layout'
import { Button, ButtonToolbar, ButtonGroup, Navbar } from 'shards-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

class App extends React.Component {
  state = {
    authenticated: false,
    user: null,
    menuopen: true
  }
  componentDidMount() {
    if (firebase.apps.length) {
      console.log("firebase.apps", firebase.apps.length)
      var user = firebase.auth().onAuthStateChanged((user) => {
        console.log("user: ", user);
        if (user) this.setState({ user: user.email })
      })
    }
  }
  authenticateUser = () => {
    console.log("authenticateUser was called");
    this.setState({ authenticated: true })
  }
  toggleMenu = () => {
    this.setState({ menuopen: !this.state.menuopen });
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/main">
              <Navbar expand="sm" className="navbar-main">
                <ButtonToolbar>
                  <ButtonGroup size="sm">
                    <Button theme="dark" onClick={this.toggleMenu}>
                      <FontAwesomeIcon icon={faBars} />
                    </Button>
                    <Button pill theme="dark">
                      {this.state.user}
                    </Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </Navbar>
              <Layout user={this.state.user} menuopen={this.state.menuopen} />
            </Route>
            <Route exact path="/">
              <Auth authenticateUser={this.authenticateUser} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
