import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { MovieCard } from '../movie-card/movie-card';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Container, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";

import './main-view.scss';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      user: null,
      userData: null,
      token: null
    }
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    let userToken = localStorage.getItem('user');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
        token: localStorage.getItem('token')
      });
      this.getAcc(accessToken, userToken);
      this.getMovies(accessToken);
    }
  }
  
  getMovies(token) {
    axios.get('https://myflix-21.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

 

  newUser(newData) {
    localStorage.setItem('user', newData.Username);
    this.setState({
      userData: newData,
      user: newData.Username
    });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  getAcc(token, user) {
    axios.get(`https://myflix-21.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log('Success with getAcc');
      this.setState({
        userData: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getMovies(token) {
    axios.get('https://myflix-21.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  /* When a user successfully logs in, this function updates the `user` property 
     in state to that *particular user*/

     onLoggedIn(authData) {
      console.log(authData);
      this.setState({
        user: authData.user.Username,
        token: authData.token
      });
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user.Username);
      this.getAcc(authData.token, authData.user.Username);
      this.getMovies(authData.token);
    }
  
  onLoggedOut(signState) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: signState,
      token: null,
      userData: null
    });
  }

  render() {
  
    let { movies, user, history, token, userData} = this.state;

    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          
          <Container>
            <Navbar bg="dark" variant="dark" >
              <Navbar.Brand>Welcome to MyFlix!</Navbar.Brand>
              <ul>
                <Link to={`/`}>
                  <Button variant="link" className="navbar-link text-light">Movies</Button>
                </Link >
                <Link to={`/users/${user}`}>
                  <Button variant="link" className="navbar-link text-light">Profile</Button>
                </Link>
                <Link to={`/`}>
                  <Button variant="link" className="navbar-link text-light" onClick={() => this.onLoggedOut()}>Logout</Button>
                </Link >
              </ul>
            </Navbar >
          </Container>
          
        
          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} 
               onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} 
               onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

          <Route path="/users/${user}" render={() => {
            if (movies.length === 0) return <div className="main-view" />;
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            return <Col>
              <ProfileView user={user} token={token} history={history} userData={userData} 
              onNewUser={newData => { this.newUser(newData); }} 
              onLoggedOut={signState => { this.onLoggedOut(signState); }}/>
            </Col>
          }} />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} 
              onBackClick={() => history.goBack()} />
            </Col>
          }} />
      
        </Row>
      </Router>
    );
  }
}

export default MainView;