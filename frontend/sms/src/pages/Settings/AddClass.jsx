import React, { useState, useEffect, useRef } from "react";
import Sidenav from "../../components/Sidenav";
import Navbar from "../../components/Navbar";
import Box from "@mui/material/Box";
import axios from "axios";

// Backdrop component
const Backdrop = ({ onClick }) => (
  <div className="backdrop" onClick={onClick}></div>
);

const AddClass = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState([]);
  const [classData, setClassData] = useState([]);
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

  const classDropdownRef = useRef(null);

  useEffect(() => {
    // Fetch class data from the API
    axios
      .get("http://192.168.0.111:7296/api/ClassMaster/GetAllClasses")
      .then((response) => {
        // Update state with fetched data
        setClassData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching class data:", error);
      });
  }, []);

  // Filter class list based on fetched data
  const filteredClassList = classList.filter(
    (cls) => !classData.some((data) => data.class === cls)
  );

  // Function to handle saving class data
  const handleSaveClass = () => {
    // Join selected sections into a comma-separated string
    const formattedSection = selectedSection.join(",");

    // Get the selected class from the dropdown
    const selectedClassFromDropdown =
      selectedClass || classDropdownRef.current.value;

    // Call API to save class data
    axios
      .post("http://192.168.0.111:7296/api/ClassMaster/AddNewClass", {
        class: selectedClassFromDropdown,
        section: formattedSection,
      })
      .then(() => {
        // Refresh data after editing
        // You may adjust this logic depending on how your API behaves
        console.log("Class saved successfully");
      })
      .catch((error) => console.error("Error saving class data:", error));

    // Close the dialog
    setShowAddDialog(false);
  };

  // Function to handle editing class data
  const handleEditClass = () => {
    // Join selected sections into a comma-separated string
    const formattedSection = Array.isArray(selectedSection)
      ? selectedSection.join(",")
      : "";

    const selectedClassFromDropdown =
      selectedClass || classDropdownRef.current.value;

    // Call API to edit class data
    axios
      .put("http://192.168.0.111:7296/api/ClassMaster/EditClass", {
        class: selectedClassFromDropdown,
        section: formattedSection,
      })
      .then(() => {
        // Refresh data after editing
        // You may adjust this logic depending on how your API behaves
        console.log("Class edited successfully");
      })
      .catch((error) => console.error("Error editing class data:", error));

    // Close the dialog
    setShowEditDialog(false);
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
              <h1>Add Class</h1>
              <div className="filters">
                <button onClick={() => setShowAddDialog(true)}>
                  Add Class
                </button>
                <button onClick={() => setShowEditDialog(true)}>
                  Edit Class
                </button>
              </div>
              <div className="course-listing">
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Class</th>
                        <th>Section</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classData.map((item, index) => (
                        <tr key={index}>
                          <td>{item.class}</td>
                          <td>{item.section}</td>
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
      {/* Dialog for adding class */}
      {showAddDialog && (
        <>
          {/* Backdrop */}
          <Backdrop onClick={() => setShowAddDialog(false)} />
          {/* Dialog */}
          <div className="dialog">
            <h2>Add Class</h2>
            <label>Class:</label>
            <select
              ref={classDropdownRef}
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              {filteredClassList.map((cls, index) => (
                <option key={index} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
            <label>Section:</label>
            <div>
              {["A", "B", "C", "D"].map((section) => (
                <label key={section}>
                  <input
                    type="checkbox"
                    value={section}
                    checked={selectedSection.includes(section)}
                    onChange={(e) => {
                      const sectionValue = e.target.value;
                      setSelectedSection((prevSections) =>
                        prevSections.includes(sectionValue)
                          ? prevSections.filter((sec) => sec !== sectionValue)
                          : [...prevSections, sectionValue]
                      );
                    }}
                  />
                  {section}
                </label>
              ))}
            </div>
            {/* Placeholder for save button */}
            <button onClick={handleSaveClass}>Save</button>
            <button onClick={() => setShowAddDialog(false)}>Close</button>
          </div>
        </>
      )}
      {/* Dialog for editing class */}
      {showEditDialog && (
        <>
          {/* Backdrop */}
          <Backdrop onClick={() => setShowEditDialog(false)} />
          {/* Dialog */}
          <div className="dialog">
            <h2>Edit Class</h2>
            <label>Class:</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              {/* Render the first option from classData as the default */}
              {classData.map((item, index) => (
                <option key={index} value={item.class}>
                  {item.class}
                </option>
              ))}
            </select>
            <label>Section:</label>
            <div>
              {["A", "B", "C", "D"].map((section) => (
                <label key={section}>
                  <input
                    type="checkbox"
                    value={section}
                    checked={selectedSection.includes(section)}
                    onChange={(e) => {
                      const sectionValue = e.target.value;
                      setSelectedSection((prevSections) =>
                        prevSections.includes(sectionValue)
                          ? prevSections.filter((sec) => sec !== sectionValue)
                          : [...prevSections, sectionValue]
                      );
                    }}
                  />
                  {section}
                </label>
              ))}
            </div>
            <button onClick={handleEditClass}>Save</button>
            <button onClick={() => setShowEditDialog(false)}>Close</button>
          </div>
        </>
      )}
      {/* CSS styles for dialog boxes */}
      <style>
        {`.course-listing {
          overflow: hidden;
        }
        .white-box {
          width: 1500px;
          height: 1000px;
          border-radius: 5px;
        }
        .table-container {
          max-height: 300px; /* Set a max height for the table */
          width:97%
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
        .backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
          z-index: 999; /* Ensure it's above other elements */
        }
      `}
      </style>
    </>
  );
};

export default AddClass;
