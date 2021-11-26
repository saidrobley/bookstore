import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router';
import { DataGrid } from '@material-ui/data-grid';
import Navbar from '../components/Navbar/Navbar';
import LeftMenu from '../components/LeftMenu/LeftMenu';
import styled from 'styled-components';
const UserEdit = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    id: '',
    email: '',
    isadmin: '',
  });
  const location = useLocation();
  const id = location.pathname.split('/')[2];

  useEffect(() => {
    const getUser = async (id) => {
      const response = await axios.get(`/users/${id}`);

      setUser({
        id: response.data.id,
        email: response.data.email,
        isadmin: response.data.isadmin,
      });
    };
    getUser(id);
  }, [id]);
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'isadmin', headerName: 'Is Admin', width: 200 },
  ];
  const handleChange = (e) => {
    const newIsAdmin = JSON.parse(e.target.value);
    setUser({
      ...user,
      isadmin: newIsAdmin,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`/users/${id}`, user);

      history.push('/admin/users');
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
          <Form onSubmit={handleSubmit}>
            <input disabled type="text" name="email" value={user.email} />
            <select value={user.isadmin} onChange={handleChange}>
              <option value={'' + user.isadmin}>{'' + user.isadmin}</option>
              <option value={'' + !user.isadmin}>{'' + !user.isadmin}</option>
            </select>
            <input
              style={{ background: 'teal', cursor: 'pointer', color: 'white' }}
              type="submit"
              value="Submit"
            />
          </Form>
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
  margin-top: 1rem;
  margin-right: 1rem;
  height: 5vh;
  display: flex;
  gap: 1rem;
  form {
    display: flex;

    flex: 3;
  }
  input,
  select,
  button {
    flex: 1;
  }
  button {
    cursor: pointer;
    background: teal;
    color: white;
  }
`;
const Form = styled.form``;
export default UserEdit;
