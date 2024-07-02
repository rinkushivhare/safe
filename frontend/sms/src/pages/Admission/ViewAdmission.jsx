import React, { useState, useEffect } from "react";
import Sidenav from "../../components/Sidenav";
import Box from "@mui/material/Box";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./ViewAdmission.css";
import axios from "axios";

const NewAdmisiion = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState([]);
  const currentYear = new Date().getFullYear();
  const [academicYear, setAcademicYear] = useState(currentYear);
  const [searchBy, setSearchBy] = useState("name");
  const [searchValue, setSearchValue] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.0.111:7296/api/Students/GetAllStudents")
      .then((response) => {
        console.log("Response data:", response.data);
        setStudentData(response.data);
        setFilteredStudents(response.data); // Initialize filteredStudents with all students
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleRowButtonClick = (id) => {
    // Navigate to the edit page with the student id
    navigate(`/view-admission/edit/${id}`);
  };

  // Filter students based on search criteria when the search button is  clicked
  const handleSearch = () => {
    let filteredData = studentData;
  
    // Filter by academic year
    if (academicYear) {
      filteredData = filteredData.filter(
        (student) => student.academic_Year === academicYear.toString()
      );
    }
  
    // Filter by name
    if (searchValue && searchBy === "name") {
      filteredData = filteredData.filter((student) =>
        student.student_Name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  
    // Filter by class
    if (classFilter) {
      filteredData = filteredData.filter(
        (student) => student.student_Class === classFilter
      );
    }
  
    // Filter by section
    if (sectionFilter) {
      filteredData = filteredData.filter(
        (student) => student.student_Section === sectionFilter
      );
    }
  
    console.log("Filtered data:", filteredData);
    setFilteredStudents(filteredData);
  };
  // Function to clear all filters and display all students
  const showAllStudents = () => {
    setSearchValue("");
    setClassFilter("");
    setSectionFilter("");
    setFilteredStudents(studentData); // Reset filteredStudents to all students
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
              <h1>View Admission</h1>
              <div className="filters">
                <div className="filter-row">
                  <label htmlFor="academicYear">Academic Year:</label>
                  <input
                    type="number"
                    id="academicYear"
                    value={academicYear}
                    max={currentYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                  />
                </div>
                <div className="filter-row">
                  <label htmlFor="searchBy">Search By:</label>
                  <select
                    id="searchBy"
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}
                  >
                    <option value="name">Name</option>
                    <option value="admissionNo">Admission Number</option>
                    <option value="admissionDate">Admission Date</option>
                    <option value="dateOfBirth">Date of Birth</option>
                  </select>
                  <label htmlFor="search">Search:</label>
                  <input
                    type="text"
                    id="search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
                <div className="filter-row">
                  <label htmlFor="classFilter">Class:</label>
                  <select
                    id="classFilter"
                    value={classFilter}
                    onChange={(e) => setClassFilter(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="1st">1</option>
                    <option value="2nd">2</option>
                    <option value="3rd">3</option>
                    <option value="4th">4</option>
                    <option value="5th">5</option>
                  </select>
                  <label htmlFor="sectionFilter">Section:</label>
                  <select
                    id="sectionFilter"
                    value={sectionFilter}
                    onChange={(e) => setSectionFilter(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                  </select>
                </div>
                <div className="filter-row">
                  <button className="button" onClick={handleSearch}>
                    Search
                  </button>
                  <button className="button" onClick={showAllStudents}>
                    Show All
                  </button>
                </div>
              </div>
              <div className="course-listing">
                <table>
                  <thead>
                    <tr>
                      <th>Admission No</th>
                      <th>Admission Date</th>
                      <th>Full Name</th>
                      <th>Class</th>
                      <th>Section</th>
                      <th>Date of Birth</th>
                      <th>Gender</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.student_Id}>
                        <td>{student.admission_No}</td>
                        <td>
                          {new Date(
                            student.admission_Date
                          ).toLocaleDateString()}
                        </td>
                        <td>{student.student_Name}</td>
                        <td>{student.student_Class}</td>
                        <td>{student.student_Section}</td>
                        <td>{new Date(student.dob).toLocaleDateString()}</td>
                        <td>{student.gender}</td>
                        <td>
                          <button
                            className="action-button"
                            onClick={() =>
                              handleRowButtonClick(student.student_Id)
                            }
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default NewAdmisiion;
