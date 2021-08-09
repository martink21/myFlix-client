import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import axios from 'axios';

import './registration-view.scss';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://myflix-21.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        })
            .then(response => {
                const data = response.data;
                console.log(data);
                window.open('/', '_self');
                alert("You have sucessfully registered.");
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    alert('The value you entered is not valid.')
                }
            });
        console.log(username, password, email, birthday);
    };


    return (
        <Row className="reg-margin-top justify-content-md-center">
            <Col sm={12} md={6} lg={6} xl={4}>
                <Form.Group>
                    <Form.Label controlid="username">Username: </Form.Label>
                    <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label controlid="password">Password: </Form.Label>
                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label controlid="email">eMail: </Form.Label>
                    <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label controlid="birthday">Date of Birth: </Form.Label>
                    <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
                </Form.Group>

                <Button variant="danger" type="submit" onClick={handleSubmit}>Submit</Button>
                {' '}
                <Link to="/">
                    <Button variant="secondary" type="button">Back</Button>
                </Link>
            </Col>
        </Row>
    );

}

