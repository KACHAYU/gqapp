import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  StackNavigator
} from 'react-navigation';

import ArticleScreen from './screen/ArticleScreen';
import Home from './component/Home';

class HomeScreen extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      navigation : this.props.navigation,
      cid : 2,
      title : '单品搭配'
    };

  }

  static navigationOptions = ({navigation}) => ({
    title: '单品搭配'
  })

  render() {
    return (
      <Home nav = {this.state.navigation} cid = {this.state.cid} ></Home>
    );
  }
}

//主导航
const navigation = StackNavigator({
  Home:{
    screen: HomeScreen
  },
  Detail:{
    screen: ArticleScreen
  }
});

AppRegistry.registerComponent('gqapp', () => navigation);
