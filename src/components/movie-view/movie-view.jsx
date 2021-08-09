import React from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  addFavorite(movie) {
    const token = localStorage.getItem("token");
    const url =
      "https://myflix-21.herokuapp.com/users/" +
      localStorage.getItem("user") + "/movies/" + movie._id;

    axios.post(url, "", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
        alert(movie.Title + " has been added to favorites!");
      });
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="link">Director</Button>
        </Link>

        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button variant="link">Genre</Button>
        </Link>

        <button onClick={() => this.addFavorite(movie)}>Add to favorites</button>
          
        <button onClick={() => { onBackClick(null); }}>Back</button>

      </div>
    );
  }
}