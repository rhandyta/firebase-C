import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config";

const AddStudent = () => {
    const navigate = useNavigate();
    const initialValues = {
        name: "",
        email: "",
        address: "",
        major: "",
        telp: "",
    };

    const validationSchema = yup.object({
        name: yup.string().required(),
        email: yup.string().required().email(),
        address: yup.string().required(),
        major: yup.string().required(),
        telp: yup
            .string()
            .required("phone number is required")
            .matches(/^[0-9]+$/, "phone number is not valid"),
    });

    const onSubmit = async (values, props) => {
        await addDoc(collection(db, "students"), {
            name: values.name,
            email: values.email,
            address: values.address,
            major: values.major,
            telp: values.telp,
        });
        navigate("/");
        props.setSubmitting(false);
    };

    return (
        <>
            <h1>Add Student</h1>
            <Formik
                onSubmit={onSubmit}
                validationSchema={validationSchema}
                initialValues={initialValues}
            >
                {(props) => {
                    return (
                        <Form autoComplete="off">
                            <div className="form-group">
                                <label htmlFor="name">Nama</label>
                                <Field
                                    id="name"
                                    className="input"
                                    name="name"
                                    type="text"
                                    placeholder="Nama"
                                />
                                <ErrorMessage name="name">
                                    {(error) => (
                                        <span className="error-message">
                                            {error}
                                        </span>
                                    )}
                                </ErrorMessage>
                            </div>
                            <div className="col">
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
                                        {(error) => (
                                            <span className="error-message">
                                                {error}
                                            </span>
                                        )}
                                    </ErrorMessage>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="telp">No Hp</label>
                                    <Field
                                        id="telp"
                                        className="input"
                                        name="telp"
                                        type="text"
                                        placeholder="No Hp"
                                    />
                                    <ErrorMessage name="telp">
                                        {(error) => (
                                            <span className="error-message">
                                                {error}
                                            </span>
                                        )}
                                    </ErrorMessage>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Alamat</label>
                                <Field
                                    as="textarea"
                                    id="address"
                                    className="input"
                                    name="address"
                                    type="text"
                                    placeholder="Address"
                                />
                                <ErrorMessage name="address">
                                    {(error) => (
                                        <span className="error-message">
                                            {error}
                                        </span>
                                    )}
                                </ErrorMessage>
                            </div>
                            <div className="form-group">
                                <label>Jurusan</label>
                                <Field
                                    as="select"
                                    className="input"
                                    name="major"
                                >
                                    <option value="">--Pilih Jurusan--</option>
                                    <option>Informatika</option>
                                    <option>Kimia</option>
                                    <option>Industri</option>
                                    <option>Psikologi</option>
                                </Field>
                                <ErrorMessage name="major">
                                    {(error) => (
                                        <span className="error-message">
                                            {error}
                                        </span>
                                    )}
                                </ErrorMessage>
                            </div>
                            {/* <div className="form-group">
                                <label>Foto</label>
                                <input
                                    type="file"
                                    className="input"
                                    name="photo"
                                />
                                <ErrorMessage name="photo">
                                    {(error) => (
                                        <span className="error-message">
                                            {error}
                                        </span>
                                    )}
                                </ErrorMessage>
                            </div> */}
                            <button
                                type="submit"
                                className="btn btn-add-form"
                                disabled={!props.isValid || props.isSubmitting}
                            >
                                {props.isSubmitting
                                    ? "Please Wait..."
                                    : "Submit"}
                            </button>
                            <Link to={"/"} className="btn btn-back-form">
                                Kembali
                            </Link>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
};

export default AddStudent;
