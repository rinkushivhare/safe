import React from "react";
import { useState } from "react";
import Sidenav from "../../components/Sidenav";
import Box from "@mui/material/Box";
import Navbar from "../../components/Navbar";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Calendar from "react-calendar";
import Typography from "@mui/material/Typography";
import FeeEntry from "../../assets/fee_entry.jpg";
import ViewReport from "../../assets/view_report.jpg";
import FeeRegister from "../../assets/fee_register.jpg";
import { useNavigate } from "react-router-dom";

const Fees = () => {
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
                <Card sx={{ minWidth: 350 }}>
                  <CardMedia
                    sx={{
                      height: 210,
                      width: "60%",
                      objectFit: "cover",
                      marginLeft: "70px",
                      marginTop: "20px",
                    }}
                    image={FeeEntry}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Fee Entry
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions
                   onClick={() => {
                    navigate("/fee-entry");
                  }}>
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
                    image={ViewReport}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      View Report
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions
                   onClick={() => {
                    navigate("/view-report");
                  }}>
                    <Button size="small">Share</Button>
                  </CardActions>
                </Card>
              </Stack>
            </Grid>
            {/* <Grid item xs={3}>
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
                    image={FeeRegister}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Fee Register
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions
                   onClick={() => {
                    navigate("/feeregister");
                  }}>
                    <Button size="small">Share</Button>
                  </CardActions>
                </Card>
              </Stack>
            </Grid> */}
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

export default Fees;
