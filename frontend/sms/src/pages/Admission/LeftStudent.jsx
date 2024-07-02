import React from "react";
import Sidenav from "../../components/Sidenav";
import Box from "@mui/material/Box";
import Navbar from "../../components/Navbar";
import "./ViewAdmission.css";
import { useState, useEffect } from "react";
import axios from "axios";

const LeftStudent = () => {
  const [studentData, setStudentData] = useState([]);
  const [academicYear, setAcademicYear] = useState(new Date().getFullYear());
  const [searchBy, setSearchBy] = useState("name");
  const [searchValue, setSearchValue] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://localhost:5237/api/Contacts/GetContacts")
      .then((response) => setStudentData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Function to filter students based on search criteria
  const filteredStudents = studentData.filter((student) => {
    if (searchBy === "name") {
      return student.fullName.toLowerCase().includes(searchValue.toLowerCase());
    } else if (searchBy === "admissionNo") {
      return student.admissionNo
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    } else if (searchBy === "admissionDate") {
      return new Date(student.admissionDate)
        .toLocaleDateString()
        .includes(searchValue);
    } else if (searchBy === "dateOfBirth") {
      return new Date(student.dateOfBirth)
        .toLocaleDateString()
        .includes(searchValue);
    }
    return true;
  });

  // Function to reset filters
  const resetFilters = () => {
    setSearchBy("name");
    setSearchValue("");
    setClassFilter("");
    setSectionFilter("");
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
              <h1>Left Student</h1>
              <div className="filters">
                <div className="filter-row">
                  <label htmlFor="academicYear">Academic Year:</label>
                  <input
                    type="number"
                    id="academicYear"
                    value={academicYear}
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
                    <option value="1st">1st</option>
                    <option value="2nd">2nd</option>
                    <option value="3rd">3rd</option>
                    <option value="4th">4th</option>
                    <option value="5th">5th</option>
                    <option value="5th">8</option>
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
                <div className="">
                  <button className="button" onClick={() => resetFilters()}>
                    Reset
                  </button>
                  <button className="button" onClick={() => alert("Search")}>
                    Search
                  </button>
                  <button
                    className="button"
                    onClick={() => alert("Show All")}
                  >
                    Show All
                  </button>
                </div>
              </div>
              <div className="course-listing">
              <table >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Admission Date</th>
                    <th>Admission No</th>
                    <th>Admission Year</th>
                    <th>Caste</th>
                    <th>Category</th>
                    <th>City</th>
                    <th>Class</th>
                    <th>Date of Birth</th>
                    <th>Email</th>
                    <th>Father Name</th>
                    <th>Gender</th>
                    <th>Guardian Name</th>
                    <th>Mother Name</th>
                    <th>Section</th>
                    <th>State</th>
                    <th>Address</th>
                    <th>Full Name</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>
                        {new Date(student.admissionDate).toLocaleDateString()}
                      </td>
                      <td>{student.admissionNo}</td>
                      <td>{student.admissionYear}</td>
                      <td>{student.caste}</td>
                      <td>{student.category}</td>
                      <td>{student.city}</td>
                      <td>{student.class}</td>
                      <td>
                        {new Date(student.dateOfBirth).toLocaleDateString()}
                      </td>
                      <td>{student.email}</td>
                      <td>{student.fatherName}</td>
                      <td>{student.gender}</td>
                      <td>{student.guardianName}</td>
                      <td>{student.motherName}</td>
                      <td>{student.section}</td>
                      <td>{student.state}</td>
                      <td>{student.address}</td>
                      <td>{student.fullName}</td>
                      <td>{student.phone}</td>
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

export default LeftStudent;
