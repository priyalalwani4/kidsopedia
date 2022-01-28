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
} from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { RFValue } from 'react-native-responsive-fontsize';

let customFonts = {
  Playtime: require('../assets/playtime.ttf'),
};

export default class AppTitle extends React.Component {
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
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.appTitle}>
          <View style={styles.container}>
            <Image
              source={require('../assets/App_Icon.png')}
              style={styles.iconImage}
            />
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
    justifyContent:"center"
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: 'row',
  },
  appIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  iconImage: {
    width: RFValue(325),
    height: RFValue(325),
    resizeMode: 'contain',
    marginLeft:RFValue(11)
  },
  appTitleTextContainer: {
    flex: 0.75,
    justifyContent: 'center',
    //borderWidth:2,
    marginLeft: 5,
  },
  appTitleText: {
    color: 'black',
    fontSize: RFValue(28),
    fontFamily: 'Playtime',
    marginRight: '30%',
  },
});
