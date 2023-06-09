import React, { useEffect, useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import Register from '../Auth/Register'
import Login from '../Auth/Login'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, logoutUser } from '../../features/authSlice'
function Header() {

    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()
    const [reg, setReg] = useState(false)
    const [log, setLog] = useState(false)
    const { user } = useSelector(state => state.auth)

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

    const logout = () => {
        dispatch(logoutUser())
    }

    return (
        <>
            {
                reg && <Register setLog={setLog} setReg={setReg} />
            }
            {
                log && <Login setLog={setLog} />
            }
            <div className="header">
                <div className='container'>
                    <div className="header__wrapper">
                        <Link to="/">
                            <div className="logo">Blog</div>
                        </Link>
                        <ul className="menu">
                            {
                                isAuth ?
                                    <>
                                        <li className="menu__item"><Link to="/newpost" className="menu__link">New Post</Link></li>
                                        <li className="user__name">{user.username}</li>
                                        <li onClick={logout} className="user__name">Logout</li>
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