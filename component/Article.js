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
      scaleAnimHeight:new Animated.Value(250),
      scaleAnim :new Animated.Value(1),
      scrollY:0,
      scrollFlag:true,
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

  animateCallback(){
    setTimeout(function(){
      this.setState({
        scrollFlag:true
      });
    }.bind(this), 600);
  }

  scrollTop(e) {
    let t = e.nativeEvent.contentOffset.y;
    if(t< 0 && this.state.scrollFlag){

      this.setState({
        scrollFlag:false
      });

      Animated.sequence([
        Animated.parallel([
          Animated.timing(
            this.state.scaleAnimHeight,
            {
              toValue:300,
              duration:200
            }
          ),
          Animated.timing(
            this.state.scaleAnim,
            {
              toValue:1.3,
              duration:250
            }
          ),
        ]),
        Animated.parallel([
          Animated.timing(
            this.state.scaleAnimHeight,
            {
              toValue:250,
              duration:200
            }
          ),
          Animated.timing(
            this.state.scaleAnim,
            {
              toValue:1,
              duration:250
            }
          ),
        ])
      ]).start(() => this.animateCallback());
    }
    
    let y = t < 0 ? 0 : t >250? -250 : -t;
    
    this.setState({
      scrollY : y
    }); 
    
    //console.log(t)
  }

  render() {
    const {template} = this.state.data;
    
    return (
      <View>
        <Animated.View style = {{
          backgroundColor:'white',
          overflow:'hidden',
          height:this.state.scaleAnimHeight,
          transform:[{translateY:this.state.scrollY}]
        }} >
          <Animated.Image source = {{uri:this.state.data.thumbnail_image}} style = {{
            height:250,
            transform:[{scale:this.state.scaleAnim}]
          }} />
        </Animated.View>
        <ScrollView style = {{
          backgroundColor:'white',
          transform:[{translateY:this.state.scrollY}]
        }} onScroll = {(e)=>this.scrollTop(e)} 
        scrollEventThrottle={1} >
          <View style = {styles.column}>
            <Text style = {styles.conlumnText}>{this.props.data.colname}</Text>
          </View>
          <View style = {styles.title}>
            <Text style = {styles.titleText}>{this.props.data.title}</Text>
          </View>
          <WebView 
            source = {{html:template}} 
            style  = {{
              height:this.state.height,
              flex:1,
              marginLeft:20,
              marginRight:20
            }} 
            onNavigationStateChange = {(title) =>{
              this.setState({
                height:3000
              });
              //console.log(title.title)
            }} 
            ref = {(ref) => this.webview = ref} 
          />
        </ScrollView>
      </View>
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

