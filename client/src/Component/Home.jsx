import React from 'react';
import LoginForm from './Login';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    }

    handleSuccessfulLogin(data) {
        this.props.handleLogin(data);
        this.props.history.push("/my-gallery");
    }

    render() {
        return (
            <div>
                <LoginForm handleSuccessfulLogin={this.handleSuccessfulLogin} />
            </div>
        );
    }
}
