import React from 'react';
import axios from 'axios';

export default class UploadForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedFile: null,
            user: JSON.parse(localStorage.getItem('user'))
        };
    }

    onFileChange = event => {
        // Update the state
        this.setState({selectedFile: event.target.files[0]});
    };

    onFileUpload = (event) => {
        const formData = new FormData();
        // Update the formData object
        if (this.state.selectedFile === null) {
            alert('Please select a file')
            return false;
        }

        formData.append(
            "image",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        axios({
            method: "post",
            url: 'http://localhost:8080/gallery/upload',
            data: formData,
            headers: {
                access_token: this.state.user.access_token
            }
        })
        .then(() => {
            this.setState({
                selectedFile: null
            });
            this.props.handleSuccessUpload()
        })
        .catch(() => {
            alert('Upload failed! please try again')
        });
    };

    render() {
        return (
            <div>
                <div className="upload-bar">
                    <input type="file" onChange={this.onFileChange} onClick={e => (e.target.value = null)} accept='.jpg,.png,.jpeg' />
                    <button className="btn btn-success btn-lg" onClick={this.onFileUpload}>
                        Add to Gallery
                    </button>
                </div>
            </div>
        )
    }
}
