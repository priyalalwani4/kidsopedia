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
  Button,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';

import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

let customFonts = {
  Playtime: require('../assets/playtime.ttf'),
};

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
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

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  onSignIn = (googleUser) => {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );

        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(function (result) {
            if (result.additionalUserInfo.isNewUser) {
              firebase
                .database()
                .ref('/users/' + result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.picture,
                  locale: result.additionalUserInfo.profile.locale,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                  current_theme: 'dark',
                  pointsEarned: 0,
                  favouriteAnimal: {},
                })
                .then(function (snapshot) {});
            }
          })
          .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behaviour: 'web',
        androidClientId:
          '530373455610-ecjukuk77bmttfo80u1pgh34o8qcep6c.apps.googleusercontent.com',
        iosClientId:
          '530373455610-uhmj9d93aj5auqpjg5283vh0na4grir7.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e.message);
      return { error: true };
    }
  };

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <Image
              source={require('../assets/appIcon.png')}
              style={styles.appIcon}
            />
            <Image
              source={require('../assets/appname.png')}
              style={styles.appTitleText}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.signInWithGoogleAsync();
              }}>
              <Image
                source={require('../assets/google_logo.png')}
                style={{ height: RFValue(30), width: RFValue(30) }}
              />
              <Text style={styles.googleText}>Sign in with Google</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 0.3,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../assets/bottomBorder.png')}
              style={styles.bottomBorder}></Image>
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
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: RFValue(-80),
    marginTop: RFValue(30),
  },
  appIcon: {
    width: RFValue(170),
    height: RFValue(170),
    resizeMode: 'contain',
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: RFValue(0.9),
    shadowRadius: RFValue(3),
    elevation: RFValue(2),
  },
  appTitleText: {
    resizeMode: 'contain',
    marginTop: RFValue(10),
    width: RFValue(300),
    height: '20%',
  },
  buttonContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: RFValue(10),
  },
  button: {
    width: RFValue(270),
    height: RFValue(50),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: RFValue(30),
    backgroundColor: 'white',
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: RFValue(0.9),
    shadowRadius: RFValue(7),
    elevation: RFValue(2),
  },
  googleText: {
    color: 'black',
    fontSize: RFValue(25),
    fontFamily: 'Playtime',
  },
  bottomBorder: {
    width: RFValue(432),
    height: RFValue(200),
    marginBottom: RFValue(-25),
  },
});
