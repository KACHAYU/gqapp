import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Article from './../component/Article'

export default class ArticleScreen extends Component {

  constructor(props){
    super(props);
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.data.title
  })
  
  render() {
  	const {data} = this.props.navigation.state.params;
    //console.log(data)
    return (
      <Article data = {data} ></Article>
    );
  }
}


