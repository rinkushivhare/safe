import React, { useState, useEffect, useRef } from "react";
import Sidenav from "../../components/Sidenav";
import Navbar from "../../components/Navbar";
import Box from "@mui/material/Box";
import axios from "axios";

// Backdrop component
const Backdrop = ({ onClick }) => (
  <div className="backdrop" onClick={onClick}></div>
);

const AddFees = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditFeesDialog, setShowEditFeesDialog] = useState(false);
  const [showEditFeeNameDialog, setShowEditFeeNameDialog] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [feeData, setFeeData] = useState([]);
  const [dueDate, setDueDate] = useState(null);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [isCompulsory, setIsCompulsory] = useState(false);
  const [applyEachYear, setApplyEachYear] = useState(false);
  const [classDropdownOpen, setClassDropdownOpen] = useState(false);

  // Function to fetch fee data
  useEffect(() => {
    // Fetch fee data from the API
    axios
      .get("http://192.168.0.111:7296/api/FeeMaster/GetFeesStructure")
      .then((response) => {
        // Update state with fetched data
        setFeeData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching fee data:", error);
      });
  }, []);

  const [editedFeeName, setEditedFeeName] = useState("");
  // Assuming your fetched fee data is an array of objects with a property named 'fee_Name'
  const fetchedFeeNames = feeData.map((fee) => fee.fee_Name);

  // Filter fee list based on fetched data
  const filteredFeeList = feelList.filter(
    (feeName) => !fetchedFeeNames.includes(feeName)
  );

  // Function to toggle class dropdown
  const toggleClassDropdown = () => {
    setClassDropdownOpen(!classDropdownOpen);
  };
  const classDropdownRef = useRef(null);

  // Function to handle saving class data
  const handleSaveClass = () => {
    // Transform the selectedClasses array to a comma-separated string
    const selectedClassesString = selectedClasses.join(", ");

    // Get the selected fees from the dropdown
    const selectedFeesFromDropdown =
      selectedClass || classDropdownRef.current.value;

    // Prepare the data object in the required format
    const requestData = {
      fee_Name: selectedFeesFromDropdown,
      apply_For: selectedClassesString,
      due_Dates: dueDate,
      is_Compulsary: isCompulsory,
      each_Year: applyEachYear,
    };

    // Call API to save class data
    axios
      .post("http://192.168.0.111:7296/api/FeeMaster/AddNewFees", requestData)
      .then(() => {
        // Refresh data after saving
        // You may adjust this logic depending on how your API behaves
        console.log("Class saved successfully");
      })
      .catch((error) => console.error("Error saving class data:", error));

    // Close the dialog
    setShowAddDialog(false);
  };

  // Function to handle editing fee data
  const handleEditFee = (
    feeName,
    dueDate,
    selectedClasses,
    isCompulsory,
    applyEachYear
  ) => {
    // Call API to edit fee data
    axios
      .put("http://localhost:5237/api/EditFee", {
        feeName: feeName,
        dueDate: dueDate,
        selectedClasses: selectedClasses,
        isCompulsory: isCompulsory,
        applyEachYear: applyEachYear,
      })
      .then(() => {
        // Refresh data after editing
        // You may adjust this logic depending on how your API behaves
        console.log("Fee edited successfully");
      })
      .catch((error) => console.error("Error editing fee data:", error));
  };

  // Function to handle edit fee name
  const handleSavefeeName = () => {
    // Create the data object with the fee name
    const requestData = {
      fee_Name: editedFeeName,
    };

    // Call API to save class data
    axios
      .post("http://192.168.0.111:7296/api/FeeMaster/AddFeename", requestData)
      .then(() => {
        // Refresh data after saving
        // You may adjust this logic depending on how your API behaves
        console.log("Fee name added successfully");
      })
      .catch((error) => console.error("Error saving class data:", error));

    // Close the dialog
    setShowEditFeesDialog(false);
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
              <h1>ADD/EDIT FEES</h1>
              <div className="filters">
                <button onClick={() => setShowAddDialog(true)}>
                  Add New Fee
                </button>
                <button onClick={() => setShowEditFeesDialog(true)}>
                  Edit Fee
                </button>
                <button onClick={() => setShowEditFeeNameDialog(true)}>
                  Edit Fee Name
                </button>
              </div>
              <div className="course-listing">
                <div className="table-container">
                  {/* Add this div */}
                  <table>
                    <thead>
                      <tr>
                        <th>Fee Name</th>
                        <th>Compulsory</th>
                        <th>Apply Class</th>
                        <th>Due Dates</th>
                        <th>Every Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feeData.map((fee, index) => (
                        <tr key={index}>
                          <td>{fee.fee_Name}</td>
                          <td>
                            {fee.is_Compulsary ? (
                              <input type="checkbox" checked disabled />
                            ) : (
                              <input type="checkbox" disabled />
                            )}
                          </td>
                          <td>{fee.apply_For}</td>
                          <td>
                            {new Date(fee.due_Dates).toLocaleDateString()}
                          </td>
                          <td>
                            {fee.each_Year ? (
                              <input type="checkbox" checked disabled />
                            ) : (
                              <input type="checkbox" disabled />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
      {/* Backdrop */}
      {showAddDialog && <Backdrop onClick={() => setShowAddDialog(false)} />}
      {showEditFeesDialog && (
        <Backdrop onClick={() => setShowEditFeesDialog(false)} />
      )}
      {showEditFeeNameDialog && (
        <Backdrop onClick={() => setShowEditFeeNameDialog(false)} />
      )}
      {/* Dialog for adding class */}
      {showAddDialog && (
        <div className="dialog">
          <h2>Add New Fees</h2>
          <label>Select Fee Name:</label>

          <select
            ref={classDropdownRef}
            value={selectedClass} // Use selectedClass here instead of newFeeName if this is the correct value
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            {filteredFeeList.map((feeName) => (
              <option key={feeName} value={feeName}>
                {feeName}
              </option>
            ))}
          </select>
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <label>Select Classes:</label>
          <div className="class-dropdown">
            <button onClick={toggleClassDropdown}>Select Classes</button>
            {classDropdownOpen && (
              <div className="class-options">
                {classList.map((classItem) => (
                  <div key={classItem}>
                    <input
                      type="checkbox"
                      checked={selectedClasses.includes(classItem)}
                      onChange={(e) =>
                        e.target.checked
                          ? setSelectedClasses([...selectedClasses, classItem])
                          : setSelectedClasses(
                              selectedClasses.filter((c) => c !== classItem)
                            )
                      }
                    />
                    <label>{classItem}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <label>
              Compulsory to all:
              <input
                type="checkbox"
                checked={isCompulsory}
                onChange={(e) => setIsCompulsory(e.target.checked)}
              />
            </label>
          </div>
          <div>
            <label>
              Apply Each Year:
              <input
                type="checkbox"
                checked={applyEachYear}
                onChange={(e) => setApplyEachYear(e.target.checked)}
              />
            </label>
          </div>
          {/* Placeholder for save button */}
          <button onClick={handleSaveClass}>Save</button>
          <button onClick={() => setShowAddDialog(false)}>Close</button>
        </div>
      )}
      {showEditFeesDialog && (
        <div className="dialog">
          <h2>Edit Fee Name</h2>
          <div>
            <label htmlFor="feeName">Fee Name:</label>
            <input
              type="text"
              id="feeName"
              value={editedFeeName}
              onChange={(e) => setEditedFeeName(e.target.value)}
            />
          </div>
          <div className="fee-name">
            <button onClick={handleSavefeeName}>Save</button>
            <button onClick={() => setShowEditFeesDialog(false)}>Close</button>
          </div>
        </div>
      )}
      {showEditFeeNameDialog && (
        <div className="dialog">
          <h2>Edit Fee Name</h2>
          <div>
            <label htmlFor="feeName">Fee Name:</label>
            <input
              type="text"
              id="feeName"
              value={editedFeeName}
              onChange={(e) => setEditedFeeName(e.target.value)}
            />
          </div>
          <div className="fee-name">
            <button onClick={handleSavefeeName}>Save</button>
            <button onClick={() => setShowEditFeeNameDialog(false)}>
              Close
            </button>
          </div>
        </div>
      )}
      {/* CSS styles for dialog boxes */}
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
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999;
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
};

export default AddFees;

const feelList = [
  "Admission Fee",
  "Exam Fee",
  "Comp Fee",
  "Tution Fee",
  "Term Fee",
  "Lab Fee",
  "Bus Fee",
  "Library Fee",
  "Hostel Fee",
  "E-Learning Fee",
  "Gratuity Fund",
  "Library",
  "PTA",
  "Scout & Guide",
];

const classList = [
  "NUR",
  "KG1",
  "KG2",
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
  "XII",
];
