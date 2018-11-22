import React from 'react'
import {
  BrowserRouter as Router,
  Route, Redirect, Switch
} from 'react-router-dom'

import Menu from '../components/Menu'
import Home from '../components/Home'
import PostsContainer from './PostsContainer'
import PostContainer from './PostContainer'
import StaticPages from './StaticPages'
import Error from '../components/Error'

import { user1, user2 } from '../auth/user'
import content from '../styles/content.css'

// const user = user1

const getUser = (user) => {
  console.log('usered')
  if (user) {
    return user1
  }
  return user1
}
const user = getUser()

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  login() {
    console.log('login')
  }

  logout() {
    console.log('logout')
  }

  render() {
    const user = this.state.user
    return (
      <Router>
        <div>
          <Menu counter={1} user={user} logout={this.logout} login={this.login}/>
          <div className='content'>
            <div className="column left"></div>
            <div className="column middle">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/posts" component={(props) => <PostsContainer{...props} user={user} />} />
                <Route path="/posts/:id" component={(props) => <PostContainer{...props} user={user} />} />
                <Route path="/patterns" component={(props) => <StaticPages{...props} user={user} />} />
                <Route path="/contacts" component={(props) => <StaticPages{...props} user={user} />} />
                <Route path="/about" component={(props) => <StaticPages{...props} user={user} />} />
                <Route path="/error" component={(props) => <Error{...props} />} />
                <Redirect from='*' to='/' />
              </Switch>
            </div>
            <div className="column right"></div>
          </div>
        </div>
      </Router>
    )
  }
};
export default App;