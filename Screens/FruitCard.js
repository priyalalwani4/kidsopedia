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

export default class FruitCard extends Component {
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

  async initiateTTS(fruit) {
    //console.log(title);
    const current_color = this.state.speakerColor;
    this.setState({
      speakerColor: current_color === 'gray' ? '#ffcc55' : 'gray',
    });
    if (current_color === 'gray') {
      Speech.speak(fruit);
    } else {
      Speech.stop();
    }
  }

  render() {
    let fruits = this.props.fruits;

    let images={
     Apple:require("../FruitImages/apple.jpg"),
     Banana:require("../FruitImages/banana.jpg"),
     Blackberry:require("../FruitImages/blackberry.jpg"),
     Cherry:require("../FruitImages/cherry.jpg"),
     Coconut:require("../FruitImages/coconut.jpg"),
     Blueberry:require("../FruitImages/blueberry.jpg"),
     Watermelon:require("../FruitImages/watermelon.jpg"),
     Cranberry:require("../FruitImages/cranberry.jpg"),
     Grapes:require("../FruitImages/grapes.jpg"),
     Kiwi:require("../FruitImages/kiwi.jpg"),
     Lemon:require("../FruitImages/lemon.jpg"),
     Lime:require("../FruitImages/lime.jpg"),
     Mango:require("../FruitImages/mango.jpg"),
     Orange:require("../FruitImages/orange.jpg"),
     Papaya:require("../FruitImages/papaya.jpg"),
     Peach:require("../FruitImages/peach.jpg"),
     Pear:require("../FruitImages/pear.jpg"),
     Pineapple:require("../FruitImages/pineapple.jpg"),
     Plum:require("../FruitImages/plum.jpg"),
     Pomegranate:require("../FruitImages/pomegranate.jpg"),
     Raspberry:require("../FruitImages/raspberry.jpg"),
     Strawberry:require("../FruitImages/strawberry.jpg"),
}

    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      // console.log(this.props.alphabet);
      return (
        <View>
          <SafeAreaView style={styles.droidSafeArea} />

          <View style={styles.cardContainer}>
            <Image
              style={styles.alphabetImage}
              source={images[fruits.name]}></Image>

            <View style={styles.titleContainer}>
              <Text style={styles.storyTitleText}>{fruits.name}</Text>
            </View>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => {
                this.initiateTTS(fruits.name);
              }}>
              <Ionicons
                name={this.state.speakerIcon}
                size={RFValue(30)}
                color={this.state.speakerColor}
                style={{ margin: RFValue(10), marginBottom: RFValue(10) }}
              />
            </TouchableOpacity>
          </View>
        </View>
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
