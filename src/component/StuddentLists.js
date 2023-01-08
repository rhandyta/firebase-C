import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../config";
import StudentItem from "./StudentItem";
import { useDispatch } from "react-redux";
import { logout } from "../features/userSlice";
import { signOut } from "firebase/auth";

const UserLists = () => {
    const [students, setStudents] = useState([]);
    const dispatch = useDispatch();
    // const fetchStudent = async () => {
    //     const querySnapshot = await getDocs(collection(db, "students"));
    //     let tempStudents = [];
    //     querySnapshot.forEach((doc) => {
    //         tempStudents.push({ id: doc.id, ...doc.data() });
    //     });
    //     setStudents(tempStudents);
    // };

    useEffect(() => {
        // fetchStudent();

        const unsubcribe = onSnapshot(
            collection(db, "students"),
            (snapshot) => {
                let tempStudents = [];
                snapshot.docs.forEach((doc) => {
                    tempStudents.push({ id: doc.id, ...doc.data() });
                });
                setStudents(tempStudents);
            },
            (error) => console.log(error)
        );

        return () => {
            unsubcribe();
        };
    }, []);

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <>
            <h1>Daftar Mahasiswa</h1>
            <Link to={"/add"} className="btn btn-add">
                Tambah
            </Link>
            <button
                className="btn btn-add"
                type="button"
                onClick={logoutHandler}
            >
                Logout
            </button>
            <table className="customTable">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Alamat</th>
                        <th>Jurusan</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, i) => (
                        <StudentItem key={i} student={student} no={i + 1} />
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default UserLists;
