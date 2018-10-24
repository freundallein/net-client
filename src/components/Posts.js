import React from 'react'
import { NavLink } from 'react-router-dom'
import ModalPost from './ModalPost'
import {isAllowed} from '../auth/permissions'



const ShortPost = (post) => {
  const text = (post.data.length > 500)? post.data.substr(0, 500) : post.data;
  return (
      <li key={post.objectID}>
        <h3><NavLink to={'/posts/' + post.objectID}>{post.title}</NavLink></h3>
        <div>{post.date} - {post.author}</div>
        <br/>
        <div>{text}&hellip;</div>
      </li>
      )
}

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isOpen: false,
      isLoading: false,
      posts: null,
      error: null
    };
    this.toggleModal = this.toggleModal.bind(this)
  }

  componentDidMount (){
    this.setState({ isLoading: true });
    fetch('http://0.0.0.0:8002/api/v0/posts')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong')
        }
      })
      .then(data => this.setState({ posts: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  toggleModal () {
    this.setState({isOpen: !this.state.isOpen});
  }

  render() {
    const posts = this.props.posts
    const {isLoading, error}  = this.state;
    if (error) {
      return <p>{error.message}</p>;
    }
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    return (
    <div>
      {isAllowed(this.props.user, ['posts_crud']) && 
        <div>
          <button className="btn btn-primary" onClick={this.toggleModal}>Create post</button>
          <ModalPost 
            show={this.state.isOpen}
            onClose={this.toggleModal}
          />
        </div>
      }
      <ul>
        {posts.map(post => ShortPost(post))} 
      </ul>
    </div>)
  }
}

export default Posts;
