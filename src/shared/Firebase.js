import firebase from 'firebase'
import { firebaseConfig } from '../component/secret'



export let db;

export const fire = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
    }
    db = firebase.firestore();
}
