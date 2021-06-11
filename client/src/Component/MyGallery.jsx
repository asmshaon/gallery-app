import React from "react";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import GalleryImages from "./GalleryImages";
import UploadForm from "./Upload";

export default class MyGallery extends React.Component {
    constructor(props) {
        super(props);

        try {
            JSON.parse(localStorage.getItem('user'))
        } catch (error) {
            window.location.href = '/'
        }

        this.state = {
            selectedFile: null,
            user: JSON.parse(localStorage.getItem('user')),
            images: []
        };

        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleSuccessUpload = this.handleSuccessUpload.bind(this);
    }

    handleLogoutClick() {
        axios({
            method: 'post',
            url: 'http://localhost:8080/user/logout',
            headers: {
                access_token: this.state.user.access_token
            }
        })
        .then(() => {
            this.props.handleLogout();
        })
        .catch(error => {
            console.log("login error", error);
        });
    }

    getData() {
        axios.get('http://localhost:8080/gallery/home', {
            headers: {
                access_token: this.state.user.access_token
            }
        }).then(response => {
            this.setState({images: response.data});
        })
    }

    componentDidMount() {
        this.getData();
    }

    handleSuccessUpload() {
        this.getData();
    }

    render() {
        return (
            <div>
                <div className="form-group row header">
                    <div className="col-6 text-left">
                        <h1 className="header text-left">Gallery App</h1>
                    </div>
                    <div className="col-6 text-right">
                        <span className="welcome-text">Hi, {this.state.user.username}</span>
                        <button className="btn btn-danger" onClick={() => this.handleLogoutClick()}>Logout</button>
                    </div>
                </div>

                <div>
                    <UploadForm handleSuccessUpload={this.handleSuccessUpload} />
                    <GalleryImages images={this.state.images}/>
                </div>
            </div>
        );
    }
};
