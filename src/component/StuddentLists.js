import React from 'react';
import { Link } from 'react-router-dom';

const UserLists = () => {
  return (
    <>
      <h1>Daftar Mahasiswa</h1>
      <Link to={'/add'} className="btn btn-add">
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
          <tr>
            <td className="no">1</td>
            <td>Agus</td>
            <td>Kp Durian Runtuh</td>
            <td>Informatika</td>
            <td className="action">
              <button className="btn btn-delete">Delete</button>
              <button className="btn btn-edit">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default UserLists;
