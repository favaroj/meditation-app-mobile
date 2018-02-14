import ReactNative from 'react-native';
import * as firebase from 'firebase';


const config = {
    apiKey: "AIzaSyAe3fSoMX9DglsNeO5YaGutC9DvUcPmEOU",
    authDomain: "meditationapp-ffaf4.firebaseapp.com",
    databaseURL: "https://meditationapp-ffaf4.firebaseio.com",
    projectId: "meditationapp-ffaf4",
    storageBucket: "meditationapp-ffaf4.appspot.com",
    messagingSenderId: "161556593455"
};
firebase.initializeApp(config);
