import React from 'react';
import { View, Text, TextInput, TouchableHighlight, StyleSheet, Image } from 'react-native';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { Actions, ActionConst } from 'react-native-router-flux';
import LoginWithEmail from './LoginWithEmail.js';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      email: '',
      password: '',
      showLoginWithEmail: false,
    };
  }

  showEmailLogin = () => {
    if(this.state.showLoginWithEmail == false) {
      this.setState({ showLoginWithEmail: true })
    } else {
      this.setState({ showLoginWithEmail: false})
    }
  }

  loginWithEmail = () => {
    Actions.loginWithEmail()
  }

  // Calling the following function will open the FB login dialogue:
onLoginOrRegister = async () => {
  try {
    const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      throw new Error('User cancelled request'); // Handle this however fits the flow of your app
    }

    console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

    // get the access token
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw new Error('Something went wrong obtaining the users access token'); // Handle this however fits the flow of your app
    }

    // create a new firebase credential with the token
    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

    // login with credential
    const currentUser = await firebase.auth().signInWithCredential(credential);

    console.info(JSON.stringify(currentUser.toJSON()))
  } catch (e) {
    console.error(e);
  }
}

  render() {
      const { showLoginWithEmail } = this.state;
      if(showLoginWithEmail) {
        return <LoginWithEmail />;
      } else {
        return (
          <View style={styles.loginMethodsContainer}>
            <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={require('../assets/final-fantasy-bkgr.png')} />
              <View style={styles.headerContainer}>
                <Text style={styles.mainHeader}>Me-re-da</Text>
                <Text style={styles.subHeader}>Terra Meditation</Text>
              </View>
            </View>
            </View>
            <View style={styles.loginWithEmailContainer}>
            <Text>email</Text>
            <TouchableHighlight
            style={styles.emailButton}
              onPress={this.loginWithEmail}
            >
            <Image style={styles.emailImage} source={require('../assets/email-effect.png')} />
           
            </TouchableHighlight>
            </View>
            <Text style={{marginTop: 10}}>Or</Text>
            <View style={styles.socialLoginContainer}>
            <TouchableHighlight onPress={this.onLoginOrRegister}>
            <Image style={styles.facebookImage} source={require('../assets/facebook.png')} />
            </TouchableHighlight>
            <TouchableHighlight >
            <Image style={styles.googleImage} source={require('../assets/google.png')} />
            </TouchableHighlight>
            </View>
          </View>
        );
      }


      /*<View style={styles.container}>

        {

          this.state.showLoginWithEmail ?
            <View>
            <View style={styles.imageContainer}>
            <Image style={styles.image} source={require('../assets/final-fantasy-bkgr.png')} />
            <View style={styles.headerContainer}>
            <Text style={styles.mainHeader}>Me-re-da</Text>
            <Text style={styles.subHeader}>Terra Meditation</Text>
            </View>
            </View>
            <LoginWithEmail />
            </View>
          : <View style={styles.loginMethodsContainer}>
            <View>
            <View style={styles.imageContainer}>
            <Image style={styles.image} source={require('../assets/final-fantasy-bkgr.png')} />
            <View style={styles.headerContainer}>
            <Text style={styles.mainHeader}>Me-re-da</Text>
            <Text style={styles.subHeader}>Terra Meditation</Text>
            </View>
            </View>
            </View>
            <TouchableHighlight
            style={styles.button}
              onPress={this.showEmailLogin}
            >

              <Text>Email</Text>
            </TouchableHighlight>
          </View>
        }
      </View>*/

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10, 
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  emailButton: {

  },
  imageContainer: {
    paddingTop: 50,
    //flexDirection: 'column',
    alignItems: 'center',
    //flex: 1,
  },
  image: {
    width: 335,
    height: 250,
  },
  emailImage: {
    width: 235,
    height: 25,
    marginLeft: 10,
  },
  facebookImage: {
    width: 40,
    height: 40,
  },
  googleImage: {
    width: 40,
    height: 40,
    marginLeft: 15,
  },
  loginWithEmailContainer: {
    marginTop: 70,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginMethodsContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  socialLoginContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  headerContainer: {
    alignItems: 'flex-end',
  },
  mainHeader: {
    fontSize: 35,
    //letterSpacing: 55,
    marginBottom: 0,
    paddingBottom: 0,
    includeFontPadding: false,
  },
  subHeader: {
    paddingTop: 0,
    marginTop: 0,
    includeFontPadding: false,
  }
})
