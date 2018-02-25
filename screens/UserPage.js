import React from 'react';
import ReactNative from 'react-native';
import firebase from 'react-native-firebase';
import { View, Text, TouchableHighlight, StyleSheet, Animated, Easing, Dimensions, Image} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import Login from './Login.js';
import { StackNavigator } from 'react-navigation';
import * as Animatable from 'react-native-animatable';

export default class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      signedIn: true,
    };
    this.animatedBackground = new Animated.Value(0);
    this.animatedUserGreeting = new Animated.Value(0);
  }

  componentDidMount() {
    this.animate()
  }

  animate () {
    this.animatedBackground.setValue(0)
    this.animatedUserGreeting.setValue(0)
    if(!this.state.stopAnimation) {
    Animated.parallel([
      Animated.timing(
        this.animatedBackground,
        {
          toValue: 1,
          duration: 2000,
        }
      ),
      Animated.timing(
        this.animatedUserGreeting,
        {
          toValue: 1,
          duration: 2500,
          easing: Easing.ease,
        }
      )
    ])
    .start((o) => {
      if(o.finished)
      {
        this.setState({stopAnimation: true});
      }    
    });
    }//end if
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

    const Height_Holder = Dimensions.get('window').height;
    console.log(Height_Holder);
    const userGreeting = this.animatedUserGreeting.interpolate({
      inputRange: [0, 1],
      outputRange: [0, Height_Holder / 6.0]
    })
    const fadeBackground = this.animatedBackground;
    const userOpacity = this.animatedUserGreeting;

    const { signedIn } = this.state;
    if(!signedIn) {
      Actions.login({type: ActionConst.POP_AND_REPLACE})
    }

        return (
          <Animated.View style={styles.container}>
          <Animated.View style={{ flex: 1, opacity: fadeBackground, paddingTop: 50, alignItems: 'center', }}>
              <Image style={styles.image} source={require('../assets/final-fantasy-bkgr.png')} />
              <View style={styles.headerContainer}>
                <Text style={styles.mainHeader}>Me-re-da</Text>
                <Text style={styles.subHeader}>Terra Meditation</Text>
              </View>
            </Animated.View>
            <Animated.View style={{ flexDirection: 'column', justifyContent: 'space-between',}}>
            <Animated.Text style={{ fontSize: 25, opacity: userOpacity, bottom: userGreeting}}>
              Welcome {this.props.text}
            </Animated.Text>
            <TouchableHighlight
              onPress={this.onLogOut}
              style={styles.button}
            >
              <Text>Logout</Text>
            </TouchableHighlight>
            </Animated.View>
          </Animated.View>
        );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: 335,
    height: 250,
  },
  imageContainer: {
    paddingTop: 50,
    alignItems: 'center',
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
});
