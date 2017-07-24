import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Animated,
  WebView
} from 'react-native';

export default class Home extends Component {
  constructor(props){
  	super(props);
  	this.state = {
  		data: {},
      scaleAnim:new Animated.Value(1),
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

  scrollTop(e) {
    let t = e.nativeEvent.contentOffset.y;
    if(t< 0){
      Animated.sequence([
        Animated.timing(
          this.state.scaleAnim,
          {
            toValue:1.3,
            duration:350
          }
        ),
        Animated.timing(
          this.state.scaleAnim,
          {
            toValue:1,
            duration:350
          }
        )
      ]).start();
    }
    console.log(t)
  }

  render() {
    const {template} = this.state.data;
    
    return (
      <ScrollView style = {styles.container} onScroll = {(e)=>this.scrollTop(e)}>
        <View style = {styles.thumbnail}>
        <Animated.Image source = {{uri:this.state.data.thumbnail_image}} style = {{
          height:250,
          transform:[{scale:this.state.scaleAnim}]
        }} />
        </View>
        <View style = {styles.column}>
          <Text style = {styles.conlumnText}>{this.props.data.colname}</Text>
        </View>
        <View style = {styles.title}>
          <Text style = {styles.titleText}>{this.props.data.title}</Text>
        </View>
        <WebView 
          source = {{html:template}} 
          style  = {{height:this.state.height,flex:1,marginLeft:20,marginRight:20}} 
          onNavigationStateChange = {(title) =>{
            this.setState({
              height:3000
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
    height:250,
    overflow:'hidden'
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

