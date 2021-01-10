import * as firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyC2eZ-f_cWvYaqMt-IYpbOvy88Qdhck0vk',
  authDomain: 'todo-list-5a72a.firebaseapp.com',
  databaseURL: 'https://todo-list-5a72a.firebaseio.com',
  projectId: 'todo-list-5a72a',
  storageBucket: 'todo-list-5a72a.appspot.com',
  messagingSenderId: '385784715874',
  appId: '1:385784715874:web:3b0fd4c4831d214b368f3b',
  measurementId: 'G-JH2P7NTNGN',
};
firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();
export default database;
