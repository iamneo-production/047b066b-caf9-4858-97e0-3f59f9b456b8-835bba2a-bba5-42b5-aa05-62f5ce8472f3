import React, { useState } from 'react';
import axios from 'axios';
import styles from './AddUser.css'; 
import { Link, useNavigate, useLocation} from 'react-router-dom';


const AddUser = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/signup', user)
      .then((response) => {
        setSuccessMessage('User added successfully.');
        setError(null);
        setUser({ name: '', email: '', password: '' });
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message || 'An error occurred.');
        } else {
          setError('An error occurred.');
        }
      });
  };
  
  const handleHomepage = () => {
    navigate('/Get');
  };

  return (
    <div className="AddUserContainer">
    <button className="home-buttonUA" onClick={handleHomepage}>Home</button>
      <h2>Add User</h2>
      {error && <p className={styles.AddUserError}>{error}</p>}
      {successMessage && <p className={styles.AddUserSuccess}>{successMessage}</p>}
      <form className={styles.AddUserForm} onSubmit={handleSubmit}>
        <div>
          <label className={styles.AddUserLabel}>Name:</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className={styles.AddUserInput}
          />
        </div>
        <div>
          <label className={styles.AddUserLabel}>Email:</label>
          <input
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className={styles.AddUserInput}
          />
        </div>
        <div>
          <label className={styles.AddUserLabel}>Password:</label>
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className={styles.AddUserInput}
          />
        </div>
        <button type="submit" className={styles.AddUserButton}>Add</button>
      </form>
    </div>
  );
};

export default AddUser;
