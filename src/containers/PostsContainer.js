import React from 'react'
import Posts from '../components/Posts'
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
    this.getPosts()
  }

  getPosts() {
    this.setState({ isLoading: true });
    this.setState({ posts: postdata, isLoading: false })
    console.log(`GET http://0.0.0.0:8002/api/v0/posts`)
    // fetch('http://0.0.0.0:8002/api/v0/posts')
    //   .then(response => {
    //     if (response.ok) {
    //       return response.json();
    //     } else {
    //       throw new Error('Something went wrong')
    //     }
    //   })
    //   .then(data => this.setState({ posts: data, isLoading: false }))
    //   .catch(error => this.setState({ error, isLoading: false }));
  }

  createPost(user) {
    return (post) => {
      console.log(`create post ${user.name}-${post.title}-${post.data}-${post.published}`)
      console.log(`POST http://0.0.0.0:8002/api/v0/posts`)
      // fetch(`http://0.0.0.0:8002/api/v0/posts`, {
      //     method: 'PUT',
      //     body: JSON.stringify({
      //       author: userName,
      //       title: post.title,
      //       data: post.data,
      //     })
      // })
    }
  }

  render() {
    const { isLoading, error } = this.state;
    if (error) {
      return <p>{error.message}</p>;
    }
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    var posts = []
    if  (isAllowed(this.props.user, ['posts_crud'])){
      posts = this.state.posts
    } else if (this.state.posts) {
      posts = this.state.posts.filter((item) => item['published'] === true);
    }

    return <div><Posts{...this.props} posts={posts}
      createPost={this.createPost(this.props.user)} /></div>
  }
}

export default PostsContainer;
