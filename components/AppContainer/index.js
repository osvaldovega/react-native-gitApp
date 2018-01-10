import React, { Component } from 'react';
import { Text, TabBarIOS, NavigatorIOS } from 'react-native';
import Feed from '../Feed';
import Search from '../Search';
import appContainerStyles from './styles';

export default class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'feed',
    };
  }

  handleTabBarItemChange = (value) => {
    this.setState({ selectedTab: value });
  }

  render() {
    const { selectedTab } = this.state;

    return (
      <TabBarIOS style={ appContainerStyles.container }>
        <TabBarIOS.Item
          title="Feed"
          selected={ selectedTab === 'feed' }
          icon={ require('../../assets/images/inbox.png') }
          onPress={ () => this.handleTabBarItemChange('feed') }>
          
          <NavigatorIOS
            style={{ flex: 1 }}
            initialRoute={{
              component: Feed,
              title: 'Feed'
            }}
          />
        </TabBarIOS.Item>
        
        <TabBarIOS.Item
          title="Search"
          selected={ selectedTab === 'search' }
          icon={ require('../../assets/images/search.png') }
          onPress={ () => this.handleTabBarItemChange('search') }>
          
          <NavigatorIOS
            style={{ flex: 1 }}
            initialRoute={{
              component: Search,
              title: 'Search'
            }}
          />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}
