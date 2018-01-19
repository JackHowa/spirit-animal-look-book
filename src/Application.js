import React, { Component } from 'react';
import { auth, database } from './firebase';
import CurrentUser from './CurrentUser';
import SignIn from './SignIn';
import ProfileCard from './ProfileCard';
import pick from 'lodash/pick' ; // takes an object and gets all of the keys that's a smaller subset 
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
      // if there is a user that exists here 
      if (user) {
        this.setState({ user });

        // get all the users 
        this.usersRef = database.ref('/users');

        // set the user based on their uid 
        this.userRef = this.usersRef.child(user.uid);
        // check if the user in db 
        // want to do the users just once 
        // use the promise api for this 
        this.userRef.once('value').then(snapshot => {
          if (snapshot.val()) return;
          // pick all gathers a subset of an object from loadash 
          const userData = pick(user, ['displayName', 'photoURL', 'email']); // we only want these key-values for that user
          this.userRef.set(userData);
        });

        this.usersRef.on('value', snapshot => {
          // setup a listener for all of the users 
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
        {
          user ? <div>
            <section className="ProfileCards">
              {
                map(users, (userElement, uid) => {
                  return <ProfileCard key={uid} user={userElement} uid={uid} />
                })
              }
            </section>
            <CurrentUser user={user} /> 
            </div>
            : 
            <SignIn />
        }
        
      </div>
    );
  }
}

export default App;
