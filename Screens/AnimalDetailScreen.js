import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import firebase from 'firebase';
import * as Speech from 'expo-speech';
import AppTitle from '../components/AppTitle';

let customFonts = {
  Playtime: require('../assets/playtime.ttf'),
};

export default class AnimalDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      speakerColor: 'gray',
      speakerIcon: 'volume-high-outline',
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    //console.log(this.state.alphabet_id);
  }

 async initiateTTS(animal, detail) {
    const current_color = this.state.speakerColor;
    this.setState({
      speakerColor: current_color === 'gray' ? '#ffcc55' : 'gray',
    });
    if (current_color === 'gray') {
      Speech.speak(animal, detail);
    } else {
      Speech.stop();
    }
  }
  render() {
    let animal = this.props.route.params.animal;

    let images = {
      Bear: require('../AnimalImages/bear.jpg'),
      Camel: require('../AnimalImages/camel.jpg'),
      Cat: require('../AnimalImages/cat.jpg'),
      Cheetah: require('../AnimalImages/cheetah.jpg'),
      Cow: require('../AnimalImages/cow.jpg'),
      Deer: require('../AnimalImages/deer.jpg'),
      Dog: require('../AnimalImages/dog.jpg'),
      Donkey: require('../AnimalImages/donkey.jpg'),
      Elephant: require('../AnimalImages/elephant.jpg'),
      Fox: require('../AnimalImages/fox.jpg'),
      Giraffe: require('../AnimalImages/giraffe.jpg'),
      Hippo: require('../AnimalImages/hippo.jpg'),
      Horse: require('../AnimalImages/horse.jpg'),
      Kangaroo: require('../AnimalImages/kangaroo.jpg'),
      Koala: require('../AnimalImages/koala.jpg'),
      Lion: require('../AnimalImages/lion.jpg'),
      Monkey: require('../AnimalImages/monkey.jpg'),
      Mouse: require('../AnimalImages/mouse.jpg'),
      Panda: require('../AnimalImages/panda.jpg'),
      Pig: require('../AnimalImages/pig.jpg'),
      Raccoon: require('../AnimalImages/raccoon.jpg'),
      Rhino: require('../AnimalImages/rhino.jpg'),
      Sheep: require('../AnimalImages/sheep.jpg'),
      Squirrel: require('../AnimalImages/squirrel.jpg'),
      Tiger: require('../AnimalImages/tiger.jpg'),
      Wolf: require('../AnimalImages/wolf.jpg'),
      Zebra: require('../AnimalImages/zebra.jpg'),
    };

    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />

          <AppTitle style={{ marginTop: RFValue(10) }} />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: RFValue(0.8),
            }}>
            <View style={styles.cardContainer}>
              <View
                style={{
                  flex: RFValue(0.3),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={images[animal.name[0]]}
                  style={{
                    borderRadius: RFValue(2.5),
                    margin: RFValue(20),
                    marginTop: RFValue(15),
                    resizeMode: 'contain',
                  }}></Image>
              </View>
              <View style={{ flex: RFValue(0.2) }}>
                <Text style={styles.storyTitleText}>{animal.name[0]}</Text>
              </View>
              
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>{animal.description}</Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffcc55',
    alignItems: 'center',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight + 10 : RFValue(35),
  },
  cardContainer: {
    backgroundColor: '#472000',
    borderRadius: RFValue(20),
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: RFValue(0.9),
    shadowRadius: RFValue(7),
    elevation: RFValue(2),
    margin: RFValue(30),
    padding: RFValue(20),
  },

  cardContainerLight: {
    margin: RFValue(13),
    backgroundColor: 'white',
    borderRadius: RFValue(20),
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: RFValue(0.5),
    shadowRadius: RFValue(5),
    elevation: RFValue(2),
  },

  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: 'center',
    flex: 0.4,
  },

  animalimag: {
    resizeMode: 'contain',
    width: '100%',
    height: RFValue(270),
    borderRadius: RFValue(2.5),
    alignSelf: 'center',
    marginBottom: RFValue(20),
  },

  iconContainer: {
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyTitleText: {
    fontFamily: 'Playtime',
    fontSize: RFValue(30),
    color: 'white',
    marginLeft: RFValue(-10),
  },
  storyTitleTextLight: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(25),
    color: 'black',
  },
  storyAuthorText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(18),
    color: 'white',
  },
  storyAuthorTextLight: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(18),
    color: 'black',
  },
  descriptionContainer: {
    marginTop: RFValue(5),
    flex: RFValue(0.45),
  },
  descriptionText: {
    fontFamily: 'Playtime',
    fontSize: RFValue(15),
    color: 'white',
    padding: RFValue(10),
  },
  descriptionTextLight: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(13),
    color: 'black',
  },
  actionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: RFValue(10),
  },
  likeButtonLiked: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#eb3948',
    borderRadius: RFValue(30),
  },
  likeButtonDisliked: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#eb3948',
    borderWidth: 2,
    borderRadius: RFValue(30),
  },
  likeText: {
    color: 'white',
    fontFamily: 'Bubblegum-Sans',
    fontSize: 25,
    marginLeft: 25,
    marginTop: 6,
  },
  likeTextLight: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: 25,
    marginLeft: 25,
    marginTop: 6,
  },
});
