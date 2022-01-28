import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Switch,
  FlatList,
  ImageBackground,
  ScrollView,
} from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { RFValue } from 'react-native-responsive-fontsize';

import AppTitle from '../components/AppTitle';
import AlphabetCard from './AlphabetCard';

let customFonts = {
  Playtime: require('../assets/playtime.ttf'),
};

let alphabets = require('../Database/localDb.json');

export default class AlphabetsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      fontsLoaded: false,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    //console.log('abcd');
  }

  renderItem = ({ item: alphabet }) => {
    // console.log(alphabet);
    return <AlphabetCard alphabet={alphabet} />;
  };

  keyExtractor = (item, index) => index.toString();

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />

          <AppTitle />
          <View style={{ flex: 0.1 }}>
            <Text style={styles.nameText}>Learn Alphabets</Text>
          </View>
          <View style={{ flex: 0.8 }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
              <FlatList
                data={alphabets}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
              />
              
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffcc55',
    justifyContent: 'center',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight + 10 : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: 'row',
  },
  appIcon: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'contain',
  },
  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  appTitleText: {
    color: 'black',
    fontSize: RFValue(28),
    fontFamily: 'Playtime',
  },
  screenContainer: {
    flex: 0.85,
  },
  profileImageContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: RFValue(140),
    height: RFValue(140),
    borderRadius: RFValue(70),
  },

  nameText: {
    color: '#472000',
    fontSize: RFValue(30),
    fontFamily: 'Playtime',
    marginTop: RFValue(10),
    alignSelf: 'center',
  },
  nameTextLight: {
    color: 'black',
    fontSize: RFValue(40),
    fontFamily: 'Bubblegum-Sans',
    marginTop: RFValue(10),
  },
  themeContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: RFValue(20),
  },
  themeText: {
    color: 'white',
    fontSize: RFValue(30),
    fontFamily: 'Bubblegum-Sans',
    marginRight: RFValue(15),
  },
  themeTextLight: {
    color: 'black',
    fontSize: RFValue(30),
    fontFamily: 'Bubblegum-Sans',
    marginRight: RFValue(15),
  },
});
