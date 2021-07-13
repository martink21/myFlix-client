import React from 'react';
import Button from 'react-bootstrap/Button';
import './director-view.scss';

export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick } = this.props;

    return (
        <div className="director-view">
          <div className="director-name">
            <span className="value">{director.Name}</span>
          </div>
          <div className="director-birth">
            <span className="label">Birthdate: </span>
            <span className="value">{director.Birth}</span>
          </div>
          <div className="director-bio">
            <span className="label">Bio: </span>
            <span className="value">{director.Bio}</span>
          </div>
          <Button variant="secondary" onClick={() => { onBackClick(null); }}>Back</Button>
        </div>
    );
  }
}