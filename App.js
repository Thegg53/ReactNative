import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator, ListItem } from 'react-native';
import { Constants } from 'expo';

export default class App extends React.Component {




constructor(props) {
      super(props);
      this.state = {
       isLoading: true,
       d: [],
       episodes: []
      };
    }


componentDidMount(){

////working
//    return fetch('http://10.0.2.2:3001/episodes/49288') //https://stackoverflow.com/questions/5528850/how-to-connect-localhost-in-android-emulator
//       //using 10.0.2.2 due to using emulator (it should be localhost)
//        .then((response) => response.json())
//     .then(data => {
//                       this.setState({
//                       isLoading:false,
//                        d: data.name});
//                     });


//working  :D
  fetch('http://10.0.2.2:3001/episodes') //using 10.0.2.2 due to using emulator (it should be localhost)
           //https://stackoverflow.com/questions/5528850/how-to-connect-localhost-in-android-emulator
            .then( results => {
              return results.json();
            })
                .then(data => {
                  this.setState({episodes: data});
                  }
                  //console.log("state", this.state.episodes)
                );

  }



  render(){


    //working
     return(
          <View style={{flex: 1, paddingTop:20}}>
            <FlatList
              data={this.state.episodes}
              renderItem={({item}) =>
                <View>
                     <Text>{item.name}</Text>
                     <Text> {item.airdate}</Text>
                     <Text> {item.image}</Text>
                      <Image
                               style={{width: 50, height: 50}}
                               source={{uri:  item.image  }}
                             />
                </View>}
              keyExtractor={(item, index) => index}
            />
          </View>
          );
    //test
    //    return(
    //      <View style={{flex: 1, paddingTop:20}}>
    //        <FlatList
    //          data={this.state.episodes}
    //          renderItem={({item}) =>
    //            <ListItem
    //                 title={item.name}
    //                 subtitle={item.airdate}
    //            />}
    //          keyExtractor={(item, index) => index}
    //        />
    //      </View>
    //    );


      }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
