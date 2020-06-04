import React, { Component } from 'react';
// import { Link } from 'react-router-dom'; Alternative way to route to fullpost
import axios from '../../../axios';
import { Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import './Posts.css';


class Posts extends Component {
  state = {
    posts: []
  }

  componentDidMount () {
    axios.get('/posts')
      .then(response => {
        const rawPosts = response.data.slice(0,4);
        const posts = rawPosts.map(post => {
          return {
            ...post,
            author: 'Silveste'
          }
        });
        this.setState({posts})
      })
      .catch(e => {
        console.log(e);
      });
  }

  postSelectedHandler = (id) => {
    this.props.history.push(`${this.props.match.url}/${id}`)
  }

  render () {
    const posts = this.state.posts.map(post => {
      /* Alternative way to route to fullpost
      return (
        <Link key={post.id} to={`/${post.id}`}>
          <Post
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
        </Link>
      )
      */
      return (
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.postSelectedHandler(post.id)}
        />
      )
    });
    return (
      <div>
        <section className = "Posts">
          {posts}
        </section>
        <Route path={`${this.props.match.url}/:id`} component={FullPost} />
      </div>
    )
  }
}

export default Posts
