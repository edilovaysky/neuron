import './FileLoader.scss';

import React, { Component } from 'react';
import axios from 'axios';

export class FileLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadStatus: false,
      imageURL: '',
    };
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleUploadImage(ev) {
    ev.preventDefault();
    const { userId } = this.props;

    const data = new FormData();
    data.append('name', this.uploadInput.files[0]);
    //data.append('filename', this.fileName.value);
    data.append('userId', userId);
    console.log(data);

    axios
      .put('http://localhost:8888/upload/udoc', data)
      .then(function(response) {
        this.setState({
          imageURL: `http://localhost:8888/${body.file}`,
          uploadStatus: true,
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    return (
      <>
        <div className="container">
          <form onSubmit={this.handleUploadImage}>
            <div className="form-group">
              <input
                className="form-control"
                ref={ref => {
                  this.uploadInput = ref;
                }}
                type="file"
              />
            </div>
            <button className="btn btn-success">загрузить</button>
          </form>
        </div>
      </>
    );
  }
}
