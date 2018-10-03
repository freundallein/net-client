import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Menu from '../components/Menu'
import Home from '../components/Home'
import Posts from '../components/Posts'
import Post from '../components/Post'
import About from '../components/About'
import Contacts from '../components/Contacts'
import {user1, user2} from '../auth/user'
import content from '../styles/content.css'

const user = user1

const postdata = [
  {objectID:1, date:"2018-02-02 13:44", author:"freund", title:"Post1", data: "If a component is using multiple mixins and several mixins define the same lifecycle method (i.e. several mixins want to do some cleanup when the component is destroyed), all of the lifecycle methods are guaranteed to be called. Methods defined on mixins run in the order mixins were listed, followed by a method call on the component. We don’t recommend using indexes for keys if the order of items may change. This can negatively impact performance and may cause issues with component state. Check out Robin Pokorny’s article for an in-depth explanation on the negative impacts of using an index as a key. If you choose not to assign an explicit key to list items then React will default to using indexes as keys."},
  {objectID:2, date:"2018-02-02 11:44", author:"freund", title:"Post2", data: "We don’t recommend using indexes for keys if the order of items may change. This can negatively impact performance and may cause issues with component state. Check out Robin Pokorny’s article for an in-depth explanation on the negative impacts of using an index as a key. If you choose not to assign an explicit key to list items then React will default to using indexes as keys."},
  {objectID:3, date:"2018-02-02 12:44", author:"freund", title:"Post3", data: "If a component is using multiple mixins and several mixins define the same lifecycle method (i.e. several mixins want to do some cleanup when the component is destroyed), all of the lifecycle methods are guaranteed to be called. Methods defined on mixins run in the order mixins were listed, followed by a method call on the component.. We don’t recommend using indexes for keys if the order of items may change. This can negatively impact performance and may cause issues with component state. Check out Robin Pokorny’s article for an in-depth explanation on the negative impacts of using an index as a key. If you choose not to assign an explicit key to list items then React will default to using indexes as keys."}
]


const App = () => (
  <Router>
    <div>
      <Menu counter={1} user={user}/>
      <div className='content'>
        <div className="column left"></div>
        <div className="column middle">
          <Route exact path="/" component={Home}/>
          <Route exact path="/posts" render={(props)=> <Posts{...props} posts={postdata} user={user}/> }/>
          <Route path="/posts/:id" render={(props)=> <Post{...props} posts={postdata} user={user}/> }/>
          <Route path="/contacts" component={Contacts}/>
          <Route path="/about" component={About}/>
        </div>
        <div className="column right"></div>
      </div>
      
    </div>
  </Router>
)

export default App;