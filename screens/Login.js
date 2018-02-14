import React from 'react';
import { View, Text, TextInput, TouchableHighlight, StyleSheet, Image } from 'react-native';
import firebase from 'react-native-firebase';
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

  render() {
    return (
      <View style={styles.container}>

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
            {/*<TextInput
              style={{ height: 40 }}
              placeholder="Email Address"
              onChangeText={(email) => this.setState({email})}
            />*/}
          </View>

        }

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
