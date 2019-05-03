import React from 'react';
import { Button, View, Text, StyleSheet, Image, FlatList, ActivityIndicator, ListItem } from 'react-native';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json
import { Constants } from 'expo';


class HomeScreen extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
         isLoading: true,
         d: [],
         episodes: []
        };
      }


  componentDidMount(){
      this.fetchEpisodes();
  }

  fetchEpisodes(){
    fetch('http://10.0.2.2:3001/episodes') //using 10.0.2.2 due to using emulator (it should be localhost)
             //https://stackoverflow.com/questions/5528850/how-to-connect-localhost-in-android-emulator
              .then( results => {
                return results.json();
              })
                  .then(data => {
                     var top50 = [];
                     for(var i = 0; i < 50; i++){
                       top50.push((data)[i])
                     }
                     //console.log(JSON.stringify(top50[0]));
                     //console.log(JSON.stringify(top50[49]));
                    this.setState({episodes: top50});
                      // this.setState({episodes: data});
                    }
                  );
  }



  render(){
      return(
          <View style={{flex: 1, paddingTop:20}}>
            <FlatList
              data={this.state.episodes}
              renderItem={({item}) =>
                <View>
                     <Button title={item.name} onPress={() => {
                            /*console.log('hi');*/
                              /* 1. Navigate to the Details route with params */
                              this.props.navigation.navigate('Details', {
                                id: item.id,
                                name: item.name,
                                airdate: item.airdate,
                                airtime: item.airtime,
                                season: item.season,
                                number: item.number,
                                image: item.image
                              });
                            }}/>
                     <Text> {item.airdate}</Text>
                      <Image
                               style={{width: 100, height: 100}}
                               source={{uri:  item.image  }}
                />
                </View>}
              keyExtractor={(item, index) => index}
            />
          </View>
        )
  }

}





class DetailsScreen extends React.Component {
  render() {
    /* 2. Read the params from the navigation state */
    const { params } = this.props.navigation.state;
    const itemId = params ? params.id : null;
    const airdate = params ? params.airdate : null;
    const airtime = params ? params.airtime : null;
    const season = params ? params.season : null;
    const number = params ? params.number : null;
    const image = params ? params.image : null;
    const name = params ? params.name : null;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text> Episode Name: {name}</Text>
         <Text> Airdate: {airdate}</Text>
         <Text> Airtime: {airtime}</Text>
         <Text> Season: {season}</Text>
         <Text> Episode: {number}</Text>
         <Image
                  style={{width: 100, height: 100}}
                  source={{uri:  image  }}
         />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}


const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
