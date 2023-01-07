import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { db } from "../config";

function StudentItem({ student, no }) {
    const deleteHandler = async () => {
        await deleteDoc(doc(db, "students", student.id));
    };
    return (
        <tr key={student.id}>
            <td className="no">{no}</td>
            <td>{student.name}</td>
            <td>{student.address}</td>
            <td>{student.major}</td>
            <td className="action">
                <button className="btn btn-delete" onClick={deleteHandler}>
                    Delete
                </button>
                <button className="btn btn-edit">Edit</button>
            </td>
        </tr>
    );
}

export default StudentItem;
