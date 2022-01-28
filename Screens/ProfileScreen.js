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
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import AppTitle from '../components/AppTitle';

let customFonts = {
  Playtime: require('../assets/playtime.ttf'),
};

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      isEnabled: false,
      light_theme: true,
      profile_image: '',
      name: '',
      points: true,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  }

  async fetchUser() {
    let theme, name, image, points;
    await firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', function (snapshot) {
        theme = snapshot.val().current_theme;
        name = `${snapshot.val().first_name} ${snapshot.val().last_name}`;
        image = snapshot.val().profile_picture;
        points = snapshot.val().pointsEarned;
      });
    this.setState({
      light_theme: theme === 'light' ? true : false,
      isEnabled: theme === 'light' ? false : true,
      name: name,
      profile_image: image,
      points: points,
    });
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <AppTitle />
          </View>
          <View style={styles.screenContainer}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: this.state.profile_image }}
                style={styles.profileImage}
              />
              <Text
                style={[
                  styles.nameText,
                  { fontSize: RFValue(30), marginBottom: RFValue(-20) },
                ]}>
                {this.state.name}
              </Text>

              <Text
                style={[
                  styles.nameText,
                  {
                    marginTop: RFValue(30),
                    fontSize: RFValue(35),
                    alignSelf: 'center',
                    marginBottom: RFValue(-6),
                  },
                ]}>
                Let's Learn
              </Text>
            </View>
            <View
              style={{
                margin: RFValue(50),
                flex: RFValue(0.5),
                marginBottom: RFValue(-80),
                height: RFValue(300),
              }}>
              <ScrollView
                style={{
                  marginTop: RFValue(10),
                  flex: RFValue(0.9),
                  marginBottom: RFValue(-20),
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Alphabets');
                  }}
                  style={[
                    styles.cardContainerLight,
                    { backgroundColor: '#573000' },
                  ]}>
                  <Image
                    source={require('../assets/symbol3.jpg')}
                    style={styles.iconImage}
                  />
                  <Text style={styles.cardText}>Alphabets  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Numbers');
                  }}
                  style={[
                    styles.cardContainerLight,
                    { backgroundColor: '#51a0a7' },
                  ]}>
                  <Image
                    source={require('../assets/symbol4.jpg')}
                    style={styles.iconImage}
                  />
                  <Text style={styles.cardText}>Numbers</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Colours');
                  }}
                  style={[
                    styles.cardContainerLight,
                    { backgroundColor: '#573000' },
                  ]}>
                  <Image
                    source={require('../assets/symbol2.jpg')}
                    style={styles.iconImage}
                  />
                  <Text style={styles.cardText}>Colours</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Animals');
                  }}
                  style={[
                    styles.cardContainerLight,
                    { backgroundColor: '#51a0a7' },
                  ]}>
                  <Image
                    source={require('../assets/symbol1.jpg')}
                    style={styles.iconImage}
                  />
                  <Text style={styles.cardText}>Animals</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Fruits');
                  }}
                  style={[
                    styles.cardContainerLight,
                    { backgroundColor: '#573000' },
                  ]}>
                  <Image
                    source={require('../assets/symbol6.jpg')}
                    style={styles.iconImage}
                  />
                  <Text style={styles.cardText}>Fruits</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Vegetables');
                  }}
                  style={[
                    styles.cardContainerLight,
                    { backgroundColor: '#51a0a7' },
                  ]}>
                  <Image
                    source={require('../assets/symbol7.jpg')}
                    style={styles.iconImage}
                  />
                  <Text style={styles.cardText}>Vegetables  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: RFValue(1),
    alignItems: 'center',
    backgroundColor: '#ffcc55',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight + RFValue(10)
        : RFValue(35),
  },
  appTitle: {
    flex: RFValue(0.2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  appIcon: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
    marginTop: RFValue(7),
    left: RFValue(86),
    position: 'absolute',
    borderRadius: RFValue(100),
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: RFValue(0.9),
    shadowRadius: RFValue(7),
    elevation: RFValue(2),
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
    flex: 0.8,
  },
  profileImageContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: RFValue(26),
  },
  profileImage: {
    width: RFValue(105),
    height: RFValue(105),
    borderRadius: RFValue(70),
    marginTop: RFValue(35),
  },

  nameText: {
    color: '#573000',
    fontSize: RFValue(37),
    fontFamily: 'Playtime',
    marginTop: RFValue(10),
    marginBottom: RFValue(15),
  },
  pointsText: {
    color: '#573000',
    fontSize: RFValue(19),
    fontFamily: 'Playtime',
    marginTop: RFValue(23),
    marginBottom: RFValue(-11.5),
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

  button: {
    borderWidth: 3,
    borderRadius: 40,
    width: 350,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },

  routeCard: {
    justifyContent: 'center',
    borderRadius: RFValue(30),
    alignSelf: 'center',
    backgroundColor: 'white',
    width: RFValue(250),
    marginTop: RFValue(23),
    borderWidth: RFValue(3),
    height: RFValue(60),
    flexDirection: 'row',
  },
  cardContainerLight: {
    margin: RFValue(13),
    borderRadius: RFValue(20),
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: RFValue(0.9),
    shadowRadius: RFValue(7),
    elevation: RFValue(2),
    justifyContent: 'center',
    height: RFValue(70),
    width: RFValue(245),
    marginTop: RFValue(10),
    marginBottom: RFValue(20),
    //borderColor:"#472000",
    //borderWidth:6
  },
  cardText: {
    color: 'white',
    fontSize: RFValue(25),
    fontFamily: 'Playtime',
    alignSelf: 'center',

    marginLeft: RFValue(-48),
  },
});
