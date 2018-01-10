import React, { Component } from 'react';
import { View, Text, ListView, ActivityIndicator, Image, TouchableHighlight } from 'react-native';
import Loader from '../Loader';
import styles from './styles';

export default class SearchResults extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    this.state = {
      dataSource: ds,
      showProgress: true,
      searchQuery: props.searchQuery,
    };
  }

  componentDidMount() {
    this.doSearch();
  }

  doSearch = () => {
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(this.state.searchQuery)}`;

    fetch(url)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        repositories: responseData.repositories,
        dataSource: this.state.dataSource.cloneWithRows(responseData.items)
      });
    })
    .finally(()=> {
      this.setState({ showProgress: false });
    });
  }

  renderRow = (rowData) => {
    return (
      <View style={ styles.listViewRow }>
        <Text style={ styles.fullName }>{rowData.full_name}</Text>
          <View style={ styles.listViewRowWrapper }>
            <View style={styles.repoCell}>
              <Image source={require('../../assets/images/star.png')} style={styles.repoCellIcon} />
              <Text style={styles.repoCellLabel}>{rowData.stargazers_count}</Text>
            </View>
            <View style={styles.repoCell}>
              <Image source={require('../../assets/images/fork.png')} style={styles.repoCellIcon} />
              <Text style={styles.repoCellLabel}>{rowData.forks}</Text>
            </View>
            <View style={styles.repoCell}>
              <Image source={require('../../assets/images/issues2.png')} style={styles.repoCellIcon} />
              <Text style={styles.repoCellLabel}>{rowData.open_issues}</Text>
            </View>
          </View>
      </View>
    );
  }

  render() {
    const { showProgress } = this.state;

    if(showProgress) {
      return (
        <Loader />
      );
    }

    return (
      <View style={ styles.container }>
        <ListView
          dataSource={ this.state.dataSource }
          renderRow={ this.renderRow } />
      </View>
    );
  }
}
