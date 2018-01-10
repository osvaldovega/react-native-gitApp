import React, { Component } from 'react';
import { View, ListView, Text, ActivityIndicator, Image, TouchableHighlight } from 'react-native';
import moment from 'moment';
import { getAuthenticationInfo } from '../AuthService';
import PushPayload from '../PushPayload';
import styles from './styles';

export default class Feed extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource: ds,
      showProgress: true,
    };
  }

  componentDidMount() {
    this.fetchFeed();
  }

  handleDataSource = (values) => {
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(values) });
  }

  handleShowProgress = (value) => {
    this.setState({ showProgress: value });
  }

  fetchFeed = () => {
    getAuthenticationInfo((err, authInfo) => {
      if (err) {
        console.log(err);
        this.handleShowProgress(false);
        return;
      }

      const url = `https://api.github.com/users/${authInfo.user.login}/received_events`;
      const headers = {
        headers: authInfo.header,
      };

      fetch(url, headers)
      .then(response => response.json())
      .then(responseData => {
        const feedItems = responseData.filter(ev => ev.type === 'PushEvent');

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(feedItems),
          showProgress: false,
        });
      });
    });
  }

  onPressRow = (rowData) => {
    this.props.navigator.push({
      title: 'Push Event',
      component: PushPayload,
      passProps: {
        pushEvent: rowData,
      },
    });
  }

  renderRow = (rowData) => {
    return (
      <TouchableHighlight
        onPress={ () => this.onPressRow(rowData) }
        underlayColor='#ddd'
      >
        <View style={ styles.listViewRow }>
          <Image source={ { uri: rowData.actor.avatar_url } } style={ styles.avatar } />
          <View style={ styles.listViewRowData }>
            <Text style={ styles.alistViewRowData }>
              {moment(rowData.actor.created_at).fromNow()}
            </Text>
            <Text style={ styles.alistViewRowData }>
              {rowData.actor.login} pushed to
            </Text>
            <Text style={ styles.alistViewRowData }>
              {rowData.payload.ref.replace('refs/heads', '')}
            </Text>
            <Text style={ styles.alistViewRowData }>
              at <Text style={{ fontWeight: 600 }}>{rowData.repo.name}</Text>
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const { dataSource, showProgress } = this.state;

    if (showProgress) {
      return (
        <View style={ styles.loader }>
          <ActivityIndicator size="large" animating />
        </View>
      );
    }

    if (dataSource._cachedRowCount !== 0) {
      return (
        <View style={ styles.container }>
          <ListView
            dataSource={ dataSource }
            renderRow={ this.renderRow } />
        </View>
      );
    } else {
      return (
        <View style={ styles.emptyState }>
          <Text>No feeds!</Text>
        </View>
      );
    }
    
  }
}
