import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Menu from '../components/Menu'
import Home from '../components/Home'
import About from '../components/About'
import Contacts from '../components/Contacts'
import {user1, user2} from '../auth/user'
import content from '../styles/content.css'
import PostsContainer from './PostsContainer'

const user = user1


const App = () => (
  <Router>
    <div>
      <Menu counter={1} user={user}/>
      <div className='content'>
        <div className="column left"></div>
        <div className="column middle">
          <Route exact path="/" component={Home}/>
          <Route exact path="/posts" component={(props)=> <PostsContainer{...props} user={user}/>}/>
          <Route path="/posts/:id" component={(props)=> <PostsContainer{...props} user={user}/>}/>
          <Route path="/contacts" component={Contacts}/>
          <Route path="/about" component={About}/>
        </div>
        <div className="column right"></div>
      </div>
      
    </div>
  </Router>
)

export default App;