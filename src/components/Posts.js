import React from 'react'
import { NavLink } from 'react-router-dom'
import ModalPost from './EditPost'
import { isAllowed } from '../auth/permissions'



const ShortPost = (post, user) => {
  const text = (post.data.length > 500) ? post.data.substr(0, 500) : post.data;
  return (
    <li key={post.objectID}>
      <h3><NavLink to={'/posts/' + post.objectID}>{post.title}</NavLink></h3>
      <div>{post.date} - {post.author}</div>
      {isAllowed(user, ['posts_crud']) && !post.published && <div><b>Not published</b></div>}
      <br />
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


  toggleModal() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const posts = this.props.posts
    const { isLoading, error } = this.state;
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
          </div>
        }
        {!this.state.isOpen &&
          <ul>
            {posts.map(post => ShortPost(post, this.props.user))}
          </ul>
        }
        {this.state.isOpen &&
          <div>
            <br />
            <ModalPost
              show={this.state.isOpen}
              onClose={this.toggleModal}
              createPost={this.props.createPost}
            />
          </div>
        }
      </div>)
  }
}

export default Posts;
