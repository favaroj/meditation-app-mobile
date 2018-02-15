import React from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';
import App from '../App.js';
import Login from './Login.js';
import LoginWithEmail from './LoginWithEmail.js';
import UserPage from './UserPage.js';

export const RootStack = (signedIn = false) => {
  return StackNavigator(
  {
    Login: {
      screen: Login,
    },
    LoginWithEmail: {
      screen: LoginWithEmail,
    },
    UserPage: {
      screen: UserPage,
    },
  },
  {
    initialRouteName: signedIn ? "Login" : "UserPage"
  }
);
}

export const LoggedIn = StackNavigator(
  {
    UserPage: {
      screen: UserPage,
    },
  }
);

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      LoggedIn: {
        screen: LoggedIn,
      },
      LoggedOut: {
        screen: LoggedOut,
      },
    },
    {
      initialRouteName: signedIn ? "LoggedIn" : "LoggedOut"
    }
  );
}
