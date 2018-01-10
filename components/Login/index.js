import React, { Component } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import gitLogin from '../AuthService';
import loginStyles from './styles';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      showProgress: false,
      err: null,
    };
  }

  usernameHandler = (text) => {
    this.setState({ username: text });
  }

  passwordHandler = (text) => {
    this.setState({ password: text });
  }

  errorHandler = (err) => {
    this.setState({ err });
  }

  showProgressToggle = () => {
    this.setState({ showProgress: !this.state.showProgress });
  }

  onLoginPressed = () => {
    const { username, password } = this.state;
    const { onLogin } = this.props;

    this.showProgressToggle();
    this.errorHandler(null);

    gitLogin(username, password)
    .then(() => {
      this.errorHandler(null);
      this.showProgressToggle();
      onLogin();
    })
    .catch(error => {
      this.errorHandler(error);
      this.showProgressToggle();
    });
  }

  renderErrorMessage = () => {
    const { err } = this.state;
    let errorCtrl = <View />;

    if (err && err.badCredentials) {
      errorCtrl = <Text style={ loginStyles.error }>The username or password are incorrect!</Text>;
    } else if (err && err.unknownError) {
      errorCtrl = <Text style={ loginStyles.error }>We experienced an unexpected error!</Text>;
    }

    return errorCtrl;
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={ loginStyles.container }>
        <Image style={ loginStyles.logo } source={ require('../../assets/images/Octocat.png') } />

        <Text style={ loginStyles.heading }>Github Browser</Text>

        <TextInput
          onChangeText={ this.usernameHandler }
          autoCapitalize='none'
          placeholder='Github username'
          placeholderTextColor='rgba(255, 255, 255, 0.7)'
          maxLength={ 50 }
          returnKeyType='next'
          keyboardType='email-address'
          onSubmitEditing={(ev) => this.refs.passwordInput.focus()}
          style={ loginStyles.input } />

        <TextInput
          onChangeText={ this.passwordHandler }
          autoCapitalize='none'
          placeholder='Github password'
          placeholderTextColor='rgba(255, 255, 255, 0.7)'
          maxLength={ 20 }
          returnKeyType='go'
          secureTextEntry
          clearTextOnFocus
          ref='passwordInput'
          style={ loginStyles.input } />

        <TouchableOpacity
          onPress={ this.onLoginPressed }
          style={ loginStyles.button }>
          <Text style={ loginStyles.buttonText }>Log In</Text>
        </TouchableOpacity>

        { this.renderErrorMessage() }

        <ActivityIndicator
          animating={ this.state.showProgress }
          size="large"
          style={ loginStyles.loader }/>
      </KeyboardAvoidingView>
    );
  }
}
