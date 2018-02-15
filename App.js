import React from 'react';
import { StyleSheet, Platform, Image, Text, View } from 'react-native';
import Login from './screens/Login.js';
import UserPage from './screens/UserPage.js';
import firebase from 'react-native-firebase';
import { LoggedIn, LoggedOut, createRootNavigator, RootStack } from './screens/RootNavigation.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      signedIn: false,
      // firebase things?
    };
    this.authSubscription = null;
  }

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user,
        signedIn: true,
      });
    });
  }

  componentWillUnmount() {
    if(this.authSubscription) {
      this.authSubscription();
    }
  }

  handleLogOut() {
    this.setState({signedIn: false});

    firebase.auth().signOut()
    .then(() => {

    })
    .catch((error) => {

    });
  }

  render() {
    const { signedIn, loading } = this.state;

    if(loading) {
      return null;
    }

    if(this.state.signedIn) {
      return <UserPage onLogOutPress={this.handleLogOut.bind(this)}/>;
    } else {
      return <Login />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    height: 80,
    marginBottom: 16,
    width: 80,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  }
});
