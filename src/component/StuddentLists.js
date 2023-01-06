import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";
import StudentItem from "./StudentItem";

const UserLists = () => {
    const [students, setStudents] = useState([]);

    const fetchStudent = async () => {
        const querySnapshot = await getDocs(collection(db, "students"));
        let tempStudents = [];
        querySnapshot.forEach((doc) => {
            tempStudents.push({ id: doc.id, ...doc.data() });
        });
        setStudents(tempStudents);
    };

    useEffect(() => {
        fetchStudent();
    }, []);

    return (
        <>
            <h1>Daftar Mahasiswa</h1>
            <Link to={"/add"} className="btn btn-add">
                Tambah
            </Link>
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
