import React from 'react';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        const {email, password} = this.state;
        let formData = new FormData();

        formData.append('email', email);
        formData.append('password', password);

        axios({
            method: "post",
            url: "http://localhost:8080/user/login",
            data: formData
        })
        .then(response => {
            localStorage.setItem('user', JSON.stringify(response.data));
            this.props.handleSuccessfulLogin(response.data);
        })
        .catch(() => {
            alert('Username or Password is incorrect');
        });

        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Container className="p-3">
                    <Jumbotron>
                        <h1 className="header text-center">Gallery App</h1>
                        <hr />
                        <p className="text-center">
                            <strong className="m-b-15">Login into your account</strong>
                        </p>

                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group row">
                                <label htmlFor="email" className="col-sm-3 col-form-label text-right">Email <span
                                    className="star">*</span></label>
                                <div className="col-sm-9">
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter Email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="password" className="col-sm-3 col-form-label text-right">Password <span
                                    className="star">*</span></label>
                                <div className="col-sm-9">
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter Password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <button className="btn btn-success btn-lg pull-right login-btn" type="submit">Login</button>
                        </form>
                    </Jumbotron>
                </Container>
            </div>
        );
    }
}
