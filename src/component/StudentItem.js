import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { db } from "../config";
import { useNavigate } from "react-router-dom";

function StudentItem({ student, no }) {
    const navigate = useNavigate();
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
                <button
                    className="btn btn-edit"
                    onClick={() =>
                        navigate(`update/${student.id}`, { state: student })
                    }
                >
                    Edit
                </button>
            </td>
        </tr>
    );
}

export default StudentItem;
