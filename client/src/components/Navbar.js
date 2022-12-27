import {BrowserRouter as Router, Link } from 'react-router-dom'
import {NavLink} from 'react-router-dom'
import '../css/Navbar.css'

const Navbar = () => {

    return (
        <nav > 
            <ul >
                
                <li><NavLink to="/" exact activeClassName="active">Home</NavLink></li>
               
                {/* <li><NavLink to="/search" activeClassName="active">Search</NavLink></li> */}
                
                <li><NavLink to="/list" activeClassName="active" >Employee Table</NavLink></li>

                <li><NavLink to="/upcomingRetirement" activeClassName="active" >Upcoming Retirement</NavLink></li>
               
                <li><NavLink to="/addEmployee" activeClassName="active">Add Employee</NavLink></li>
            </ul>        
        </nav>
    )

    
}

export default Navbar;