import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  WebView
} from 'react-native';

export default class Home extends Component {
  constructor(props){
  	super(props);
  	this.state = {
  		data: {},
      height:0
  	}
  }

  componentWillMount(){
    const numid = this.props.data.numid;
  	fetch('http://gq24v4.test.gq.com.cn/gq24/api/article?article_id=' + numid)
  	.then(response => response.json())
  	.then(function(data){

  		this.setState({
  			data:data.articleInfo
  		});

  	}.bind(this));
    //console.log(this.props.data)
  }

  render() {
    const {template} = this.state.data;
    //const template = "http://www.baidu.com";
    let tpl = template || '';
        tpl = tpl.replace(/<\/title>/g,'<\/title><script>window.onload=function(){document.title = document.body.clientHeight;}<\/script>');
    //console.log(tpl);
    return (
      <ScrollView style = {styles.container} >
        <Image source = {{uri:this.state.data.thumbnail_image}} style = {styles.thumbnail} />
        <View style = {styles.column}>
          <Text style = {styles.conlumnText}>{this.props.data.colname}</Text>
        </View>
        <View style = {styles.title}>
          <Text style = {styles.titleText}>{this.props.data.title}</Text>
        </View>
        <WebView 
          source = {{html:template}} 
          style  = {{height:this.state.height,flex:1}} 
          onNavigationStateChange = {(title) =>{
            this.setState({
              height:500
            });
            //console.log(title.title)
          }} 
          ref = {(ref) => this.webview = ref} 
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white'
  },
  thumbnail:{
    height:250
  },
  column:{
    backgroundColor:'red',
    height:25,
    paddingLeft:10,
    paddingRight:10,
    alignSelf:'center',
    flexDirection:'row',
    alignItems:'center',
    marginBottom:20
  },
  conlumnText:{
    color:'white',
    fontWeight:'bold',
    fontSize:14
  },
  title:{
    alignSelf:'center',
    flexDirection:'row',
    alignItems:'center',
    marginLeft:20,
    marginRight:20
  },
  titleText:{
    color:'black',
    fontSize:22,
    fontWeight:'bold',
    lineHeight:30
  },
  webview:{
    flex:1,
    height:6000
  }
});

