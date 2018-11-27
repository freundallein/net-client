import React from 'react';
import { user1, user2 } from '../auth/user'
import content from '../styles/login.css'
class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  validate() {
    return this.state.username != null && this.state.password != null;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validate()) {
      console.log(`POST http://0.0.0.0:8002/api/v0/login`)
      this.props.login(user1)
      this.props.history.push('/')
      // fetch(`http://0.0.0.0:8002/api/v0/login`, {
      //     method: 'POST',
      //     body: JSON.stringify({
      //       username: this.state.username,
      //       password: this.state.password,
      //     })
      // })
      // .then(response => response.json())
    } else {
      console.log('Invalid payload')
    }
  }

  render() {
    return (
      <div id="login">
        <div className="container">
          <div id="login-row" className="row justify-content-center align-items-center">
            <div id="login-column" className="col-md-6">
              <div class="login-box col-md-12">
                <form id="login-form" className="form" onSubmit={this.handleSubmit}>
                  <h3 className="text-center text-dark">Login</h3>
                  <div className="form-group">
                    <label for="username" className="text-dark">Username:</label><br />
                    <input type="text" name="username" id="username" className="form-control" onChange={this.handleUsernameChange}/>
                  </div>
                  <div className="form-group">
                    <label for="password" className="text-dark">Password:</label><br />
                    <input type="text" name="password" id="password" className="form-control" onChange={this.handlePasswordChange} />
                  </div>
                  <div className="form-group">
                    <input type="submit" name="submit" className="btn btn-success btn-md" value="submit" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default LoginForm