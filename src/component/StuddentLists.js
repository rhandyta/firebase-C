import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";

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
                        <tr key={student.id}>
                            <td className="no">{i}</td>
                            <td>{student.name}</td>
                            <td>{student.address}</td>
                            <td>{student.major}</td>
                            <td className="action">
                                <button className="btn btn-delete">
                                    Delete
                                </button>
                                <button className="btn btn-edit">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default UserLists;
