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
import LoginForm from '../components/LoginForm'
import Error from '../components/Error'

import content from '../styles/content.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  login(user) {
    this.setState({ user: user });
  }

  logout() {
    this.setState({ user: null });
  }

  render() {
    const user = this.state.user
    return (
      <Router>
        <div>
          <Route path="/" component={(props) => <Menu{...props} user={user} logout={this.logout.bind(this)} />} />
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
                <Route path="/login" component={(props) => <LoginForm {...props} login={this.login.bind(this)} />} />
                <Route path="/signup" component={(props) => <Error{...props} />} />
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