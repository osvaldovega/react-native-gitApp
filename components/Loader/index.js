import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import loaderStyles from './styles';

export default class Loader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={ loaderStyles.container }>
          <ActivityIndicator
            animating={ true }
            size="large"
            style={ loaderStyles.loader }/>
        </View>
    );
  }
}
