import React, { useEffect, useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import Register from '../Auth/Register'
import Login from '../Auth/Login'
function Header() {

    const [isLogin, setIsLogin] = useState(false)
    const [reg, setReg] = useState(false)
    const [log, setLog] = useState(false)

    useEffect(() => {
        const body = document.querySelector('body')
        if (reg === true || log === true) {
            body.style.overflow = "hidden"
            body.style.marginRight = "15px"
        }
        else {
            body.style.overflow = ""
            body.style.marginRight = ""
        }
    }, [reg, log])

    return (
        <>
            {
                reg && <Register setReg={setReg} />
            }
            {
                log && <Login setLog={setLog} />
            }
            <div className="header">
                <div className='container'>
                    <div className="header__wrapper">
                        <div className="logo">Blog</div>
                        <ul className="menu">
                            {
                                isLogin ?
                                    <>
                                        <li className="menu__item"><Link to="/profile" className="menu__link">Profile</Link></li>
                                        <li className="user__name">Username</li>
                                    </>
                                    :
                                    <>
                                        <button onClick={() => setLog(true)} className="header__btn2">Log In</button>
                                        <button onClick={() => setReg(true)} className="header__btn1">Sign Up</button>
                                    </>
                            }
                        </ul >
                    </div>
                </div >
            </div>
        </>
    )
}

export default Header