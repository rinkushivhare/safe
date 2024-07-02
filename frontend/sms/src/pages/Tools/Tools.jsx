import React from "react";
import { useState } from "react"
import Sidenav from "../../components/Sidenav";
import Box from "@mui/material/Box";
import Navbar from "../../components/Navbar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import MoveStudent from "../../assets/move_student.jpg";
import CreateBackup from "../../assets/create_backup.jpg";
import DatabaseRestore from "../../assets/database_restore.jpg";

const Tools = () => {

  const navigate  = useNavigate();
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
                    image={MoveStudent}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Move Student
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions onClick={()=>{navigate("")}}>
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
                    image={CreateBackup}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Create Backup
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions onClick={()=>{navigate("")}}>
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
                    image={DatabaseRestore}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Database Restore
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions onClick={()=>{navigate("")}}>
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

export default Tools;
