import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";

const Login = () => {
    const navigate = useNavigate();
    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = yup.object({
        email: yup.string().required().email(),
        password: yup.string().required().min(6),
    });

    const onSubmit = async (values) => {
        await signInWithEmailAndPassword(auth, values.email, values.password)
            .then((res) => {
                const user = res.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode == "auth/user-not-found") {
                    alert("Email not found");
                }
                if (errorCode == "auth/wrong-password") {
                    alert("Wrong Password");
                }
            });
    };
    return (
        <>
            <h1>Login</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(props) => {
                    return (
                        <Form autoComplete="off">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field
                                    id="email"
                                    className="input"
                                    name="email"
                                    type="text"
                                    placeholder="Email"
                                />
                                <ErrorMessage name="email">
                                    {(err) => (
                                        <span className="error-message">
                                            {err}
                                        </span>
                                    )}
                                </ErrorMessage>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        id="password"
                                        className="input"
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                    />
                                    <ErrorMessage name="password">
                                        {(err) => (
                                            <span className="error-message">
                                                {err}
                                            </span>
                                        )}
                                    </ErrorMessage>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-add"
                                disabled={!props.isValid || props.isSubmitting}
                            >
                                {props.isSubmitting ? "Please Wait" : "Login"}
                            </button>
                            <span className="text-sm">
                                Belum punya akun?{" "}
                                <Link to={"/register"}>Register</Link>
                            </span>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
};

export default Login;
