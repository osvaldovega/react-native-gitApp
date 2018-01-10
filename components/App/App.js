import React, { Component } from 'react';
import { getAuthenticationInfo } from '../AuthService';
import Login from '../Login';
import AppContainer from '../AppContainer';
import Loader from '../Loader';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogged: false,
      checkingAuth: true,
    };
  }

  componentDidMount() {
    getAuthenticationInfo((err, authInfo) => {
      this.setState({
        checkingAuth: false,
        isLogged: authInfo !== undefined,
      });
    });
  }

  onLogin = () => {
    this.setState({ isLogged: !this.state.isLogged });
  }

  render() {
    const { isLogged, checkingAuth } = this.state;

    if (checkingAuth) {
      return (
        <Loader />
      );
    }

    if (isLogged) {
      return (
        <AppContainer />
      );
    } else {
      return (
        <Login onLogin={ this.onLogin } />
      );
    }
  }
}
