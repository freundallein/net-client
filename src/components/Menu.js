import React from 'react';
import { NavLink } from 'react-router-dom'
import { isAuthenticated } from '../auth/permissions'
// import LoginForm from './LoginForm'

const Menu = (props) => {
    return <nav className="navbar navbar-inverse">
        <div className="container-fluid">
            <div className="navbar-header">
                <a className="navbar-brand" href="#">Net freund</a>{props.counter}
            </div>
            <ul className="nav navbar-nav">
                <li key='menu0'><NavLink to='/'>Home</NavLink></li>
                <li key='menu1'><NavLink to='/posts'>Posts</NavLink></li>
                <li key='menu2'><NavLink to='/patterns'>Patterns</NavLink></li>
                <li key='menu3'><NavLink to='/contacts'>Contacts</NavLink></li>
                <li key='menu4'><NavLink to='/about'>About</NavLink></li>
            </ul>

            {!isAuthenticated(props.user) &&
                <ul className="nav navbar-nav navbar-right">
                    {/* <LoginForm user={props.user}/> */}
                    <li><a href="#" onClick={() => console.log('signup')}><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
                    <li><a href="#" onClick={() => console.log('login')}><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                </ul>
            }
            {isAuthenticated(props.user) &&
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="#" onClick={() => props.logout()}>Logout <span className="glyphicon glyphicon-log-in"></span></a></li>
                </ul>
            }
        </div>
    </nav>
}

export default Menu;