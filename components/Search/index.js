import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import SearchResults from '../SearchResults';
import styles from './styles';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
    };
  }

  onSearchPressed = () => {
    this.props.navigator.push({
      component: SearchResults,
      title: 'Results',
      passProps: {
        searchQuery: this.state.searchQuery,
      },
    });
  }

  handleSearchQuery = (value) => {
    this.setState({ searchQuery: value });
  }

  render() {
    return (
      <View style={ styles.container }>
        <TextInput
          onChangeText={ (text)=> this.handleSearchQuery(text) }
          style={ styles.input }
          autoCapitalize='none'
          placeholder='Search Query' />

        <TouchableHighlight
          onPress={ () => this.onSearchPressed() }
          underlayColor='#1abc9c'
          style={ styles.button }>
          <Text style={ styles.buttonText }>Search</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
