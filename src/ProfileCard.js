import React, { Component, PropTypes } from 'react';
import FileInput from 'react-file-input';
import { storage, database } from './firebase';
import './ProfileCard.css';

class ProfileCard extends Component {
  constructor(props) {
    super(props);

    // setup the route for firebase to store 
    this.storageRef = storage.ref('/user-images').child(props.uid);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.userRef = database.ref('/users').child(props.uid);
  }

  handleSubmit(event) {
    const file = event.target.files[0]; // get the very first element of the array
    
    // name of the file is the file directoyr
    const uploadTask = this.storageRef.child(file.name).put(file, { contentType: file.type }); // put is for adding to storage 
    
    uploadTask.on('state_changed', snapshot => {
      // use firebase upload task 
    })
    
    uploadTask.then((snapshot) => {
      // set the snapshot for the photo seen on the page 
      this.userRef.child('photoURL').set(snapshot.downloadURL);
    });
    
                                      

    
  }

  render() {
    const { photoURL, displayName } = this.props.user;
    return (
      <article className="ProfileCard">
        <img 
          className="ProfileCard--photo"
          src={ photoURL }
        />
        <p>{ displayName }</p>
        <FileInput
          accept=".png,.gif,.jpg"
          placeholder="Select an image"
          onChange={this.handleSubmit}
        />
      
      </article>
    );
  }
}

ProfileCard.propTypes = {
  displayName: PropTypes.string,
  email: PropTypes.string,
  imageName: PropTypes.string,
  imageURL: PropTypes.string,
  photoURL: PropTypes.string,
  uid: PropTypes.string
};

export default ProfileCard;
