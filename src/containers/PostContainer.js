import React from 'react'
import Error from '../components/Error'
import Post from '../components/Post'
import { isAllowed } from '../auth/permissions'

const postdata = [
  { objectID: 1, published: true, date: "2018-02-02 11:44", author: "freund", title: "Post1", data: "If a component is using multiple mixins and several mixins define the same lifecycle method (i.e. several mixins want to do some cleanup when the component is destroyed), all of the lifecycle methods are guaranteed to be called. Methods defined on mixins run in the order mixins were listed, followed by a method call on the component. We don’t recommend using indexes for keys if the order of items may change. This can negatively impact performance and may cause issues with component state. Check out Robin Pokorny’s article for an in-depth explanation on the negative impacts of using an index as a key. If you choose not to assign an explicit key to list items then React will default to using indexes as keys." },
  { objectID: 2, published: true, date: "2018-02-02 12:44", author: "freund", title: "Post2", data: "We don’t recommend using indexes for keys if the order of items may change. This can negatively impact performance and may cause issues with component state. Check out Robin Pokorny’s article for an in-depth explanation on the negative impacts of using an index as a key. If you choose not to assign an explicit key to list items then React will default to using indexes as keys." },
  { objectID: 3, published: false, date: "2018-02-02 13:44", author: "freund", title: "Post3", data: "If a component is using multiple mixins and several mixins define the same lifecycle method (i.e. several mixins want to do some cleanup when the component is destroyed), all of the lifecycle methods are guaranteed to be called. Methods defined on mixins run in the order mixins were listed, followed by a method call on the component.. We don’t recommend using indexes for keys if the order of items may change. This can negatively impact performance and may cause issues with component state. Check out Robin Pokorny’s article for an in-depth explanation on the negative impacts of using an index as a key. If you choose not to assign an explicit key to list items then React will default to using indexes as keys." },
  { objectID: 4, published: true, date: "2018-02-02 14:44", author: "freund", title: "Post4", data: "If a component is using multiple mixins and several mixins define the same lifecycle method (i.e. several mixins want to do some cleanup when the component is destroyed), all of the lifecycle methods are guaranteed to be called. Methods defined on mixins run in the order mixins were listed, followed by a method call on the component.. We don’t recommend using indexes for keys if the order of items may change. This can negatively impact performance and may cause issues with component state. Check out Robin Pokorny’s article for an in-depth explanation on the negative impacts of using an index as a key. If you choose not to assign an explicit key to list items then React will default to using indexes as keys." },
]

class PostsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      posts: null,
      post: null,
      error: null
    };
  }

  componentWillMount() {
    const id = Number(this.props.match.params.id)
    if (id) {
      this.getPostById(this.props.match.params.id)
    }
  }

  getPostById(id) {
    console.log(`GET http://0.0.0.0:8002/api/v0/posts/${id}`)
    this.setState({ isLoading: true });
    this.setState({ post: postdata[id - 1], isLoading: false })
    // fetch(`http://0.0.0.0:8002/api/v0/posts/${id}`)
    //   .then(response => {
    //     if (response.ok) {
    //       return response.json();
    //     } else {
    //       throw new Error('Something went wrong')
    //     }
    //   })
    //   .then(data => this.setState({ post: data, isLoading: false }))
    //   .catch(error => this.setState({ error, isLoading: false }));
  }

  updatePost(user) {
    return (post) => {
      console.log(`update post ${user.name}-${post.title}-${post.data}-${post.published}`)
      console.log(`PUT http://0.0.0.0:8002/api/v0/posts`)
      // fetch(`http://0.0.0.0:8002/api/v0/posts`, {
      //     method: 'PUT',
      //     body: JSON.stringify({
      //       author: userName,
      //       title: post.title,
      //       data: post.data,
      //     })
      // })
      // .then(response => response.json())
    }
  }

  deletePost(id) {
    console.log(`delete post ${id}`)
    console.log(`DELETE http://0.0.0.0:8002/api/v0/posts`)
    // fetch(`http://0.0.0.0:8002/api/v0/posts`, {
    //   method: 'DELETE',
    //   body: JSON.stringify({
    //     id: id,
    //   })
    // })
  }

  render() {
    const { isLoading, error } = this.state;
    if (error) {
      return <p>{error.message}</p>;
    }
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    const post = this.state.post
    if (post && isAllowed(this.props.user, ['posts_crud'])) {
      return <div><Post{...this.props} post={post}
        updatePost={this.updatePost(this.props.user)}
        deletePost={this.deletePost} /></div>
    } else if (post && this.state.post['published'] === true) {
      return <div><Post{...this.props} post={post}
        updatePost={this.updatePost(this.props.user)}
        deletePost={this.deletePost} /></div>
    }
    return <Error {...this.props} error={"No such post"}/>
  }
}

export default PostsContainer;
