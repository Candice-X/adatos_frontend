import React from 'react';
import {ImageUpload} from "./ImageUpload";
import {API_ROOT} from "../constants";
import {message} from 'antd';


export class BulbDetection extends React.Component {
  state = {
    result: null,
    filename: null,
    method: "Bulb",
    isUploaded: false
  }

  onUploadSuccess = (filename) => {
    this.setState({filename, isUploaded: true});
    console.log(this.state);
    this.generateResult();
  }

  generateResult = () => {
    if (this.state.method === "Bulb") {
      fetch(`${API_ROOT}/treecounting/bulb`, {
        method: 'POST',
        body: JSON.stringify({
          'filename': this.state.filename
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if (response.status >= 400) {
          response.json().then((error) => {
            message.error(error.message);
          });
        } else {
          response.json().then((response) => {
            message.success(response.message);
            this.setState({
              isUploaded: false,
              result: response.result,
            });
          })
        }
      }).catch((err) => {
        console.log(err.message);
      });
    }

    if (this.state.method === "Unet") {
      fetch('http://localhost:5000/treecounting/unet', {
        method: 'POST',
        body: JSON.stringify(this.state.filename),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        response.json().then((body) => {
          this.setState({
            result: body.result,
          });
        });
      });
    }
  }

  render() {
    return (
      <div className="bulb-detection">
        <ImageUpload onUploadSuccess={this.onUploadSuccess}/>
          <label>Result:
          </label>
        {this.state.isUploaded ?
        <div> in processing...</div> :
        <div>{this.state.result}</div>}

      </div>
    );
  }
}


