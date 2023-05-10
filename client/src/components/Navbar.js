import React from "react"
import { Link } from "react-router-dom"

export default function Nav(props) {
    const { logout } = props
    return (
        <nav className="navbar">
            <Link to="/profile">Profile</Link>
            <Link to="/public">Public</Link>
            <button onClick={logout}>Logout</button>
        </nav>
    )
}
