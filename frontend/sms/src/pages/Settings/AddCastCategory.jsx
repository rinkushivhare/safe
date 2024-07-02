import React, { useState, useEffect } from "react";
import Sidenav from "../../components/Sidenav";
import Navbar from "../../components/Navbar";
import Box from "@mui/material/Box";
import axios from "axios";

export default function AddCastCategory() {
  const [classData, setClassData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [newCaste, setNewCaste] = useState("");
  const [existingCastes, setExistingCastes] = useState([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState("");

  useEffect(() => {
    // Fetch class data from the API
    axios
      .get("http://192.168.0.111:7296/api/CastCategory/GetCaste")
      .then((response) => {
        // Update state with fetched data
        setClassData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching class data:", error);
      });
  }, []);

  const handleEdit = (row) => {
    setSelectedRow(row);
    setCategory(row.category);
    setExistingCastes(row.caste ? row.caste.split(", ") : []);
    setDialogOpen(true);
  };

  const handleAddCaste = () => {
    setExistingCastes([...existingCastes, newCaste]);
    setNewCaste("");
  };

  const handleDeleteCaste = (casteToDelete) => {
    setExistingCastes(
      existingCastes.filter((caste) => caste !== casteToDelete)
    );
  };

  const handleSave = () => {
    // Make API call to save to database
    const newData = {
      category: category,
      caste: existingCastes.join(", "),
    };

    axios
      .put("http://192.168.0.111:7296/api/CastCategory/AddCaste", newData)
      .then((response) => {
        console.log("Data saved successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });

    setDialogOpen(false);
  };

  const handleDeleteCategory = () => {
    // Make API call to delete category
    axios
      .delete(
        `http://192.168.0.111:7296/api/CastCategory/DeleteCategory/${categoryToDelete}`
      )
      .then((response) => {
        console.log("Category deleted successfully:", response.data);
        // Refresh class data after deletion
        axios
          .get("http://192.168.0.111:7296/api/CastCategory/GetCaste")
          .then((response) => {
            setClassData(response.data);
          })
          .catch((error) => {
            console.error("Error fetching class data:", error);
          });
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });

    setDeleteConfirmationOpen(false);
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
              <h1>Cast & Category</h1>
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Caste</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.category}</td>
                      <td>{row.caste}</td>
                      <td>
                        <button onClick={() => handleEdit(row)}>Edit</button>
                        <button
                          onClick={() => {
                            setCategoryToDelete(row.category);
                            setDeleteConfirmationOpen(true);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Box>
      {dialogOpen && (
        <div className="backdrop">
          <div className="dialog">
            <h2>Edit Row</h2>
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {classData.map((row, index) => (
                <option key={index} value={row.category}>
                  {row.category}
                </option>
              ))}
            </select>
            <label>Caste:</label>
            <input
              type="text"
              value={newCaste}
              onChange={(e) => setNewCaste(e.target.value)}
            />
            <div>
              <label>Existing Castes:</label>
              <ul>
                {existingCastes.map((caste, index) => (
                  <li key={index}>
                    {caste}
                    <button onClick={() => handleDeleteCaste(caste)}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={handleAddCaste}>Add</button>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setDialogOpen(false)}>Close</button>
          </div>
        </div>
      )}
      {deleteConfirmationOpen && (
        <div className="backdrop">
          <div className="dialog">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete the category?</p>
            <div>
              <button onClick={handleDeleteCategory}>Yes</button>
              <button onClick={() => setDeleteConfirmationOpen(false)}>
                No
              </button>
            </div>
          </div>
        </div>
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
            width: 96%;
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
