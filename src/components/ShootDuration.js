import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ResponseContext from "./ResponseContext";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(4),
  },
}));

const ShootDurationComponent = ({ onSubmit }) => {
  const styles = useStyles();
  // const responseContexts = useContext(ResponseContext);
  // const { setResponseData, responseContext } = useContext(ResponseContext);
  //const sceneData  = responseContext.sceneData;
  // const responseData  = responseContexts;
  //const sceneConvertedData = responseContexts.responseData?.sceneConvertedData;

  const handleSubmit = (event) => {
    event.preventDefault();
    const istOffsetMinutes = 330; // IST is GMT+5:30
    const gmtDate = new Date(startDate.toLocaleString());

    // Calculate the time in IST by adding the offset
    const istDate = new Date(gmtDate.getTime() + istOffsetMinutes * 60000);
    const shootData = {
      fromDate: istDate?.toLocaleString(),
    };
    console.log("Duration Prateek Changes");
    console.log(shootData);
    //setResponseData({ shootData });
    axios
      .post(`${process.env.REACT_APP_API_URL}/pymo_driver`, shootData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        console.log("success get pymo");
        axios
          .get(`${process.env.REACT_APP_API_URL}/loader`, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log(response);
            console.log("success get loader");
            onSubmit("scheduleOutput");
          })
          .catch((error) => {
            // handle errors
            console.log(error);
          });
      })
      .catch((error) => {
        // handle errors
        console.log(error);
      });
  };

  const [startDate, setStartDate] = useState(null);
  //const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  // const handleEndDateChange = (date) => {
  //   setEndDate(date);
  // };

  return (
    <div>
      <div className={styles.appBarSpacer}>
        <Container maxWidth="xl" className={styles.container}>
          <Typography component="h1" variant="h6" color="inherit" noWrap>
            Shoot Duration Interval
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={2}>
                <Typography variant="caption">
                  From
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        value={startDate}
                        onChange={handleStartDateChange}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Typography>
              </Grid>
              <Grid item xs={1} />
            </Grid>
            <Grid>
              <Button variant="contained" type="submit" color="primary">
                Submit
              </Button>
            </Grid>
          </form>
        </Container>
      </div>
    </div>
  );
};

export default ShootDurationComponent;
