import React, { useEffect, useState } from 'react'
import { Formik, Field, Form } from "formik"
import * as Yup from 'yup'
import './Auth.css'
import { useDispatch, useSelector } from "react-redux"
import { checkIsAuth, loginUser } from '../../features/authSlice'

const LoginSchema = Yup.object().shape({
    username: Yup.string()
        .required('Name is required'),
    password: Yup.string()
        .required('Password is required'),
});



function Login({ setLog }) {
    const dispatch = useDispatch()
    const [err, setErr] = useState(null)
    const isAuth = useSelector(checkIsAuth)
    useEffect(() => {
        if (isAuth) setLog(false)
        else setLog(true)
    }, [isAuth, setLog])
    return (
        <div className="auth__modal">
            <div onClick={() => setLog(false)} className="overlay"></div>
            <div className="register auth">
                <div onClick={() => setLog(false)} className="close">X</div>
                <h2 className="auth__title">Login</h2>
                <Formik
                    initialValues={{ username: "", password: "" }}
                    validationSchema={LoginSchema}
                    onSubmit={(values) => {
                        try {
                            dispatch(loginUser(values))
                        } catch (error) {
                            console.log(error.response.data.message)
                            setErr(error.response.data.message)
                        }

                    }}
                >
                    {({ errors, touched }) => (
                        <Form className={errors.username || touched.username || errors.password || touched.password ? `form yup` : `form`}>
                            <Field className="form__input" name="username" type="text" placeholder="Username" />
                            {errors.username && touched.username ? (
                                <div style={{ color: "red" }}>*{errors.username}</div>
                            ) : null}
                            <Field className="form__input" name="password" type="password" placeholder="Password" />
                            {errors.password && touched.password ? (
                                <div style={{ color: "red" }}>*{errors.password}</div>
                            ) : null}
                            <button className="form__btn" type="submit">Sign In</button>
                            {err && <div style={{ color: "red", textAlign: "center" }}>*{err}</div>}
                        </Form>
                    )}
                </Formik>
            </div>
        </div >
    )
}

export default Login