import React from 'react';
import ReactNative from 'react-native';
import firebase from 'react-native-firebase';
import { View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import Login from './Login.js';
import { StackNavigator } from 'react-navigation';

export default class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      signedIn: true,
    };
  }

  /*componentWillReceiveProps(nextProps) {
      // update original states
      this.setState({
        user: nextProps.user,
      });
  }*/

  onLogOut() {
    firebase.auth().signOut()
    .then(() => {
      this.setState({signedIn: false});
    })
    .catch((error) => {

    });
  }

  render() {
    const { signedIn } = this.state;
    if(!signedIn) {
      Actions.login({type: ActionConst.POP_AND_REPLACE})
    }

        return (
          <View>
            <TouchableHighlight
              onPress={this.onLogOut}
              style={styles.button}
            >
              <Text>Logout</Text>
            </TouchableHighlight>
          </View>
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
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
});
