import React from 'react';
import ReactNative from 'react-native';
import firebase from 'react-native-firebase';
import { View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import Login from './Login.js';
import StackNavigator from 'react-native-navigation';

export default class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      signedIn: true,
    };
  }

  componentWillReceiveProps(nextProps) {
      // update original states
      this.setState({
        user: nextProps.user,
      });
  }

  handleSignOut = () =>{
    firebase.auth().signOut()
    .then(() => {
      this.setState({ signedIn: false });
    })
    .catch((error) => {

    });
  }

  render() {

    if(this.state.signedIn) {
      return (
        <View>
          <Text>Welcome {this.state.user.email}</Text>
          <TouchableHighlight
            onPress={this.handleSignOut}
            style={styles.button}
          >
            <Text>Logout</Text>
          </TouchableHighlight>
        </View>
      );
    } else {
      return (

        this.props.Navigation.navigate('Login')
      );
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
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
});
