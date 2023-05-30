import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
function Header() {
    return (
        <div className="header">
            <div className='container'>
                <div className="header__wrapper">
                    <div className="logo">Blog</div>
                    <ul className="menu">
                        <li className="menu__item"><Link to="/profile" className="menu__link">Profile</Link></li>
                        <li className="user__name">Username</li>
                    </ul >
                </div>
            </div >
        </div>
    )
}

export default Header