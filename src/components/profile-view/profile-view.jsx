import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from "react-router-dom";

import './profile-view.scss';

export class ProfileView extends React.Component {

  render() {
    let { user, token, history, userData, onNewUser, onSignOut} = this.props;

    function updateInfo(token) {
      const userInput = document.getElementById('username');
      const passInput = document.getElementById('password');
      const passVerInput = document.getElementById('passwordVer');
      const emailInput = document.getElementById('email');
      const dateInput = document.getElementById('DOB');

      if (userInput.value.length > 12) {
        const userErr = document.getElementById('user');
        return userErr.innerText = "Username can only be 12 characters";
      }

      const nameChoice = userInput.value || userData.Username;
      let passChoice = null;
      if (passInput.value == "") {
        passChoice = "";
      } else {
        passChoice = passInput.value;
      }
      const emailChoice = emailInput.value || userData.Email;
      const dateChoice = dateInput.value || userData.DOB;

      if (passInput.value === passVerInput.value) {
        axios.put(`https://myflix-21.herokuapp.com/users/${user}`, 
        { 
          Username: nameChoice, Password: passChoice, Email: emailChoice, DOB: dateChoice 
        },
        { headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}}
        )
        .then(response => {
          console.log('Success with updating account information');
          let userData2 = response.data;
          onNewUser(userData2);
          if (userInput.value != "") {
            window.location = `/users/${userData2.Username}`;
          }
          if (passChoice != "") {
            window.location = `/users/${userData2.Username}`;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      } else {
        const passErr = document.getElementById('pass');
        const passErrVer = document.getElementById('passVer');
        passErr.innerText = "The passwords must match";
        passErrVer.innerText = "The passwords must match";
      }
    }

    //deleting an account 
    function deleteAcc(token) {
      axios.delete(`https://myflix-21.herokuapp.com/users/${user}`, 
      { headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}})
      .then(response => {
        console.log(response);
        console.log(`${user} has been deleted`);
      })
      .catch(e => {
        console.log('There is an error');
        console.log(e);
      })
    }
    

    function Date() {
      const formDate = userData.DOB;

      return formDate.slice(0, 10);
    }

    if (userData.Username === 'testuser') {
      return (
        <>
        <div className="centerProfile">
          <h1 className="title my-4">Hello {`${userData.Username}`},</h1>
          <h2 className="title-2 my-4">Current Information</h2>
          <div className="align-text-left">
            <div className=" my-2"><strong>Username:</strong> {`${userData.Username}`}</div>
            <div className=" my-2"><strong>Email:</strong> {`${userData.Email}`}</div>
            <div className=" my-2"><strong>Date of Birth:</strong> {`${Date()}`}</div>
          </div>
            <h2 className="title-2 my-4">Update Information</h2>
            <div>The testuser account info cannot be updated!</div>
          </div>
        </>
      );
    }
    return (
      <>
      <div className="centerProfile">
        <h1 className="title my-4">Hello {`${userData.Username}`},</h1>
        <h2 className="title-2 my-4">Current Information</h2>
        <div className="align-text-left">
          <div className=" my-2"><strong>Username:</strong> {`${userData.Username}`}</div>
          <div className=" my-2"><strong>Email:</strong> {`${userData.Email}`}</div>
          <div className=" my-2"><strong>Date of Birth:</strong> {`${Date()}`}</div>
        </div>
          <h2 className="title-2 my-4">Update Information</h2>
          <form noValidate className="form">

            <div className="input-wrap">
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" placeholder="New Username"/>
              <div id="user" className="error"></div>
            </div>

            <div className="input-wrap">
              <label htmlFor="password">Password:</label>
              <input id="password" type="password" placeholder="New Password"/>
              <div id="pass" className="error"></div>
            </div>

            <div className="input-wrap">
              <label htmlFor="password Verification">Verify Password:</label>
              <input id="passwordVer" type="password" placeholder="Verify Password Change"/>
              <div id="passVer" className="error"></div>
            </div>

            <div className="input-wrap">
              <label htmlFor="email">Email:</label>
              <input id="email" type="email" placeholder="New Email"/>
              <div id="email-err" className="error"></div>
            </div>

            <div className="input-wrap">
              <label htmlFor="DOB">Date of Birth:</label>
              <input id="DOB" type="Date"/>
              <div id="Date" className="error"></div>
            </div>
            
            <div className="middle">
              <Button className="m-3 bttn" variant="info" type="button" onClick={() =>{updateInfo(token)}}>Update</Button>
              <Link to={`/`}>
                <Button className="m-3 bttn" variant="info" type="button">Go Back</Button>
              </Link>
              <Button className="m-3 bttn" variant="info" type="button" onClick={ () => { deleteAcc(token); onSignOut(null); history.push('/'); } }>Delete Account</Button>
            </div>
          </form>
        </div>
      </>
    );
  }
}