import React, { Component } from 'react';
import axios from 'axios';

class LoadScreen extends Component {
  constructor() {
    super()
    this.state = {
      files: []
    }
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  componentDidMount() {
    //Should get an array of objects
    let files = axios.get('/api/file-load');
    this.setState({ files })
  }

  handleClick(id) {
    //lookup the proper object needed to populate state
    let fileState = this.state.files.find(file => {
      return file._id === id;
    });
    this.props.onFileSelection(fileState);
  }
  handleBackButton() {
    this.props.backButton();
  }
  render() {
    return (
      <div className="load-screen">
        <p onClick={this.handleBackButton}>&lt; Back</p>
        <h2>Select a File to Open.</h2>
        <table className="load-table">
          <tr>
            <th>File Name</th>
            <th>Last Updated</th>
          </tr>
          <tr key={'file.id'} onClick={(e) => this.handleClick(e.target.key)} >
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
          </tr>
          <tr>
            <td>Berglunds snabbköp</td>
            <td>Christina Berglund</td>

          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>

          </tr>
          <tr>
            <td>Ernst Handel</td>
            <td>Roland Mendel</td>

          </tr>
          <tr>
            <td>Island Trading</td>
            <td>Helen Bennett</td>

          </tr>

        </table>
      </div >
    )
  }
}

export default LoadScreen;