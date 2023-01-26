import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavBar extends Component {
  render() {
    return (
      <div style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', marginLeft: '2.5rem' }}>

        <Link to='/' style={{ textDecoration: "none" }}><h1>Movies</h1></Link>
        <Link to='/favourites' style={{ textDecoration: "none" }}><h3 style={{ marginLeft: '1rem', marginTop: '0.3rem' }}>Favourites</h3></Link>

      </div>
    )
  }
}
