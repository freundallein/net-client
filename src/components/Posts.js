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
    };
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal () {
    this.setState({isOpen: !this.state.isOpen});
  }

  render() {
    const posts = this.props.posts
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
