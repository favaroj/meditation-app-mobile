import React from 'react';
import { StyleSheet, Platform, Image, Text, View } from 'react-native';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';
import firebase from 'react-native-firebase';

import Login from './screens/Login.js';
import UserPage from './screens/UserPage.js';
import { LoggedIn, LoggedOut, createRootNavigator, RootStack } from './screens/RootNavigation.js';
import LoginWithEmail from './screens/LoginWithEmail';

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
      
      if(user) {
        if(user.displayName !== null) {
          var firstName = user.displayName.split(' ').slice(0, -1).join(' ');
          Actions.userPage({type: ActionConst.RESET, text: firstName})
        } else {
          Actions.userPage({type: ActionConst.RESET, text: user.email})
        }
        
      } else {
        Actions.login()
      }
      
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
    return(
      <Router>
        <Scene key="root">
          <Scene key="login" component={Login} title="Login" hideNavBar type={ActionConst.RESET} animation="fade" duration={1}/>
          <Scene key="loginWithEmail" component={LoginWithEmail} title="Login with Email"  animation="fade" duration={1}/>
          <Scene key="userPage" component={UserPage} title="Profile"  hideNavBar type={ActionConst.RESET}/>
        </Scene>
      </Router>
    )
    /*const { signedIn, loading } = this.state;

    if(loading) {
      return null;
    }

    if(this.state.signedIn) {
      return <UserPage onLogOutPress={this.handleLogOut.bind(this)}/>;
    } else {
      return <Login />;
    }*/
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
