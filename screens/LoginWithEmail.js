import React from 'react';
import ReactNative from 'react-native';
import { View, Text, TextInput, TouchableHighlight, StyleSheet, Image, Animated, Easing, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import UserPage from './UserPage.js';
import { RootStack } from './RootNavigation.js';

class LoginWithEmail extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        email: '',
        password: '',
        signInSuccess: false,
        user: null,
        signedIn: false,
        stopAnimation: false,
      }
      this.animatedValue1 = new Animated.Value(0)
  }

  componentDidMount () {
    this.animate()
  }

  animate () {
    this.animatedValue1.setValue(0)
    if(!this.state.stopAnimation) {
    Animated.timing(
        this.animatedValue1,
        {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
        }
    ).start((o) => {
      if(o.finished)
      {
        this.setState({stopAnimation: true});
      }    
    });
    }//end if
  }


  onLogin = () => {
  const { email, password } = this.state;


  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
        this.setState({ signedIn: true });
        //Actions.userPage({type: RESET})
      // If you need to do anything with the user, do it here
      // The user will be logged in automatically by the
      // `onAuthStateChanged` listener we set up in App.js earlier
    })
    .catch((error) => {
      const { code, message } = error;
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
    });
  }

  onSignUpEmail = () => {
    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        
        console.log(user + " has been created!");
        // If you need to do anything with the user, do it here
        // The user will be logged in automatically by the
        // `onAuthStateChanged` listener we set up in App.js earlier
      })
      .catch((error) => {
        const { code, message } = error;
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
      });
  }

  render () {
    const Height_Holder = Dimensions.get('window').height;
    console.log(Height_Holder);
    const introButton = this.animatedValue1.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, Height_Holder / 2.3]
    })
    /*const { signedIn } = this.state;
    const Layout = RootStack(signedIn);

    if(signedIn) {    
      return <Layout />
    }*/

    return(
      <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      >
      <View style={styles.imageContainer}>
              <Image style={styles.image} source={require('../assets/final-fantasy-bkgr.png')} />
              <View style={styles.headerContainer}>
                <Text style={styles.mainHeader}>Me-re-da</Text>
                <Text style={styles.subHeader}>Terra Meditation</Text>
              </View>
            </View>

  <Animated.View
    style={{ position: 'relative',
      bottom: introButton }}>
      <ImageBackground style={styles.emailImage} source={require('../assets/email-effect.png')}>
    <TextInput
        style={{ height: 40 }}
        placeholder="Email Address"
        onChangeText={(email) => this.setState({email})}
      />
      </ImageBackground>
      <ImageBackground style={styles.emailImage} source={require('../assets/email-effect.png')}>
      <TextInput
        style={{ height: 40 }}
        placeholder="Password"
        onChangeText={(password) => this.setState({password})}
        secureTextEntry={true}
      />
      </ImageBackground>
      <View style={ styles.buttonContainer }>
      
      <TouchableHighlight
        style={styles.button}
        onPress={this.onSignUpEmail}>
        <Image style={styles.signUpImage} source={require('../assets/signup-btn-effect.png')}/>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.loginButton}
        onPress={this.onLogin}>
        <Image style={styles.signUpImage} source={require('../assets/login-btn-effect.png')}/>
      </TouchableHighlight>
      </View>
  </Animated.View>
      
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    width: 70,
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
   
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  imageContainer: {
    opacity: 0.5,
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
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  signUpImage: {
    height: 30,
    width: 70,
   
  },
  loginMethodsContainer: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'flex-end',
  },
  mainHeader: {
    fontSize: 35,
    letterSpacing: 55,
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

export default LoginWithEmail;
