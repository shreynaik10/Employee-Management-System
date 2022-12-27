import {BrowserRouter as Router, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import PageRoutes from './PageRoutes'

export default function Page(){
    return (
        <Router>
            <div>
                <header>
                    <h1>Employee Management Systems</h1>
                    <Navbar />
                </header>
                
                <PageRoutes />
            </div>
        </Router>
    )
}