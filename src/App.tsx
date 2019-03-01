import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as firebase from "firebase";
import Unit from "./components/Unit";
import { error } from "util";

var config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};
console.log(config);
firebase.initializeApp(config);
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
class App extends Component<
  {},
  { loading: Boolean; loggedIn: Boolean; error: String }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      loggedIn: false,
      loading: true,
      error: ""
    };
  }
  componentWillMount() {
    firebase
      .auth()
      .signInWithEmailAndPassword("ali@cybervision.com.pk", "cybervision")
      .then(() => {
        this.setState({
          loggedIn: true,
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          loggedIn: false,
          loading: false,
          error: error.message
        });
      });
  }
  render() {
    const { loading, loggedIn, error } = this.state;
    return loading ? (
      <div>Please wait. We're logging you in...</div>
    ) : loggedIn ? (
      <Unit />
    ) : (
      error.length > 0 && (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Oops! <code>{error}.</code> Please resolve this error to login.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      )
    );
  }
}

export default App;
