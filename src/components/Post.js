import React from 'react';

import ModalPost from './ModalPost'
import {isAllowed} from '../auth/permissions'

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        isOpen: false
      };
    this.toggleModal = this.toggleModal.bind(this)
    this.tryToDelete = this.tryToDelete.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }
  toggleModal () {
    this.setState({isOpen: !this.state.isOpen});
  }

  tryToDelete(){
    if (window.confirm('Are you sure you wish to delete this item?')){
        this.onDelete()
    } else{
        console.log('canceled')
    }
  }

  onDelete(){
    console.log('delete')
  }

  render() {
    const id = this.props.match.params.id
    const post = this.props.posts.filter((item)=> item.objectID == id)[0]
    return (
      <div>
          {isAllowed(this.props.user, ['posts_crud']) &&  
          <div>
            <button className="btn btn-warning" onClick={this.toggleModal}>Edit post</button>
            <button className="btn btn-danger" onClick={this.tryToDelete}>Delete post</button>
            <ModalPost 
                show={this.state.isOpen} 
                title={post.title}
                data={post.data}
                onClose={this.toggleModal}
            />
          </div>}
        <h3>{post.title}</h3>
        <div>{post.date} - {post.author}</div>
        <br/>
        <div>{post.data}</div>
      </div>
    );
  }
}


export default Post;