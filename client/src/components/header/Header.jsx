import React, { useEffect, useState } from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
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
    const nav = useNavigate()

    const [submenu, setSunmenu] = useState(false)

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
        nav("/")
    }

    return (
        <>
            {
                isAuth && submenu && <div onClick={() => setSunmenu(false)} className="overlay2"></div>
            }
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
                                        <li onClick={() => setSunmenu(!submenu)} className="user__name">{user.username}
                                            {
                                                submenu &&
                                                <div>
                                                    <ul className="submenu__content">
                                                        <li className="submenu__item"><Link to="/profile" className="menu__link">Profile</Link></li>
                                                        <li className="submenu__item"><Link to="/newpost" className="menu__link">New Post</Link></li>
                                                        <li onClick={logout} className="submenu__item">Logout</li>
                                                    </ul>
                                                </div>
                                            }
                                        </li>
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