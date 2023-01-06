import React from "react";

function StudentItem({ student, no }) {
    return (
        <tr key={student.id}>
            <td className="no">{no}</td>
            <td>{student.name}</td>
            <td>{student.address}</td>
            <td>{student.major}</td>
            <td className="action">
                <button className="btn btn-delete">Delete</button>
                <button className="btn btn-edit">Edit</button>
            </td>
        </tr>
    );
}

export default StudentItem;
