import React from "react";
import Sidenav from "../../components/Sidenav";
import Navbar from "../../components/Navbar";
import Box from "@mui/material/Box";
import "./FeeEntry.css";
import { useState, useEffect } from "react";
import { DatePicker } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import axios from "axios";
import { MenuItem } from "@mui/material";

const PickStudentDialog = ({ open, onClose }) => {
  const [classOption, setClassOption] = useState("All");
  const [sectionOption, setSectionOption] = useState("All");
  const [sortByOption, setSortByOption] = useState("Admission No");
  const [studentName, setStudentName] = useState("");

  const handleClassChange = (event) => {
    setClassOption(event.target.value);
  };

  const handleSectionChange = (event) => {
    setSectionOption(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortByOption(event.target.value);
  };

  const handleStudentNameChange = (event) => {
    setStudentName(event.target.value);
  };

  const handleOkClick = () => {
    // Perform any action needed when "Ok" button is clicked
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      sx={{ height: "90vh" }}
    >
      <DialogTitle>Pick Student</DialogTitle>
      <DialogContent>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "20px",
            marginTop: "10px",
          }}
        >
          <TextField
            select
            label="Class"
            value={classOption}
            onChange={handleClassChange}
            variant="outlined"
            style={{ marginRight: "10px" }}
          >
            {[
              "All",
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12",
            ].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Section"
            value={sectionOption}
            onChange={handleSectionChange}
            variant="outlined"
            style={{ marginRight: "10px" }}
          >
            {["All", "A", "B", "C", "D"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Sort By"
            value={sortByOption}
            onChange={handleSortByChange}
            variant="outlined"
            style={{ marginRight: "10px" }}
          >
            {["Admission No", "Admission Date", "Name"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <TextField
          label="Enter Name"
          value={studentName}
          onChange={handleStudentNameChange}
          variant="outlined"
          fullWidth
          style={{ marginBottom: "10px" }}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Admission No</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Section</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{/* Populate table rows with student data */}</TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOkClick} variant="contained" color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const FeeEntry = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [feeDetails, setFeeDetails] = useState([]);
  const [fromDate, setFromDate] = useState(null);

  const handlePickStudentClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    // Fetch fee details from the backend API
    const fetchFeeDetails = async () => {
      try {
        const response = await axios.get("api_endpoint_to_fetch_fee_details");
        setFeeDetails(response.data);
      } catch (error) {
        console.error("Error fetching fee details:", error);
      }
    };

    fetchFeeDetails();
  }, []);

  // Define the list of fee names
  const feeNames = [
    "Management Fund",
    "Admission Fee",
    "Comp Fee",
    "Exam Fee",
    "Gratuity Fund",
    "Lab Fee",
    "Library Fee",
    "Management Fund",
    "PTA",
    "Registration Fee",
    "Scout & Guide",
    "Term Fee",
    "Tution Fee",
  ];

  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box
        sx={{
          bgcolor: "#fff",
          boxShadow: 1,
          p: 3,
          borderRadius: 1,
          marginLeft: "330px",
          marginTop: "65px",
          marginRight: "30px",
          height: "770px",
        }}
      >
        <Sidenav />
        <Box component="">
          <h1 className="fee-entry-header">Fee Entry</h1>
          <div className="fee-entry-container">
            <div className="left-box">
              <div className="receipt-details">
                <div className="detail">
                  <label htmlFor="receiptNo">Receipt No : </label>
                  <input type="text" id="receiptNo" />
                </div>
                <div className="detail">
                  <label htmlFor="date">Date : </label>
                  <input type="text" id="date" />
                </div>
              </div>
              <div className="student-details-box">
                <div className="receipt-details">
                  <div className="detail">
                    <label htmlFor="receiptNo">Admission No : </label>
                    <input type="text" id="receiptNo" />
                  </div>
                  <div className="pickbutton">
                    <Button onClick={handlePickStudentClick}>
                      Pick Student
                    </Button>
                  </div>
                  <PickStudentDialog
                    open={dialogOpen}
                    onClose={handleDialogClose}
                  />
                </div>
                <div className="receipt-details">
                  <div className="detail">
                    <label htmlFor="receiptNo">Name : </label>
                    <input type="text" id="receiptNo" />
                  </div>
                  <div className="detail">
                    <label htmlFor="date">Class : </label>
                    <input type="text" id="date" />
                  </div>
                  <div className="detail">
                    <label htmlFor="date">Section : </label>
                    <input type="text" id="date" />
                  </div>
                </div>
                <div className="fee-entry-container">
                  <div className="unpaid-fee-details">
                    <h3>Unpaid Fee Details:</h3>
                    <div className="table-container">
                      <table>
                        <thead>
                          <tr>
                            <th>Fee Name</th>
                            <th>Priv/yrs</th>
                            <th>Current</th>
                            <th>Paid</th>
                            <th>Unpaid</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Management fund</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Admission Fee</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Comp Fee</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Exam Fee</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Gratuity Fund</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Lab Fee</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Library Fee</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>PTA</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Registration Fee</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Scout & Guide</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Term Fee</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Tution Fee</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-box">
              <div className="receipt-details">
                <div className="detail">
                  <label htmlFor="receiptNo">Fee : </label>
                  <input type="text" id="receiptNo" />
                </div>
                <div className="detail">
                  <label htmlFor="date">Amount : </label>
                  <input type="text" id="date" />
                </div>
              </div>
              <div className="detail">
                <div className="Methods">
                  <label htmlFor="paymentMethod">Payment Methods : </label>
                  <div>
                    <input
                      type="radio"
                      id="cheque"
                      name="paymentMethod"
                      value="cheque"
                    />
                    <label htmlFor="cheque">Cheque</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="online"
                      name="paymentMethod"
                      value="online"
                    />
                    <label htmlFor="online">Online</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="cash"
                      name="paymentMethod"
                      value="cash"
                    />
                    <label htmlFor="cash">Cash</label>
                  </div>
                </div>
              </div>
              <div className="date-range">
                <h3>From date- to date-</h3>
                {/* Date range selector */}
              </div>
              <div className="fee-particulars">
                <h3>Fee Particulars</h3>
                <div>
                  <div className="unpaid-fee-details">
                    <div className="table-container">
                      <table>
                        <thead>
                          <tr>
                            <th>Fee Name</th>
                            <th>Priv/yrs</th>
                            <th>Current</th>
                            <th>Paid</th>
                            <th>Unpaid</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Management fund</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Admission Fee</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Comp Fee</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Exam Fee</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Gratuity Fund</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Lab Fee</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Library Fee</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>PTA</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Registration Fee</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Scout & Guide</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Term Fee</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Tution Fee</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="total">
                <h3>Total-</h3>
                {/* Total amount display */}
              </div>
            </div>
          </div>
          <div className="action-buttons">
            <button className="save-button">Save</button>
            <button className="close-button">Close</button>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default FeeEntry;
