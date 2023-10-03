import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './UpdateUser.css'; 
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState({ name: '', email: '' });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/users/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        setError('Error fetching user. Please try again later.');
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/users/${id}`, user)
      .then((response) => {
        setSuccessMessage('User updated successfully.');
        setError(null);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message || 'An error occurred.');
        } else {
          setError('An error occurred.');
        }
      });
  };

  return (
    <div className={styles.UpdateUserContainer}>
      <h2>Update User</h2>
      {error && <p className={styles.UpdateUserError}>{error}</p>}
      {successMessage && <p className={styles.UpdateUserSuccess}>{successMessage}</p>}
      <form className={styles.UpdateUserForm} onSubmit={handleSubmit}>
        <div>
          <label className={styles.UpdateUserLabel}>Name:</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className={styles.UpdateUserInput}
          />
        </div>
        <div>
          <label className={styles.UpdateUserLabel}>Email:</label>
          <input
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className={styles.UpdateUserInput}
          />
        </div>
        <button type="submit" className={styles.UpdateUserButton}>Update</button>
      </form>
    </div>
  );
};

export default UpdateUser;
