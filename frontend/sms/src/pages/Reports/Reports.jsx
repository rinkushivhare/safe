import React from "react";
import Sidenav from "../../components/Sidenav";
import Box from "@mui/material/Box";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from '@mui/material/Stack';
import Daily_Collection from "../../assets/daily_collection.jpg";
import Student_Dues from "../../assets/student_dues.jpg";
import Detailed_dailyColl from "../../assets/detailed_daily.jpg";

const Reports = () => {
  const [date, setDate] = useState(new Date());
   const navigate = useNavigate();

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
                    image={Daily_Collection}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Daily Collection
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions
                    onClick={() => {
                      navigate("/daily-collection");
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
                    image={Student_Dues}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Student Dues
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions
                    onClick={() => {
                      navigate("/student-dues");
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
                    image={Detailed_dailyColl}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Detailed Daily Collection
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions
                    onClick={() => {
                      navigate("/detailed-collection");
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

export default Reports;
