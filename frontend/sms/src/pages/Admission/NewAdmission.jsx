import React, { useState } from "react";
import Sidenav from "../../components/Sidenav";
import Box from "@mui/material/Box";
import Navbar from "../../components/Navbar";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import { Input, inputClasses } from "@mui/base/Input";
import { styled } from "@mui/system";
import clsx from "clsx";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";

function convertImageToByteArray(imageFile, callback) {
  const reader = new FileReader();
  reader.onload = function(event) {
      const arrayBuffer = event.target.result;
      callback(arrayBuffer);
  };
  reader.readAsArrayBuffer(imageFile);
}

const NewAdmission = () => {
  const [photo, setPhoto] = useState(null); // State to store photo
  const navigate = useNavigate();

  const initialFormData = {
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
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleClear = () => {
    setFormData(initialFormData); // Reset form data to initial values
    setPhoto(null); // Clear the photo
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(formData);
  
    try {
      // Make the POST request to your API endpoint
      const response = await axios.post(
        "http://192.168.0.179:7296/api/Students/GetNewAdmission",
        formData // Use formData directly without modifying photo
      );
  
      // Handle the response as needed (e.g., show success message, redirect, etc.)
      console.log("API Response:", response.data);
  
      // After successful submission, you might want to clear the form
      handleClear();
    } catch (error) {
      // Handle errors (e.g., show error message)
      console.error("API Error:", error.message);
    }
  };

  const handleClose = () => {
    // Navigate back to admission page logic here
    navigate("/");
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
  
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        console.log("Base64 String:", base64String);
        setPhoto(base64String); // Set base64 string in state
        setFormData({ ...formData, photo: base64String }); // Set base64 string in formData
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }} >
          <h1>New Admission</h1>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <FormControl required enctype="multipart/form-data">
                <Label htmlFor="student_Name">First Name</Label>
                <StyledInput
                  id="student_Name"
                  placeholder="Enter First Name"
                  value={formData.student_Name}
                  onChange={(e) =>
                    setFormData({ ...formData, student_Name: e.target.value })
                  }
                />
                <HelperText />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl required>
                <Label htmlFor="last_Name">Last Name</Label>
                <StyledInput
                  id="last_Name"
                  placeholder="Enter Last Name"
                  value={formData.last_Name}
                  onChange={(e) =>
                    setFormData({ ...formData, last_Name: e.target.value })
                  }
                />
                <HelperText />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl>
                {/* <Label htmlFor="academic_Year">Academic Year</Label>
                <StyledInput id="academic_Year" defaultValue={new Date().getFullYear()} />
                <HelperText /> */}
                <Label htmlFor="academic_Year">Academic Year</Label>
                <StyledInput
                  id="academic_Year"
                  placeholder=""
                  value={formData.academic_Year}
                  onChange={(e) =>
                    setFormData({ ...formData, academic_Year: e.target.value })
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl>
                <Label htmlFor="admission_No">Admission Number</Label>
                <StyledInput
                  id="admission_No"
                  placeholder="Enter Admission Number"
                  value={formData.admission_No}
                  onChange={(e) =>
                    setFormData({ ...formData, admission_No: e.target.value })
                  }
                />
                <HelperText />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl>
                <Label htmlFor="admission_Date">Admission Date</Label>
                <StyledInput
                  id="admission_Date"
                  placeholder="01/01/2001"
                  value={formData.admission_Date}
                  onChange={(e) =>
                    setFormData({ ...formData, admission_Date: e.target.value })
                  }
                />
                <HelperText />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl>
                <Label htmlFor="student_Class">Class</Label>
                <StyledInput
                  id="student_Class"
                  placeholder="1,2,3..."
                  value={formData.student_Class}
                  onChange={(e) =>
                    setFormData({ ...formData, student_Class: e.target.value })
                  }
                />
                <HelperText />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl>
                <Label htmlFor="student_Section">Section</Label>
                <StyledInput
                  id="student_Section"
                  placeholder="A,B,C, etc..."
                  value={formData.student_Section}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      student_Section: e.target.value,
                    })
                  }
                />
                <HelperText />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl required>
                <Label htmlFor="dob">DOB</Label>
                <StyledInput
                  id="dob"
                  placeholder="12/04/2000"
                  value={formData.dob}
                  onChange={(e) =>
                    setFormData({ ...formData, dob: e.target.value })
                  }
                />
                <HelperText />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl required>
                <Label htmlFor="gender">Gender</Label>
                <StyledInput
                  id="gender"
                  placeholder="Male/Female"
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                />
                <HelperText />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl required>
                <Label htmlFor="admissionNumber">Email</Label>
                <StyledInput
                  id="email"
                  placeholder="xyz@gmail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <HelperText />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl required>
                <Label htmlFor="category">Category</Label>
                <StyledInput
                  id="category"
                  placeholder=""
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                />
                <HelperText />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl required>
                <Label htmlFor="cast">Caste</Label>
                <StyledInput
                  id="cast"
                  placeholder=""
                  value={formData.cast}
                  onChange={(e) =>
                    setFormData({ ...formData, cast: e.target.value })
                  }
                />
                <HelperText />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl required>
                <Label htmlFor="religion">Religion</Label>
                <StyledInput
                  id="religion"
                  placeholder=""
                  value={formData.religion}
                  onChange={(e) =>
                    setFormData({ ...formData, religion: e.target.value })
                  }
                />
                <HelperText />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl required>
                <Label htmlFor="mother_Name">Mother Name</Label>
                <StyledInput
                  id="mother_Name"
                  placeholder=""
                  value={formData.mother_Name}
                  onChange={(e) =>
                    setFormData({ ...formData, mother_Name: e.target.value })
                  }
                />
                <HelperText />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl required>
                <Label htmlFor="father_Name">Father Name</Label>
                <StyledInput
                  id="father_Name"
                  placeholder=""
                  value={formData.father_Name}
                  onChange={(e) =>
                    setFormData({ ...formData, father_Name: e.target.value })
                  }
                />
                <HelperText />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl required>
                <Label htmlFor="guardian_Name">Guardian Name</Label>
                <StyledInput
                  id="guardian_Name"
                  placeholder=""
                  value={formData.guardian_Name}
                  onChange={(e) =>
                    setFormData({ ...formData, guardian_Name: e.target.value })
                  }
                />
                <HelperText />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl required>
                <Label htmlFor="address">Street Address</Label>
                <StyledInput
                  id="address"
                  placeholder=""
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
                <HelperText />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl required>
                <Label htmlFor="city">City</Label>
                <StyledInput
                  id="city"
                  placeholder=""
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
                <HelperText />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl required>
                <Label htmlFor="state">State</Label>
                <StyledInput
                  id="state"
                  placeholder=""
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                />
                <HelperText />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl required>
                <Label htmlFor="phone">Contact</Label>
                <StyledInput
                  id="phone"
                  placeholder=""
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
                <HelperText />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl required>
                <Label htmlFor="adhaar_No">Aadhar Number</Label>
                <StyledInput
                  id="adhaar_No"
                  placeholder="Enter Admission Number"
                  value={formData.adhaar_No}
                  onChange={(e) =>
                    setFormData({ ...formData, adhaar_No: e.target.value })
                  }
                />
                <HelperText />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl required>
                <Label htmlFor="Gr_No">GR Number</Label>
                <StyledInput
                  id="Gr_No"
                  placeholder="Enter GR Number"
                  value={formData.Gr_No}
                  onChange={(e) =>
                    setFormData({ ...formData, Gr_No: e.target.value })
                  }
                />
                <HelperText />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl>
                <Label htmlFor="photo">Photo</Label>
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
                {photo && (
                  <img
                    src={photo}
                    alt="Selected"
                    style={{ width: "100%", marginTop: 10 }}
                  />
                )}
              </FormControl>
              
              {/* <FormControl required>
                <Label htmlFor="admissionNumber">Photo</Label>
                <StyledInput id="photo" 
                placeholder="Enter GR Number" 
                value={formData.photo}
                onChange={(e) => setFormData({ ...formData, photo: e.target.value })} />
                <HelperText />
              </FormControl> */}
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" onClick={onSubmitHandler}>
              Submit
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const StyledInput = styled(Input)(
  ({ theme }) => `
  .${inputClasses.input} {
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };
    &:hover {
      border-color: ${blue[400]};
    }
    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }
  }
`
);

const Label = styled(({ children, className }) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return <p>{children}</p>;
  }

  const { error, required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;
  return (
    <p className={clsx(className, error || showRequiredError ? "invalid" : "")}>
      {children}
      {required ? " *" : ""}
    </p>
  );
})`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 1rem;
  margin-bottom: 4px;
  &.invalid {
    color: red;
  }
`;

const HelperText = styled((props) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return null;
  }

  const { required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return showRequiredError ? <p {...props}>This field is required.</p> : null;
})`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
`;

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};
const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

export default NewAdmission;
