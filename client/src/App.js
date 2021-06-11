import React, {Component} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import Home from "./Component/Home";
import MyGallery from "./Component/MyGallery";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.setState({
            user: {}
        });
        localStorage.setItem('user', '');
        window.location.href = '/'
    }

    handleLogin(data) {
        this.setState({
            user: data
        });
    }

    render() {
        return (
            <div className="app">
                <BrowserRouter>
                    <Switch>
                        <Route
                            exact
                            path={"/"}
                            render={props => (
                                <Home
                                    {...props}
                                    handleLogin={this.handleLogin}
                                />
                            )}
                        />
                        <Route
                            exact
                            path={"/my-gallery"}
                            render={props => (
                                <MyGallery
                                    {...props}
                                    handleLogout={this.handleLogout}
                                />
                            )}
                        />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}
