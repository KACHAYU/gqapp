import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  FlatList
} from 'react-native';

export default class Home extends Component {
  constructor(props){
	super(props);
	this.state = {
		data: []
	}
  }

  componentWillMount(){
	fetch('http://gq24v4.test.gq.com.cn/gq24/api40/getariticlebychannelid?channel=' + this.props.cid)
	.then(response => response.json())
	.then(function(data){
		this.setState({
			data:data.data
		});
	}.bind(this));
  }
  
  renderItem(data){
  	const {navigate} = this.props.nav;

	return 	<TouchableWithoutFeedback onPress={()=>navigate('Detail',{data:data})} >
				<View style={styles.item}>
					<Image source={{uri:data.coverimg}} style={styles.image}/>
					<Text style={styles.title}>{data.title}</Text>
				</View>
			</TouchableWithoutFeedback>
  }

  render() {
  	
	//console.log(this.state.data)
    return (
	  <FlatList data={this.state.data} renderItem={({item}) => this.renderItem(item)} />
    );
  }
}

const styles = StyleSheet.create({
  item:{
  	flex:1,
  	backgroundColor:'white',
  	padding:10,
  	marginTop:10,
  	marginLeft:10,
  	marginRight:10
  },
  image:{
  	height:300
  },
  title:{
  	fontSize:22,
  	lineHeight:30,
  	color:'black',
  	textAlign:'center',
  	paddingTop:20,
  	paddingLeft:10,
  	paddingRight:10,
  	paddingBottom:10
  }
});

