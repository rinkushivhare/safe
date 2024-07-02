import React, { useState, useEffect } from "react";
import Sidenav from "../../components/Sidenav";
import Navbar from "../../components/Navbar";
import Box from "@mui/material/Box";
import axios from "axios";

export default function AddConcession() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [classList, setClassList] = useState([]); // State to hold class list
  const [selectedClass, setSelectedClass] = useState("All"); // State to hold selected class
  const [selectedSection, setSelectedSection] = useState("All"); // State to hold selected section
  const [studentData, setStudentData] = useState([]);
  const [sortBy, setSortBy] = useState("admissionNumber"); // State to hold selected sort option

  useEffect(() => {
    // Fetch data from API
    axios.get("http://192.168.0.111:7296/api/FeeConcession/LoadPickStudentData")
      .then(response => {
        // Set class list from the response
        setClassList(["All", ...response.data.classList]); // Include "All" option by default
        // Set student data from the response
        setStudentData(response.data.students);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    // Filter student data based on selected class and section
    let filteredStudents = studentData;
    if (e.target.value !== "All") {
      filteredStudents = studentData.filter(student => student.student_Class === e.target.value);
    }
    if (selectedSection !== "All") {
      filteredStudents = filteredStudents.filter(student => student.student_Section === selectedSection);
    }
    // Update student data based on the filter
    setStudentData(filteredStudents);
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
    // Filter student data based on selected section and class
    let filteredStudents = studentData;
    if (e.target.value !== "All") {
      filteredStudents = studentData.filter(student => student.student_Section === e.target.value);
    }
    if (selectedClass !== "All") {
      filteredStudents = filteredStudents.filter(student => student.student_Class === selectedClass);
    }
    // Update student data based on the filter
    setStudentData(filteredStudents);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
    // Logic to sort student data based on selected option
    // For simplicity, let's assume that you fetch sorted data from the server
    // Replace this with your actual sorting logic
    // For example:
    // axios.get(`your_api_url/sortData?sortBy=${e.target.value}`)
    //   .then(response => {
    //     setStudentData(response.data);
    //   })
    //   .catch(error => {
    //     console.error("Error fetching sorted data:", error);
    //   });
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
              <h1>Add Concession</h1>
              {/* Class Dropdown */}
              <label htmlFor="classDropdown">Class:</label>
              <select
                id="classDropdown"
                value={selectedClass}
                onChange={handleClassChange}
              >
                {classList.map((className, index) => (
                  <option key={index} value={className}>{className}</option>
                ))}
              </select>
              {/* Section Dropdown */}
              <div>
                {(
                  <>
                    <label htmlFor="sectionDropdown">Section:</label>
                    <select
                      id="sectionDropdown"
                      value={selectedSection}
                      onChange={handleSectionChange}
                    >
                      <option value="All">All</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="F">F</option>
                    </select>
                  </>
                )}
              </div>
              {/* Sort By Dropdown */}
              <div>
                <label htmlFor="sortByDropdown">Sort By:</label>
                <select
                  id="sortByDropdown"
                  value={sortBy}
                  onChange={handleSortByChange}
                >
                  <option value="admissionNumber">Admission No.</option>
                  <option value="name">Name</option>
                  {/* Add more sorting options as needed */}
                </select>
              </div>
              {/* Table to display student data */}
              <table>
                <thead>
                  <tr>
                    <th>Admission Number</th>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Section</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.map((student, index) => (
                    <tr key={index}>
                      <td>{student.admission_No}</td>
                      <td>{student.fullName}</td>
                      <td>{student.student_Class}</td>
                      <td>{student.student_Section}</td>
                      <td>
                        <button>Open</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}
