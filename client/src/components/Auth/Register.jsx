import React, { useState } from 'react'
import { Formik, Field, Form } from "formik"
import * as Yup from 'yup'
import './Auth.css'
import axios from "axios"

const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, 'At least 3 letters!')
        .max(20, 'Max is 20 letters!')
        .required('Username is required'),
    password: Yup.string()
        .min(8, 'At least 8 letters!')
        .max(16, 'Max is 16 letters!')
        .required('Password is required'),
});


function Register({ setLog, setReg }) {
    const [err, setErr] = useState(null)

    return (
        <div className="auth__modal">
            <div onClick={() => setReg(false)} className="overlay"></div>
            <div className="register auth">
                <div onClick={() => setReg(false)} className="close">X</div>
                <h2 className="auth__title">Sign up</h2>
                <Formik
                    initialValues={{ username: "", password: "" }}
                    validationSchema={SignupSchema}
                    onSubmit={async (values) => {
                        try {
                            await axios.post("/auth/register", values)
                            setReg(false)
                            setLog(true)
                        }
                        catch (error) {
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
                            <button className="form__btn" type="submit">Sign Up</button>
                            {err && <div style={{ color: "red", textAlign: "center" }}>*{err}</div>}
                        </Form>
                    )}
                </Formik>
            </div>
        </div >
    )
}

export default Register