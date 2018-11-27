import React from 'react';
import { NavLink } from 'react-router-dom'
import { isAuthenticated } from '../auth/permissions'
import LoginForm from './LoginForm'

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }
    toggleModal() {
        this.setState({ isOpen: !this.state.isOpen });
    }
    render() {
        return <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">Net freund</a>{this.props.counter}
                </div>
                <ul className="nav navbar-nav">
                    <li key='menu0'><NavLink to='/'>Home</NavLink></li>
                    <li key='menu1'><NavLink to='/posts'>Posts</NavLink></li>
                    <li key='menu2'><NavLink to='/patterns'>Patterns</NavLink></li>
                    <li key='menu3'><NavLink to='/contacts'>Contacts</NavLink></li>
                    <li key='menu4'><NavLink to='/about'>About</NavLink></li>
                </ul>

                {!isAuthenticated(this.props.user) &&
                    <ul className="nav navbar-nav navbar-right">
                        {/* <li><a href="#" onClick={() => this.props.history.push('/signup')}><span className="glyphicon glyphicon-user"></span> Sign Up</a></li> */}
                        <li><a href="#" onClick={() => this.props.history.push('/login')}><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                    </ul>
                }
                {isAuthenticated(this.props.user) &&
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="#">{this.props.user.name}</a></li>
                        <li><a href="#" onClick={() => this.props.logout()}>Logout <span className="glyphicon glyphicon-log-in"></span></a></li>
                    </ul>
                }
            </div>
        </nav>
    }
}
export default Menu;