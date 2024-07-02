import React, { useState, useEffect } from "react";
import Sidenav from "../../components/Sidenav";
import Navbar from "../../components/Navbar";
import Box from "@mui/material/Box";
import axios from "axios";

// Backdrop component
const Backdrop = ({ onClick }) => (
  <div className="backdrop" onClick={onClick}></div>
);

export default function AddFeeParticulars() {
  // State to store fee data fetched from the API
  const [feeData, setFeeData] = useState([]);
  const [showEditFeesDialog, setShowEditFeesDialog] = useState(false); 
  const [showReConfigureDialog, setShowReConfigureDialog] = useState(false);
  const [selectedFee, setSelectedFee] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [addedFees, setAddedFees] = useState([]);

  const handleSavefeeName = () => {
    
  }

  const handleAddFee = () => {
    if (amount.trim() !== "") {
      const newFee = {
        fee_Name: selectedFee,
        amount: parseFloat(amount),
        classes: selectedClass
      };
      setAddedFees([...addedFees, newFee]);
      // Clear form inputs after adding fee
      setSelectedFee("");
      setAmount("");
      setSelectedClass("");
    } else {
      // Display a popup or alert to enter the amount
      alert("Please enter the amount.");
    }
  };

  const handleSaveFee = () => {
    // Send added fees data via PUT request
    axios
      .put("your_put_api_endpoint", addedFees)
      .then((response) => {
        console.log("Data saved successfully:", response.data);
        // Optionally, handle success message or navigation
      })
      .catch((error) => {
        console.error("Error saving fee data:", error);
      });
  };

  const handleDeleteFee = (index) => {
    const updatedFees = [...addedFees];
    updatedFees.splice(index, 1);
    setAddedFees(updatedFees);
  };
  // Effect to fetch fee data from the API
  useEffect(() => {
    axios
      .get("http://192.168.0.111:7296/api/FeePerticular/LoadFeePerticular")
      .then((response) => {
        setFeeData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching fee data:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <div className="view-container">
          <div className="white-box">
            <div className="view">
              <h1>FEE PARTICULAR</h1>
              <div className="filters">
                <button onClick={() => setShowEditFeesDialog(true)}>
                  Edit Fees
                </button>
                <button onClick={() => setShowReConfigureDialog(true)}>
                  Re-Configure
                </button>
              </div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Class</th>
                      <th>Admission Fee</th>
                      <th>Exam Fee</th>
                      <th>Comp Fee</th>
                      <th>Tution Fee</th>
                      <th>Term Fee</th>
                      <th>Lab Fee</th>
                      <th>Bus Fee</th>
                      <th>Library Fee</th>
                      <th>Hostel Fee</th>
                      <th>E-Learning Fee</th>
                      <th>Gratuity Fund</th>
                      <th>Library</th>
                      <th>PTA</th>
                      <th>Scout & Guide</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeData.map((fee, index) => (
                      <tr key={index}>
                        <td>{fee.class}</td>
                        <td>{fee.admission_Fee}</td>
                        <td>{fee.exam_Fee}</td>
                        <td>{fee.comp_Fee}</td>
                        <td>{fee.tution_Fee}</td>
                        <td>{fee.term_Fee}</td>
                        <td>{fee.lab_Fee}</td>
                        <td>{fee.bus_Fee}</td>
                        <td>{fee.library_Fee}</td>
                        <td>{fee.hostel_Fee}</td>
                        <td>{fee.e_Learning_Fee}</td>
                        <td>{fee.gratuity_Fund}</td>
                        <td>{fee.library}</td>
                        <td>{fee.pta}</td>
                        <td>{fee.scout_Guide}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Box>
      {showEditFeesDialog && (
        <>
          <Backdrop onClick={() => setShowEditFeesDialog(false)} />
          <div className="dialog">
            <h2>Add Fee Particular</h2>
            <label htmlFor="feeDropdown">Fee Name:</label>
            <select
              id="feeDropdown"
              value={selectedFee}
              onChange={(e) => setSelectedFee(e.target.value)}
            >
              {/* Populate dropdown options with fee names */}
              {feeData.map((fee, index) => (
                <option key={index} value={fee.fee_Name}>
                  {fee.fee_Name}
                </option>
              ))}
            </select>
            <br />
            <label htmlFor="amountInput">Amount:</label>
            <input
              id="amountInput"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <br />
            <label htmlFor="classDropdown">Class:</label>
            <select
              id="classDropdown"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              {/* Populate dropdown options with classes */}
              <option value="Class A">Class A</option>
              <option value="Class B">Class B</option>
              {/* Add more options as needed */}
            </select>
            <br />
            <button onClick={handleAddFee}>Add</button>
            <button onClick={() => setShowEditFeesDialog(false)}>Close</button>
            <button onClick={handleSaveFee}>Save</button>
          </div>
        </>
      )}
      {showReConfigureDialog && (
        <>
          <Backdrop onClick={() => setShowReConfigureDialog(false)} />
          <div className="dialog">
            <h2>Edit Fee Name</h2>
            <button onClick={handleSavefeeName}>Save</button>
            <button onClick={() => setShowReConfigureDialog(false)}>
              Close
            </button>
          </div>
        </>
      )}
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
            max-height: 278px; /* Set a max height for the table */
            width:96%
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
