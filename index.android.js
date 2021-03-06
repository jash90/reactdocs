import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Button,
  WebView,
  Dimensions,
  View
} from 'react-native';

import MyWebView from 'react-native-webview-autoheight';
import JSSoup from 'jssoup';
import ListVersions from './ListVersions';
export default class ReactDocs extends Component {
  constructor(props) {
  super(props);
  this.state = {
    html : 'ASDAS',
    url : '',
    text :''
  };
}
componentWillMount() {
  fetch('https://facebook.github.io/react-native/docs/webview.html',{
      method: 'GET',
  })
    .then(response => {
      response.text().then(function(responseText) {
         var soup = new JSSoup(responseText);
         var t = soup.find('div','inner-content').text;
         console.log(t)
      })


        // var patt1 = /0\56\d\d/g;
        // var result = soup.text.match(patt1);
        // console.log(result);
        // var versions ='';
        // for (var i =0; i<result.length;i++){
        //   versions+=result[i]+'\n';
        // }

//        while (soup.findAll('th').text!=undefined){
      //  this.setState({text :response._bodyText});
//        }
      })
      .catch((error) => {
          console.error(error);
      })
      .done();

}

  render() {
    return (
      <View style={styles.container}>
      <WebView
       source={{html: this.state.text}}
       style={{marginTop: 20}}
     />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection : 'column',
    flex:1,
    marginLeft: 5,
    marginRight: 5,
    marginBottom :5,
    alignItems :'center',
  },
  searchView: {
    flexDirection : 'row',
  },
  text: {
    flex:3,
  },
  button :{
    flex:1,
    justifyContent : 'center'
  },
  webView: {
    marginTop:16,
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
    width: Dimensions.get('window').width,
  },
});

AppRegistry.registerComponent('ReactDocs', () => ReactDocs);
