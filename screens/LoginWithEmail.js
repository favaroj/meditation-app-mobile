import React from 'react';
import ReactNative from 'react-native';
import { View, Text, TextInput, TouchableHighlight, StyleSheet, Image } from 'react-native';
import firebase from 'react-native-firebase';
import UserPage from './UserPage.js';

class LoginWithEmail extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        email: '',
        password: '',
        signInSuccess: false,
        user: null,
      }
  }

  onLogin = () => {
  const { email, password } = this.state;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      this.setState({ signInSuccess: true , user: user });
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

    if(this.state.signInSuccess) {
      return(
        <UserPage user={this.state.user}/>
      );
    }
    return(
      <View>
      <TextInput
        style={{ height: 40 }}
        placeholder="Email Address"
        onChangeText={(email) => this.setState({email})}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder="Password"
        onChangeText={(password) => this.setState({password})}
        secureTextEntry={true}
      />
      <View style={ styles.buttonContainer }>
      <TouchableHighlight
        style={styles.button}
        onPress={this.onSignUpEmail}>
        <Text>Sign Up</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={this.onLogin}>
        <Text>Login</Text>
      </TouchableHighlight>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  buttonContainer: {

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
