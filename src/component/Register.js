import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";

const Register = () => {
    const navigate = useNavigate();
    const initialValues = {
        email: "",
        password: "",
        confirmPassword: "",
    };

    const validationSchema = yup.object({
        email: yup.string().required().email(),
        password: yup.string().required().min(6),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "Password must match"),
    });

    const onSubmit = async (values) => {
        await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
        )
            .then((res) => {
                const user = res.user;
                alert("Login Succcessfully");
                navigate("/login");
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode == "auth/email-already-in-use") {
                    return alert("Email already exist");
                }
            });
    };
    return (
        <>
            <h1>Register</h1>
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
                                <div className="form-group">
                                    <label htmlFor="confirm-password">
                                        Confirm Password
                                    </label>
                                    <Field
                                        id="confirm-password"
                                        className="input"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm Password"
                                    />
                                    <ErrorMessage name="confirmPassword">
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
                                {props.isSubmitting
                                    ? "Please Wait"
                                    : "Register"}
                            </button>
                            <span className="text-sm">
                                Sudah punya akun?{" "}
                                <Link to={"/login"}>Login</Link>
                            </span>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
};

export default Register;
