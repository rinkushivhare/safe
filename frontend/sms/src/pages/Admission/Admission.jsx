import React from "react";
import { useState } from "react";
import Sidenav from "../../components/Sidenav";
import Navbar from "../../components/Navbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import Cap from "../../assets/cap.png";
import Cancelimg from "../../assets/cancel.jpg";
import Banner from "../../assets/banner.png";
import "react-calendar/dist/Calendar.css";

const Admission = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());

  return (
    <>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Stack spacing={0.5}>
                <Card sx={{ maxWidth: 350 }}>
                  <CardMedia
                    sx={{
                      height: 210,
                      width: "60%",
                      objectFit: "cover",
                      marginLeft: "70px",
                      marginTop: "20px",
                    }}
                    image={Cap}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      New Admission
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctic a
                    </Typography>
                  </CardContent>
                  <CardActions
                    onClick={() => {
                      navigate("/new-admission");
                    }}
                  >
                    <Button size="small">Share</Button>
                  </CardActions>
                </Card>
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <Stack spacing={0.5}>
                <Card sx={{ maxWidth: 350 }}>
                  <CardMedia
                    sx={{
                      height: 210,
                      width: "60%",
                      objectFit: "cover",
                      marginLeft: "70px",
                      marginTop: "20px",
                    }}
                    image={Banner}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      View Admission
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions
                    onClick={() => {
                      navigate("/view-admission");
                    }}
                  >
                    <Button size="small">Share</Button>
                  </CardActions>
                </Card>
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <Stack spacing={0.5}>
                <Card sx={{ maxWidth: 350 }}>
                  <CardMedia
                    sx={{
                      height: 210,
                      width: "60%",
                      objectFit: "cover",
                      marginLeft: "70px",
                      marginTop: "20px",
                    }}
                    image={Cancelimg}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Left Student
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions
                    onClick={() => {
                      navigate("/left-student");
                    }}
                  >
                    <Button size="small">Share</Button>
                  </CardActions>
                </Card>
              </Stack>
            </Grid>
            {/* Calendar */}
            {/* <Grid item xs={3}>
              <Card
                sx={{
                  maxWidth: 350,
                  height: "800px",
                }}
              >
                <CardContent>
                  <Calendar
                    onChange={setDate}
                    value={date}
                    className="custom-calendar"
                  />
                </CardContent>
              </Card>
            </Grid> */}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Admission;
