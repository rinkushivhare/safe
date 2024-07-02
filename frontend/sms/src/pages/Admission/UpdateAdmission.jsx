import React, { useState, useEffect } from "react";
import Sidenav from "../../components/Sidenav";
import Box from "@mui/material/Box";
import Navbar from "../../components/Navbar";
import Grid from "@mui/material/Grid";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Snackbar,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateAdmission = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    student_Name: "",
    last_Name: "",
    academic_Year: "",
    admission_No: "",
    admission_Date: "",
    student_Class: "",
    student_Section: "",
    dob: "",
    gender: "",
    email: "",
    cast: "",
    category: "",
    religion: "",
    mother_Name: "",
    father_Name: "",
    guardian_Name: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    adhaar_No: "",
    Gr_No: "",
    photo: "",
  });

  useEffect(() => {
    // Fetch student details using the provided id 
    axios
      .get(`http://192.168.0.179:7296/api/Students/GetStudentById/${id}`)
      .then((response) => {
        const student = response.data;
        // Update form data with fetched student details/;/;
        setFormData(student);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // Make the PUT request to update student data
      const response = await axios.put(
        `http://192.168.0.111:7296/api/Students/EditStudentDetails/${id}`,
        formData
      );
      console.log("Update response:", response.data);

      // Update Snackbar message and open Snackbar
      setSnackbarMessage("Student details updated successfully");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error updating student data:", error);
    }
  };

  const handleClose = () => {
    navigate("/view-admission"); // Navigate back to the admission page
  };

  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Edit Admission</h1>
          <form onSubmit={handleUpdate}>
            <Grid container spacing={3}>
              {/* Render form fields with fetched student details */}
              {Object.entries(formData).map(([key, value]) => (
                <Grid item xs={12} sm={6} md={4} key={key}>
                  {key === "photo" ? (
                    <img
                    src={`data:image/webp;base64,${value}`} // Assuming value is the base64 representation of the image
                      alt="Student"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  ) : (
                    <FormControl required fullWidth>
                      <InputLabel htmlFor={key} sx={{ fontSize: 24 }}>
                        {key
                          .replace(/_/g, " ")
                          .toLowerCase()
                          .replace(/\b\w/g, (c) => c.toUpperCase())}
                      </InputLabel>
                      <Input
                        id={key}
                        value={value}
                        sx={{ marginLeft: "5px" }}
                        onChange={(e) =>
                          setFormData({ ...formData, [key]: e.target.value })
                        }
                      />
                    </FormControl>
                  )}
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Button type="submit" variant="contained">
                Update
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                Close
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </>
  );
};

export default UpdateAdmission;
