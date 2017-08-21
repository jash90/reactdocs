import React, { Component } from 'react';
import { ListView, StyleSheet,TouchableHighlight, View, Text,Image, Alert, Dimensions,ScrollView,WebView} from 'react-native';
import MyWebView from 'react-native-webview-autoheight';
import JSSoup from 'jssoup';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
class ListVersions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource : ds,
            data : [],
            page : 1,
            maxPage : 0,

        };
    }


    componentWillMount()  {
      fetch('https://facebook.github.io/react-native/versions.html',{
          method: 'GET',
      })
          .then((response) => {
            var soup = new JSSoup(response._bodyText);
            var t ="";
            var t = soup.find('table .versions'.text).nextElement.text;

            var patt1 = /0\56\d\d/g;
            var result = soup.text.match(patt1);
            console.log(result);
            var versions ='';
            for (var i =0; i<result.length;i++){
              versions+=result[i]+'\n';
            }

    //        while (soup.findAll('th').text!=undefined){
            this.setState({dataSource : ds.cloneWithRows(result)});
    //        }
          })
          .catch((error) => {
              console.error(error);
          })
          .done();

    }

    render() {
        return (
          <ScrollView>
            <ListView
                automaticallyAdjustContentInsets={ false }
                dataSource={this.state.dataSource}
                renderRow={(data, secId, rowId, rowMap)=>this.renderRow(data, secId, rowId, rowMap)}
            />
          </ScrollView>
        );
    }


    gethtmldocs(data){
      fetch('https://facebook.github.io/react-native/versions.html',{
          method: 'GET',
      })
          .then((response) => {
            var soup = new JSSoup(response._bodyText);
            var t ="";
            var t = soup.find('table .versions'.text).nextElement.text;

            var patt1 = /0\56\d\d/g;
            var result = soup.text.match(patt1);
            console.log(result);
            var versions ='';
            for (var i =0; i<result.length;i++){
              versions+=result[i]+'\n';
            }

    //        while (soup.findAll('th').text!=undefined){
            this.setState({dataSource : ds.cloneWithRows(result)});
    //        }
          })
          .catch((error) => {
              console.error(error);
          })
          .done();
}

    renderRow(data, secId, rowId, rowMap) {
            if (rowId == 0){
                  return(
                    <View style={{width :Dimensions.get('window').width}}>
                      <Text style={{textAlign: 'left', fontWeight : 'bold'}}>{data+" Stable"}</Text>
                      <ScrollView>
                      <WebView
                      source={{uri: 'http://facebook.github.io/react-native/releases/'+data+'/docs/webview.html'}}
                      style={{marginTop: 20}}
                      />
                      </ScrollView>
                    </View>
                  );
              }
            else if (rowId==1){
                return(
                  <View style={{width : Dimensions.get('window').width}}>
                      <Text style={{textAlign: 'left', fontWeight : 'bold'}}>{data+" Experimental"}</Text>
                      <ScrollView>
                      <MyWebView
                      source={{uri: 'http://facebook.github.io/react-native/releases/'+data+'/docs/webview.html'}}
                      style={{marginTop: 20}}
                      />
                      </ScrollView>
                  </View>
                );
            }
          else{
            return(
              <View style={{width : Dimensions.get('window').width}}>
                  <Text style={{textAlign: 'left', fontWeight : 'bold'}}>{data}</Text>
                  <View>
                  <MyWebView
                  source={{uri: 'http://facebook.github.io/react-native/releases/'+data+'/docs/webview.html'}}
                  style={{marginTop: 20}}
                  />
                  </View>
              </View>
            );
          }
    }


}

export default ListVersions;
