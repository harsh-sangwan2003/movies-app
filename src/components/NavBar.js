import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class NavBar extends Component {
    render() {
        return (
            <div style={{ display: 'flex', alignItems: 'center', padding: '0.2rem' }}>
                <Link to="/" style={{ textDecoration: 'none' }}><h1>Movies App</h1></Link>
                <Link to="/favourites" style={{ textDecoration: 'none' }}><h2 style={{ marginLeft: '1rem' }}>Favourites</h2></Link>
            </div>
        )
    }
}

export default NavBar