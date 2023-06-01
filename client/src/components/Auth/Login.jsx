import React from 'react'
import { Formik, Field, Form } from "formik";
import * as Yup from 'yup';
import './Auth.css'

const LoginSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
    password: Yup.string()
        .required('Password is required'),
});



function Login({ setLog }) {
    return (
        <div className="auth__modal">
            <div onClick={() => setLog(false)} className="overlay"></div>
            <div className="register auth">
                <div onClick={() => setLog(false)} className="close">X</div>
                <h2 className="auth__title">Login</h2>
                <Formik
                    initialValues={{ name: "", password: "" }}
                    validationSchema={LoginSchema}
                    onSubmit={async (values) => {
                        await new Promise((resolve) => setTimeout(resolve, 500));
                        alert(JSON.stringify(values, null, 2));
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className={errors.name || touched.name || errors.password || touched.password ? `form yup` : `form`}>
                            <Field className="form__input" name="name" type="text" placeholder="Username" />
                            {errors.name && touched.name ? (
                                <div style={{ color: "red" }}>*{errors.name}</div>
                            ) : null}
                            <Field className="form__input" name="password" type="password" placeholder="Password" />
                            {errors.password && touched.password ? (
                                <div style={{ color: "red" }}>*{errors.password}</div>
                            ) : null}
                            <button className="form__btn" type="submit">Sign In</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div >
    )
}

export default Login