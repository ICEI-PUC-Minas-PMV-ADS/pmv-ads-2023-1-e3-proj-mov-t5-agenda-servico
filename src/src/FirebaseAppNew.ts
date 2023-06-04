import firebaseDatabase from '@react-native-firebase/database';
import authFirebase, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firebaseMessaging from '@react-native-firebase/messaging';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const database = firebaseDatabase();

GoogleSignin.configure({
  webClientId: '1044670167757-6aktlagh5kuh85ldqq9lkukavdlr07jh.apps.googleusercontent.com',
});

export function onGoogleButtonPress(callback: (credentials?: FirebaseAuthTypes.UserCredential) => void) {
  GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
    .then(() => {
      GoogleSignin.signIn().then(({ idToken }) => {
        const googleCredential = authFirebase.GoogleAuthProvider.credential(idToken);
        authFirebase().signInWithCredential(googleCredential)
          .then((credentials) => {
            callback(credentials);
          }).catch((error) => callback());
      }).catch((error) => callback());
    }).catch((error) => callback());
}

export const messaging = firebaseMessaging();