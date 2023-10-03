import React, { useEffect, useState } from 'react';
import './UserDetailsPage.css';
import { Link, useNavigate } from 'react-router-dom';


function UserDetailsPage() {
  const [userDetails, setUserDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails')) || [];

    setUserDetails(storedUserDetails);
  }, []);

  const removeUserMessage = (index) => {
    const updatedUserDetails = [...userDetails];
    updatedUserDetails.splice(index, 1);
    setUserDetails(updatedUserDetails);
    localStorage.setItem('userDetails', JSON.stringify(updatedUserDetails));
  };

  const handleHomepage = () => {
    navigate('/Adash');
  };

  return (
    <div className="detailsHH">
    <button className="home-buttonU" onClick={handleHomepage}>Home</button>
      <h1>User Details</h1>
      <table className="user-messages-table">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userDetails.map((user, index) => (
            <tr key={index} className="user-message-row">
              <td className="user-message-cell">
                <h2>User Information:</h2>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
              </td>
              <td className="user-message-cell">
                <h2>User Message:</h2>
                <p>{user.message}</p>
              </td>
              <td className="user-message-cell">
                <button className="buttonHH" onClick={() => removeUserMessage(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDetailsPage;
