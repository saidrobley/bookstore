import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import styled from 'styled-components';
import LeftMenu from '../components/LeftMenu/LeftMenu';
const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    //const getAllUsers = await axios.get('/users')
    getAllUsers();
  }, []);
  const getAllUsers = async () => {
    try {
      const response = await axios.get('/users');

      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'isadmin', headerName: 'Is Admin', width: 200 },

    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/users/' + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  const handleDelete = async (id) => {
    setUsers(users.filter((item) => item.id !== id));
    try {
      await axios.delete(`/users/${id}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Navbar />
      <Container>
        <LeftMenu />
        <Right>
          <div style={{ height: '70vh', width: '100%' }}>
            <h2 style={{ color: 'blue', textAlign: 'center', margin: '10px' }}>
              User List
            </h2>
            <DataGrid
              rows={users}
              disableSelectionOnClick
              columns={columns}
              pageSize={20}
              checkboxSelection
            />
          </div>
        </Right>
      </Container>
    </div>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-item: center;
`;

const Right = styled.div`
  flex: 4;

  height: 70vh;
`;
export default Users;
