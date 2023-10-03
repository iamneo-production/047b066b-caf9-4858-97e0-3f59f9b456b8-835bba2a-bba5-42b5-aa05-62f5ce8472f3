import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTotalUsers, setActiveUsers, setRemovedUsers } from './actions/chartactions';
import { BrowserRouter as Router, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './getuser.css';

function GetUser() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://localhost:8080/users')
      .then((response) => {
        console.log('Data received:', response.data); 
        setUsers(response.data);
        
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleUpdateClick = (id) => {
    window.location.href = `/Update/${id}`;
  };

  const handleDeleteClick = (id) => {
    window.location.href = `/Delete/${id}`;
  };

  const handleHomepage = () => {
    navigate('/Adash');
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="UserList">
      <button className="home-buttonUG" onClick={handleHomepage}>Home</button>
      <h1>User Management</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button className='buttonAC' onClick={() => window.location.href = '/add'}>Add User</button>
      <div className='Tablee'>
        <table>
          <thead>
            <tr>
              <th className={styles.UserName}>Name</th>
              <th className={styles.UserEmail}>Email</th>
              <th className={styles.UserActions}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className={styles.UserName}>{user.name}</td>
                <td className={styles.UserEmail}>{user.email}</td>
                <td className={styles.UserActions}>
                  <button className={styles.ActionButton} onClick={() => handleUpdateClick(user.id)}>Update</button>
                  <button className={styles.ActionButton} onClick={() => handleDeleteClick(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GetUser;
