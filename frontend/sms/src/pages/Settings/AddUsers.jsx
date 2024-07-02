import React, { useState, useEffect } from "react";
import Sidenav from "../../components/Sidenav";
import Navbar from "../../components/Navbar";
import Box from "@mui/material/Box";
import axios from "axios";

export default function AddUsers() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newUserData, setNewUserData] = useState({
    userName: "",
    password: "",
    is_Admin: false,
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    // Fetch users data from the API
    axios
      .get("http://192.168.0.111:7296/api/User/GetUsers")
      .then((response) => {
        // Update state with fetched data
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleDelete = (user) => {
    // Set the user to be deleted
    setDeletingUser(user);
    // Show confirmation dialog
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    // Extract the username of the user to be deleted
    const { userName } = deletingUser;
    // Send API request to delete the user
    axios
    .delete(`http://192.168.0.111:7296/api/User/DeleteUserByUsername?username=${userName}`)
      .then((response) => {
        // Handle successful deletion
        console.log("User deleted successfully:", response.data);
        // Refresh users list
        axios
          .get("http://192.168.0.111:7296/api/User/GetUsers")
          .then((response) => {
            setUsers(response.data);
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
          });
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      })
      .finally(() => {
        // Reset deletingUser state and close confirmation dialog
        setDeletingUser(null);
        setShowDeleteConfirmation(false);
      });
  };

  const cancelDelete = () => {
    // Reset deletingUser state and close confirmation dialog
    setDeletingUser(null);
    setShowDeleteConfirmation(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = (user) => {
    // Set selected user and open the modal
    setSelectedUser(user);
    setNewUserData({
      userName: user.userName,
      password: user.password,
      is_Admin: user.is_Admin,
    });
    setShowEditModal(true);
  };

  const handleEditSave = () => {
    // Send updated user data through POST API request
    axios
      .put("http://192.168.0.111:7296/api/User/EditUser", newUserData)
      .then((response) => {
        // Handle successful response, maybe show a success message
        console.log("User updated successfully:", response.data);
        // Refresh users list
        axios
          .get("http://192.168.0.111:7296/api/User/GetUsers")
          .then((response) => {
            setUsers(response.data);
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
          });
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
    // Close the modal after saving
    setShowEditModal(false);
  };

  const handleSave = () => {
    // Send new user data through POST API request
    axios
      .post("http://192.168.0.111:7296/api/User/AddNewUser", newUserData)
      .then((response) => {
        // Handle successful response, maybe show a success message
        console.log("User added successfully:", response.data);
        // Refresh users list
        axios
          .get("http://192.168.0.111:7296/api/User/GetUsers")
          .then((response) => {
            setUsers(response.data);
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
          });
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
    // Close the modal after saving
    setShowModal(false);
  };

  return (
    <>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <div className="view-container">
          <div className="white-box">
            <div className="view">
              <h1>ADD USER</h1>
              {/* Add buttons */}
              <div style={{ marginBottom: "20px" }}>
                <button onClick={() => setShowModal(true)}>Add New User</button>
              </div>
              {/* Display table */}
              <table>
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Is Admin</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.user_Id}>
                      <td>{user.user_Id}</td>
                      <td>{user.userName}</td>
                      <td>{user.password}</td>
                      <td>{user.is_Admin ? "Yes" : "No"}</td>
                      <td>
                        <button onClick={() => handleEdit(user)}>Edit</button>
                        <button onClick={() => handleDelete(user)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Box>
      {/* Modal for adding new user */}
      {showModal && (
        <>
          <div className="backdrop" onClick={() => setShowModal(false)}></div>
          <div className="dialog">
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>
                &times;
              </span>
              <h2>Add New User</h2>
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  name="userName"
                  value={newUserData.userName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={newUserData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Modal for adding/editing user */}
      {showEditModal && (
        <>
          <div
            className="backdrop"
            onClick={() => setShowEditModal(false)}
          ></div>
          <div className="dialog">
            <div className="modal-content">
              <span className="close" onClick={() => setShowEditModal(false)}>
                &times;
              </span>
              <h2>{selectedUser ? "Edit User" : "Add New User"}</h2>
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  name="userName"
                  value={newUserData.userName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={newUserData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div>
              <button onClick={handleEditSave}>Save</button>
                <button onClick={() => setShowEditModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </>
      )}
      {showDeleteConfirmation && (
        <>
          <div className="backdrop" onClick={cancelDelete}></div>
          <div className="dialog">
            <div className="modal-content">
              <h2>Confirm Deletion</h2>
              <p>Are you sure you want to delete this user?</p>
              <div>
                <button onClick={confirmDelete}>Yes</button>
                <button onClick={cancelDelete}>No</button>
              </div>
            </div>
          </div>
        </>
      )}
      <style>
        {`
        .course-listing {
          overflow: hidden;
          }
          .white-box {
            width: 1500px;
            height: 1000px;
            border-radius: 5px;
          }
          .fee-name {
            margin-top: 20px;
          }
          .dialog {
            width: 500px;
            margin-left: 100px;
            margin-top: 20px;
            height: 400px;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            z-index: 1000;
          }
          .backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
            z-index: 999; /* Ensure it's above other elements */
          }
          .table-container {
            max-height: 278px; /* Set a max height for the table */
            width:96%
          }
          .dialog label {
            display: block;
            margin-bottom: 10px;
          }
          .dialog select {
            margin-bottom: 20px;
          }
          .dialog button {
            margin-right: 10px;
          }
          .class-dropdown {
            position: relative;
            display: inline-block;
          }
          .class-options {
            position: absolute;
            background-color: #f9f9f9;
            min-width: 160px;
            border: 1px solid #ddd;
            z-index: 1;
            padding: 10px;
            max-height: 200px;
            overflow-y: auto;
          }
          .class-options div {
            margin-bottom: 5px;
          }
        `}
      </style>
    </>
  );
}
