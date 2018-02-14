import React from 'react';
import { StyleSheet, Platform, Image, Text, View } from 'react-native';
import Login from './screens/Login.js';
import UserPage from './screens/UserPage.js';
import firebase from 'react-native-firebase';
import { StackNavigator } from 'react-navigation';

const RootStack = StackNavigator(
  {
    Home: {
      screen: App,
    },
    Login: {
      screen: Login,
    },
    UserPage: {
      screen: UserPage,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      // firebase things?
    };
    this.authSubscription = null;
  }

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user,
      });
    });
  }

  componentWillUnmount() {
    if(this.authSubscription) {
      this.authSubscription();
    }
  }

  render() {
    // If the user has not authenticated
    // The application is initialising
    if(this.state.loading) return null;

    if (this.state.user) {
      //<UserPage user={this.state.user}/>
      this.props.navigation.navigate('UserPage');
    }
    // The user is an Object, so they're logged in
    //if (this.state.user) return <UserPage />;
    // The user is null, so they're logged out

    return (
        //<Login />
        this.props.navigation.navigate('Login')
    );
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
