import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './DeleteUser.css'; 
import { useParams, useNavigate } from 'react-router-dom'; 

const DeleteUser = () => {
  const { id } = useParams(); 
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.delete(`http://localhost:8080/${id}`)
      .then((response) => {
        setSuccessMessage('User deleted successfully.');
        setError(null);
      })
      .catch((error) => {
        
      });
  }, [id]);

  const handleHomepage = () => {
    navigate('/Get');
  };

  return (
    <div className={styles.DeleteUserContainer}>
      <h2>Delete User</h2>
      {error && <p className={styles.DeleteUserError}>{error}</p>}
      {successMessage && <p className={styles.DeleteUserSuccess}>{successMessage}</p>}
      <button className="home-buttonU" onClick={handleHomepage}>Back</button>
    </div>
  );
};

export default DeleteUser;
