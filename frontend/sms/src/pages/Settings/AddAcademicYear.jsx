import React, { useState, useEffect } from "react";
import Sidenav from "../../components/Sidenav";
import Navbar from "../../components/Navbar";
import Box from "@mui/material/Box";
import axios from "axios";

export default function AddAcademicYear() {
  const [academicYears, setAcademicYears] = useState([]);
  const [activeAcademicYear, setActiveAcademicYear] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [newAcademicYearData, setNewAcademicYearData] = useState({
    // Define the structure of the new academic year data
    aca_Year: "",
    from: "",
    to: "",
    active: false // Set active to false by default
  });

  useEffect(() => {
    // Fetch academic year data from the API
    axios
      .get("http://192.168.0.111:7296/api/AcademicYear/GetAllAcademicYear")
      .then((response) => {
        // Update state with fetched data
        setAcademicYears(response.data);
        // Set the active academic year
        const activeYear = response.data.find((year) => year.active === true);
        setActiveAcademicYear(activeYear ? activeYear.aca_Year : "");
      })
      .catch((error) => {
        console.error("Error fetching academic years:", error);
      });
  }, []);

  // Function to open the dialog for adding a new academic year
  const handleAddAcademicYear = () => {
    // Open the confirmation dialog
    if (window.confirm("Do you want to add a new academic year?")) {
      // If user clicks "Yes", proceed with adding a new academic year
      handleAddAcademicYearSubmit();
    }
  };

  // Function to close all dialogues
  const handleCloseDialogues = () => {
    setShowAddDialog(false);
    setShowEditDialog(false);
    setShowDeleteDialog(false);
  };

  // Function to handle input changes in the "Add Academic Year" dialogue box
  const handleNewAcademicYearChange = (e) => {
    const { name, value } = e.target;
    setNewAcademicYearData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Function to handle form submission for adding a new academic year
  const handleAddAcademicYearSubmit = () => {
    // Make an API call to add the new academic year
    axios
      .post("http://192.168.0.111:7296/api/AcademicYear/AddAcademicYear", newAcademicYearData)
      .then((response) => {
        // Handle success
        console.log("New academic year added successfully:", response.data);
        // Close the dialogue box
        setShowAddDialog(false);
        // Optionally, you can update the academic years list with the new data
        setAcademicYears([...academicYears, response.data]);
      })
      .catch((error) => {
        // Handle error
        console.error("Error adding academic year:", error);
      });
  };

// Function to handle form submission for setting the active academic year
const handleSetActiveSubmit = () => {
  // Make an API call to set the active academic year
  axios
    .post("http://192.168.0.111:7296/api/AcademicYear/SetActiveAcademicYear", null, {
      // Pass the selected academic year as a query parameter
      params: {
        academicYear: activeAcademicYear
      }
    })
    .then((response) => {
      // Handle success
      console.log("Active academic year set successfully:", response.data);
      // Optionally, you can update the active academic year state or trigger a re-fetch of academic years
    })
    .catch((error) => {
      // Handle error
      console.error("Error setting active academic year:", error);
    });
};
// Function to handle setting the active academic year
const handleSetActive = () => {
  // Open the confirmation dialog
  if (window.confirm("Do you want to set this as the active year?")) {
    // If user clicks "Yes", proceed with setting the active academic year
    handleSetActiveSubmit();
  }
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
              <h1>ACADEMIC YEAR</h1>
              <div>
                <label>Active Academic Year : </label>
                <select
                  value={activeAcademicYear}
                  onChange={(e) => setActiveAcademicYear(e.target.value)}
                >
                  {academicYears.map((year) => (
                    <option key={year.aca_Year} value={year.aca_Year}>
                      {year.aca_Year}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <button onClick={handleAddAcademicYear}>Add New</button>
                <button onClick={handleSetActive}>Set Active</button>
              </div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Academic Year</th>
                      <th>To</th>
                      <th>From</th>
                      <th>Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {academicYears.map((year, index) => (
                      <tr key={index}>
                        <td>{year.aca_Year}</td>
                        <td>{year.to}</td>
                        <td>{year.from}</td>
                        <td>{year.active ? "Yes" : "No"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Box>
      {/* Add backdrop to grey out the rest of the screen */}
      {(showAddDialog || showEditDialog || showDeleteDialog) && (
        <div className="backdrop" onClick={handleCloseDialogues}></div>
      )}
      {/* Add dialogue boxes */}
      {showAddDialog && (
        <div className="dialog">
          <h2>Add Academic Year</h2>
          {/* Add your form elements for adding academic year */}
          <div>
            <label>Academic Year:</label>
            <input
              type="text"
              name="aca_Year"
              value={newAcademicYearData.aca_Year}
              onChange={handleNewAcademicYearChange}
            />
          </div>
          <div>
            <label>From:</label>
            <input
              type="text"
              name="from"
              value={newAcademicYearData.from}
              onChange={handleNewAcademicYearChange}
            />
          </div>
          <div>
            <label>To:</label>
            <input
              type="text"
              name="to"
              value={newAcademicYearData.to}
              onChange={handleNewAcademicYearChange}
            />
          </div>
          {/* Add buttons for save and close */}
          <button onClick={handleAddAcademicYearSubmit}>Add</button>
          <button onClick={handleCloseDialogues}>Close</button>
        </div>
      )}
      {showEditDialog && (
        <div className="dialog">
          <h2>Edit Academic Year</h2>
          {/* Add your form elements for editing academic year */}
          {/* Add buttons for save and close */}
          <button onClick={handleCloseDialogues}>Close</button>
        </div>
      )}
      {showDeleteDialog && (
        <div className="dialog">
          <h2>Delete Academic Year</h2>
          {/* Add your form elements for deleting academic year */}
          {/* Add buttons for confirm and close */}
          <button onClick={handleCloseDialogues}>Close</button>
        </div>
      )}
      {/* Add styles */}
      <style>
        {`
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
            margin-top: 20px;
            max-height: 575px; /* Set a max height for the table */
            width: 96%;
          }

          .dialog {
            width: 500px;
            margin-left: 100px;
            margin-top: 20px;
            height: 300px;
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
          
          .dialog h2 {
            margin-top: 0;
          }

          /* Add any other styling as needed */
        `}
      </style>  
    </>
  );
}
