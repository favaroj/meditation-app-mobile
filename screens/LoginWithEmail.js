import React from 'react';
import ReactNative from 'react-native';
import { Alert, View, Text, TextInput, TouchableHighlight, StyleSheet, Image, Animated, Easing, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import UserPage from './UserPage.js';
import { RootStack } from './RootNavigation.js';
import * as Animatable from 'react-native-animatable';
import * as EmailValidator from 'email-validator';
import validate from './../validate.min.js';

class LoginWithEmail extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        email: '',
        emailValidated: false,
        emailNotValidated: false,
        emailError: '',
        password: '',
        secondPassword: '',
        passwordValidated: false,
        passwordNotValidated: false,
        passwordError: '',
        displayEmailPassComboError: false,
        displayPasswordNoMatchError: false,
        signInSuccess: false,
        user: null,
        signedIn: false,
        stopAnimation: false,
        showSecondPassBox: false,
        Align: false,
        marginLeft: false,
        secondPassMarginAdjust: false,
        secondSignupPress: false,
        firstSignupPress: true,
      }
      this.animatedValue1 = new Animated.Value(0);
      this.animatedBackground = new Animated.Value(0);

      
  }

  handleViewRef = ref => this.view = ref;
  handleSecondPassBoxRef = ref => this.view = ref;

  bounce = () => this.view.fadeOutRight().then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
  //enterSecondPassBox = () => this.state.showSecondPassBox ? this.view.fadeIn().then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled')) : this.setState({ showSecondPassBox: true });
  enterSecondPassBox = () => this.view.transitionTo({ opacity: 1.0 })
  componentDidMount () {
    this.animate()
  }

  animate () {
    this.animatedValue1.setValue(0)
    this.animatedBackground.setValue(0)
    if(!this.state.stopAnimation) {
    Animated.parallel([
      Animated.timing(
        this.animatedValue1,
        {
          toValue: 1,
          duration: 1500,
          easing: Easing.ease,
        }
      ),
      Animated.timing(
        this.animatedBackground,
        {
          toValue: .3,
          duration: 2000,
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
      this.setState({ displayEmailPassComboError: true })
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
    });
  }

  onSignUpEmail = () => {
    if(this.state.firstSignupPress) {
      {this.bounce()}
      {this.toggleSecondPassBox()}
      {this.toggleAlignment()}
    }
    //{this.enterSecondPassBox()}
    const { email, password } = this.state;
    if(this.state.secondSignupPress && email !== "" && password !== "") {
      if(this.state.password !== this.state.secondPassword) {
        this.setState({ displayPasswordNoMatchError: true })
      }
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        Alert.alert(
          'Sign up',
          'Thank you for signing up!',
          [
            {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
        console.log(user + " has been created!");
        // If you need to do anything with the user, do it here
        // The user will be logged in automatically by the
        // `onAuthStateChanged` listener we set up in App.js earlier
      })
      .catch((error) => {
        const { code, message } = error;
        this.setState({ displayPasswordNoMatchError: true });
      });
    }
    this.setState({ secondSignupPress: true, firstSignupPress: false });
  }

  toggleAlignment = () => {
    this.setState({
      Align: true,
      marginLeft: true,
      secondPassMarginAdjust: true,
    });
  }

  toggleSecondPassBox = () => {
    this.setState({
      showSecondPassBox: !this.state.showSecondPassBox
    });
  }

  renderSecondPassBox = () => {
    if(this.state.showSecondPassBox) {
      return(
        <Animatable.View animation="fadeInUp" style={{opacity: 0}}>
        <View style={{  flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}}>
      <Text style={[styles.inputBoxLabel, {paddingRight: 15,}]}>pass</Text>
      <ImageBackground style={styles.emailImage} source={require('../assets/email-effect.png')}>
      <TextInput
        style={{ height: 35, width: 250 }}
        placeholder="password"
        onChangeText={(secondPassword) => this.handleSecondPass(secondPassword)}
        secureTextEntry={true}
        underlineColorAndroid="transparent"
      />
      </ImageBackground>
      {this.renderSecondPasswordValidSymbol()}
      </View>
      </Animatable.View>
      );
      //this.enterSecondPassBox()
    } else {
      return null;
    }
  }

  validateEmail = (emailText) => {
    let emailTrimmed = emailText.trim()
    //let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
  
    if(!EmailValidator.validate(emailTrimmed))
    {
    console.log("Email is Not Correct");
    this.setState({email:emailTrimmed, emailNotValidated: true, emailValidated: false})
    return false;
    }
    else {
      this.setState({email:emailTrimmed, emailValidated: true, emailNotValidated: false})
      console.log("Email is Correct");
    }
  }

  handleFirstPass = (password) => {
    let passTrimmed = password.trim()
    if(passTrimmed.length < 5) {
      
    }
    this.setState({ password: passTrimmed })   
  }

  handleSecondPass = (secondPassword) => {
    let passTrimmed = secondPassword.trim()
    let firstPassTrimmed = this.state.password;
    let trimmed = firstPassTrimmed.trim();
  
    if(secondPassword != trimmed) {
      this.setState({ displayPasswordNoMatchError: true })
    } else {
      this.setState({ displayPasswordNoMatchError: false })
    }
    
    this.setState({ secondPassword: passTrimmed })   
  }

  renderPasswordValidSymbol = () => {
    if(this.state.password == "") {
      return ( 
        <Image style={[styles.emailValidImg, {opacity: 0,}]} source={require('../assets/redx.png')} />
      );
    } else if(this.state.password.length < 5) {
      return( 
        <Image style={styles.emailValidImg} source={require('../assets/redx.png')} />
      );
    } else if(this.state.password.length >= 5) {
      return (
        <Image style={styles.emailValidImg} source={require('../assets/greencheck.png')} />
      );
    }
  }

  renderSecondPasswordValidSymbol = () => {
    if(this.state.secondPassword == "") {
      return ( 
        <Image style={[styles.emailValidImg, {opacity: 0,}]} source={require('../assets/redx.png')} />
      );
    } else if(this.state.secondPassword.length < 5) {
      return( 
        <Image style={styles.emailValidImg} source={require('../assets/redx.png')} />
      );
    } else if(this.state.secondPassword.length >= 5) {
        if(this.state.secondPassword == this.state.password) {
          //{this.setState({ displayPasswordNoMatchError: false })}
          return (
            <Image style={styles.emailValidImg} source={require('../assets/greencheck.png')} />
          );
        } else {
          
          return( 
            <Image style={styles.emailValidImg} source={require('../assets/redx.png')} />
          );
        }
    }
  }

  renderEmailValidSymbol = () => {
    if(this.state.email == "") {
      return ( 
        <Image style={[styles.emailValidImg, {opacity: 0,}]} source={require('../assets/redx.png')} />
      );
    } else if(!this.state.emailValidated) {
      return( 
        <Image style={styles.emailValidImg} source={require('../assets/redx.png')} />
      );
    } else if(this.state.emailValidated) {
      return (
        <Image style={styles.emailValidImg} source={require('../assets/greencheck.png')} />
      );
    }
    /*if(this.state.emailValidated) {
      return (
        <Image style={styles.emailValidImg} source={require('../assets/greencheck.png')} />
      );
    } else if(this.state.emailNotValidated){
      return (
        <Image style={styles.emailValidImg} source={require('../assets/redx.png')} />
      );
    } else {
      return null;
    }*/
  }

  renderPasswordNoMatchError = () => {
    if(this.state.displayPasswordNoMatchError) {
      return(
        <Image style={styles.passNoMatchImg} source={require('../assets/password-no-match.png')} />
      );
    } else {
      return null;
    }
  }

  renderEmailPasswordComboError = () => {
    if(this.state.displayEmailPassComboError) {
      return(
        <Image style={styles.emailPassComboErrorImg} source={require('../assets/email-password-not-found.png')} />
      );
    } else {
      return null;
    }
  }

  renderNewSignupBtn = () => {
    if(this.state.showSecondPassBox) {
      return(
        <Animatable.View animation="fadeInUp" style={{opacity: 0}}>
      <TouchableHighlight
      style={styles.button}
      onPress={this.onSignUpEmail}>
      <Image style={styles.signUpImage} source={require('../assets/signup-btn-effect.png')}/>
    </TouchableHighlight>
      </Animatable.View>
      );
      //this.enterSecondPassBox()
    } else {
      return null;
    }
  }

  render () {
    const Height_Holder = Dimensions.get('window').height;
    console.log(Height_Holder);
    const introButton = this.animatedValue1.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, Height_Holder / 3.0]
    })
    const fadeBackground = this.animatedBackground;

    const fadeIn = {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    };
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
      <Animated.View style={{ opacity: fadeBackground, paddingTop: 50, alignItems: 'center', }}>
              <Image style={styles.image} source={require('../assets/final-fantasy-bkgr.png')} />
              
              <View style={styles.headerContainer}>
                <Text style={styles.mainHeader}>Me-re-da</Text>
                <Text style={styles.subHeader}>Terra Meditation</Text>
              </View>
            </Animated.View>

  <Animated.View
    style={{ 
      bottom: introButton }}>
      <View >
      <View style={{ alignItems: 'center',}}>
      {this.renderPasswordNoMatchError()}
      {this.renderEmailPasswordComboError()}
      </View>
      <View style={{  flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}}>
      <Text style={styles.inputBoxLabel}>email</Text>
      <ImageBackground style={styles.emailImage} source={require('../assets/email-effect.png')}>

    <TextInput
        style={{ height: 35, width: 250 }}
        placeholder="example@domain.com"
        onChangeText={(emailText) => this.validateEmail(emailText)}
        underlineColorAndroid="transparent"
      />
      </ImageBackground>
      {this.renderEmailValidSymbol()}
      </View>
      </View>
      <View style={{  flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}}>
      <Text style={[styles.inputBoxLabel, {paddingRight: 15,}]}>pass</Text>
      <ImageBackground style={styles.emailImage} source={require('../assets/email-effect.png')}>
      <TextInput
        style={{ height: 35, width: 250 }}
        placeholder="password"
        onChangeText={(password) => this.handleFirstPass(password)}
        secureTextEntry={true}
        underlineColorAndroid="transparent"
      />
      </ImageBackground>
      {this.renderPasswordValidSymbol()}
      </View>

      {this.renderSecondPassBox()}
      <View style={[styles.buttonContainer, { justifyContent: this.state.Align ? 'flex-end' : 'center', marginLeft: this.state.marginLeft ? 450 : 0 }] }>
      
      <TouchableHighlight
        style={styles.button}
        onPress={this.onSignUpEmail}>
        <Image style={styles.signUpImage} source={require('../assets/signup-btn-effect.png')}/>
      </TouchableHighlight>
      <Animatable.View ref={this.handleViewRef}>
      <TouchableHighlight
        style={styles.loginButton}
        onPress={this.onLogin}>
        <Image style={styles.signUpImage} source={require('../assets/login-btn-effect.png')}/>
      </TouchableHighlight>
      </Animatable.View>
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
    //opacity: 0.5,
    paddingTop: 50,
    //flexDirection: 'column',
    alignItems: 'center',
    //flex: 1,
  },
  passNoMatchImg: {
    height: 30,
    width: 375,
    marginBottom: 20,
  },
  emailPassComboErrorImg: {
    height: 35,
    width: 375,
    marginBottom: 20,
  },
  image: {
    width: 335,
    height: 250,
  },
  emailImage: {
    height: 30,
    backgroundColor: 'rgba(0,0,0,0)',
    marginBottom: 10,
  },
  signUpImage: {
    height: 30,
    width: 70,
   
  },
  emailValidImg: {
    height: 20,
    width: 20,
    marginBottom: 5,
  },
  inputBoxLabel: {
    paddingBottom: 12, 
    paddingRight: 10,
    fontSize: 20,

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
