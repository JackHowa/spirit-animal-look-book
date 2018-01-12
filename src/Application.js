import React, { Component } from 'react';
import { auth, database } from './firebase';
import CurrentUser from './CurrentUser';
import SignIn from './SignIn';
import ProfileCard from './ProfileCard';
import pick from 'lodash/pick' ;
import map from 'lodash/map';
import './Application.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.usersRef = null;
    this.userRef = null;
    this.state = {
      user: null,
      users: {}
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });

        // get all the users 
        this.usersRef = database.ref('/users');

        // set the user based on their uid 
        this.userRef = this.userRefs.child(user.uid);

        // check if the user in db 
        this.userRef.once('value').then(snapshot => {
          if (snapshot.val()) return;
          // pick all gathers a subset of an object from loadash 
          const user = pick(snapshot.val(), ['displayName', 'photoURL', 'email']);
          this.userRef.set(userData);
        });

        this.userRef.on('value', snapshot => {
          this.setState({ users: snapshot.val() });
        });
      }
    });
  }

  render() {
    const { user, users } = this.state;

    return (
      <div className="App">
        <header className="App--header">
          <h1>Social Animals</h1>
        </header>
        <SignIn />
      </div>
    );
  }
}

export default App;
