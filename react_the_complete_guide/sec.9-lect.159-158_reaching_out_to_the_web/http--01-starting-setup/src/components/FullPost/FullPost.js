import React, { Component } from 'react';
import axios from '../../axios'; //Importing remoteOne instance

import './FullPost.css';

class FullPost extends Component {
    state = {
      dataLoaded: null
    }
    componentDidUpdate () {
      if (this.state.dataLoaded && this.state.dataLoaded.id === this.props.id) {
        return;
      }
      if (this.props.id) {
        axios.get(`/posts/${this.props.id}`)
          .then(response => {
            this.setState({dataLoaded: response.data});
          });
      }
    }

    deletePostHandler = () => {
      const  { id } = this.state;
      console.log('deleting...');
      axios.delete(`/posts/${id}`)
        .then(response => {
          if (response.status === 200) {
            console.log('Deleted');
            //Needs to update the state in Blog compoenent
            this.setState({dataLoaded: null});
          } else {
            console.log('Ups...')
          }

        });
    }
    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.props.id) {
          post = <p style={{textAlign: 'center'}}>Loading...</p>;
        }
        if (this.state.dataLoaded) {
          post = (
              <div className="FullPost">
                  <h1>{this.state.dataLoaded.title}</h1>
                  <p>{this.state.dataLoaded.body}</p>
                  <div className="Edit">
                      <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                  </div>
              </div>

          );
        }
        return post;
    }
}

export default FullPost;
