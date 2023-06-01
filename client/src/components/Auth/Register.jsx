import React from 'react'
import { Formik, Field, Form } from "formik";
import * as Yup from 'yup';
import './Auth.css'

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'At least 3 letters!')
        .max(20, 'Max is 20 letters!')
        .required('Name is required'),
    password: Yup.string()
        .min(8, 'At least 8 letters!')
        .max(16, 'Max is 16 letters!')
        .required('Password is required'),
});



function Register({ setReg }) {
    return (
        <div className="auth__modal">
            <div onClick={() => setReg(false)} className="overlay"></div>
            <div className="register auth">
                <div onClick={() => setReg(false)} className="close">X</div>
                <h2 className="auth__title">Sign up</h2>
                <Formik
                    initialValues={{ name: "", password: "" }}
                    validationSchema={SignupSchema}
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
                            <button className="form__btn" type="submit">Sign Up</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div >
    )
}

export default Register