import React, { Component } from 'react';
import { View, ListView, Text, Image } from 'react-native';
import moment from 'moment';
import styles from './styles';

export default class PushPayload extends Component {
  constructor(props){
    super(props);

    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2,
    });

    this.state = {
      dataSource: ds.cloneWithRows(props.pushEvent.payload.commits),
      pushEvent: props.pushEvent,
    };
  }

  renderRow = (rowData) => {
    return(
      <View style={ styles.listViewRow }>
        <Text>
          <Text style={ styles.bold }>{rowData.sha.substring(0, 6)}</Text> - {rowData.message}
        </Text>
      </View>
    );
  }

  render(){
    return (
      <View style={ styles.container }>
        <Image
          source={{ uri: this.state.pushEvent.actor.avatar_url }}
          style={ styles.avatar } />

        <Text style={ styles.careatAt }>{moment(this.state.pushEvent.created_at).fromNow()}</Text>
        <Text><Text style={ styles.bold }>{this.state.pushEvent.actor.login}</Text> pushed to</Text>
        <Text><Text style={ styles.bold }>{this.state.pushEvent.payload.ref.replace('refs/heads/', '')}</Text></Text>
        <Text>at <Text style={ styles.bold }>{this.state.pushEvent.repo.name}</Text></Text>
        <Text style={ styles.commintsLength }>{this.state.pushEvent.payload.commits.length} Commits</Text>

        <ListView
          contentInset={{ top: -50 }}
          dataSource={ this.state.dataSource }
          renderRow={ this.renderRow } />
      </View>
    );
  }
}
