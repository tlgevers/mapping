import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from "firebase/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"


var firebaseConfig = {
    apiKey: "AIzaSyCrcy2BLq5rXQQbbcpaV2Im6YtrJGJwCcM",
    authDomain: "tgevers-apps.firebaseapp.com",
    databaseURL: "https://tgevers-apps.firebaseio.com",
    projectId: "tgevers-apps",
    storageBucket: "tgevers-apps.appspot.com",
    messagingSenderId: "985834856574",
    appId: "1:985834856574:web:ea7fe3f24c47a66232f82f"
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
