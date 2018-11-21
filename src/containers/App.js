import React from 'react'
import {
  BrowserRouter as Router,
  Route, Redirect, Switch
} from 'react-router-dom'

import Menu from '../components/Menu'
import Home from '../components/Home'
import PostsContainer from './PostsContainer'
import StaticPages from './StaticPages'

import {user1, user2} from '../auth/user'
import content from '../styles/content.css'

const user = user1


const App = () => (
  <Router>
    <div>
      <Menu counter={1} user={user}/>
      <div className='content'>
        <div className="column left"></div>
        <div className="column middle">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/posts" component={(props)=> <PostsContainer{...props} user={user}/>}/>
            <Route path="/posts/:id" component={(props)=> <PostsContainer{...props} user={user}/>}/>
            <Route path="/contacts" component={(props)=> <StaticPages{...props} user={user}/>}/>
            <Route path="/about" component={(props)=> <StaticPages{...props} user={user}/>}/>
            <Redirect from='*' to='/' />
          </Switch>
        </div>
        <div className="column right"></div>
      </div>
    </div>
  </Router>
)

export default App;