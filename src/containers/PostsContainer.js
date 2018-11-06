import React from 'react'
import Posts from '../components/Posts'
import Post from '../components/Post'

const postdata = [
    {objectID:1, date:"2018-02-02 13:44", author:"freund", title:"Post1", data: "If a component is using multiple mixins and several mixins define the same lifecycle method (i.e. several mixins want to do some cleanup when the component is destroyed), all of the lifecycle methods are guaranteed to be called. Methods defined on mixins run in the order mixins were listed, followed by a method call on the component. We don’t recommend using indexes for keys if the order of items may change. This can negatively impact performance and may cause issues with component state. Check out Robin Pokorny’s article for an in-depth explanation on the negative impacts of using an index as a key. If you choose not to assign an explicit key to list items then React will default to using indexes as keys."},
    {objectID:2, date:"2018-02-02 11:44", author:"freund", title:"Post2", data: "We don’t recommend using indexes for keys if the order of items may change. This can negatively impact performance and may cause issues with component state. Check out Robin Pokorny’s article for an in-depth explanation on the negative impacts of using an index as a key. If you choose not to assign an explicit key to list items then React will default to using indexes as keys."},
    {objectID:3, date:"2018-02-02 12:44", author:"freund", title:"Post3", data: "If a component is using multiple mixins and several mixins define the same lifecycle method (i.e. several mixins want to do some cleanup when the component is destroyed), all of the lifecycle methods are guaranteed to be called. Methods defined on mixins run in the order mixins were listed, followed by a method call on the component.. We don’t recommend using indexes for keys if the order of items may change. This can negatively impact performance and may cause issues with component state. Check out Robin Pokorny’s article for an in-depth explanation on the negative impacts of using an index as a key. If you choose not to assign an explicit key to list items then React will default to using indexes as keys."}
  ]

class PostsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: false,
      posts: null,
      error: null
    };

  }

  componentDidMount (){
    this.getPosts()
  }
  
  getPosts(){
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
  post(){
    fetch('https://mywebsite.com/endpoint/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
      })
    })
  }

  render() {
      //   const posts = this.state.posts;
      const posts = postdata;
      const props = this.props
      const {isLoading, error}  = this.state;
      
      if (error) {
        return <p>{error.message}</p>;
      }
      if (isLoading) {
        return <p>Loading ...</p>;
      }
      if (this.props.match.params.id) {
        return <div><Post{...props} posts={posts} /></div>
      }
      return <div><Posts{...props} posts={posts} /></div>
    }
}

export default PostsContainer;
