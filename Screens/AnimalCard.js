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

let customFonts = {
  Playtime: require('../assets/PlaytimeWithHotToddies3D.ttf'),
};

export default class AnimalCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      speakerColor: 'gray',
      speakerIcon: 'volume-high-outline',
      heartIcon: 'heart-outline',
      favourite: [],
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
   
  }

  async initiateTTS(animal) {
   
    const current_color = this.state.speakerColor;
    this.setState({
      speakerColor: current_color === 'gray' ? '#ffcc55' : 'gray',
    });
    if (current_color === 'gray') {
      Speech.speak(animal);
    } else {
      Speech.stop();
    }
  }

  likeAnimal = (animal) => {
    var current_name = this.state.heartIcon;
    var favourite=this.state.favourite;
    if (current_name === 'heart-outline' ) {
      this.setState({
        heartIcon: 'heart'
      });
      //console.log(this.state.favourite)
    } else if (current_name === 'heart') {
      this.setState({ heartIcon: 'heart-outline' });
     // console.log(this.state.favourite)
    }
  }

  render() {
    let animals = this.props.animals;

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
      // console.log(this.props.alphabet);
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('AnimalDetail', { animal: animals });
          }}>
          <SafeAreaView style={styles.droidSafeArea} />

          <View style={styles.cardContainer}>
            <Image
              style={styles.alphabetImage}
              source={images[animals.name[0]]}></Image>

            <View style={styles.titleContainer}>
              <Text style={styles.storyTitleText}>{animals.name[0]}</Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => {
                  this.initiateTTS(animals.name[0]);
                }}>
                <Ionicons
                  name={this.state.speakerIcon}
                  size={RFValue(25)}
                  color={this.state.speakerColor}
                  style={{ margin: RFValue(10) }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.likeAnimal(animals.name[0]);
                }}>
                <Ionicons
                  name={this.state.heartIcon}
                  size={RFValue(25)}
                  color={'white'}
                  style={{ margin: RFValue(10) }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  cardContainer: {
    backgroundColor: '#472000',
    borderRadius: RFValue(20),
    alignItems: 'center',
    justifyContent: 'center',
    width: RFValue(270),
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: RFValue(0.9),
    shadowRadius: RFValue(7),
    elevation: RFValue(2),
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
  alphabetImage: {
    resizeMode: 'contain',
    width: '95%',
    alignSelf: 'center',
    height: RFValue(200),
    flex: 0.4,
    margin: RFValue(20),
    marginTop: RFValue(30),
    borderRadius: RFValue(2.5),
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: 'center',
    flex: 0.4,
  },

  iconContainer: {
    flex: 0.2,
    flexDirection: 'row',
  },
  storyTitleText: {
    fontFamily: 'Playtime',
    fontSize: RFValue(30),
    color: 'white',
    marginLeft: RFValue(-20),
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
  },
  descriptionText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(13),
    color: 'white',
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
