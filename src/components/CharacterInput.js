import React, { useContext, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ResponseContext from "./ResponseContext";

const CharacterItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const Item = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
}));

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
  heading: {
    fontWeight: theme.typography.fontWeightBold,
  },
  accordianDetails: {
    display: "block",
    width: "100%",
  },
  accordionContainer: {
    display: "block",
    alignItems: "center",
  },
  details: {
    padding: "0px",
    display: "block",
    alignItems: "center",
  },
  datePicker: {
    overflow: "unset",
  },
}));

const CharacterInputComponent = ({ onSubmit }) => {
  console.log("rendering character input component");
  const styles = useStyles();
  const formData = useRef([]);
  const [expanded, setExpanded] = React.useState(true);
  const responseContexts = useContext(ResponseContext);
  const { setResponseData, responseContext } = useContext(ResponseContext);

  const handleDateChange = (index, index1, item, key, event) => {
    const updatedData = [...formData.current];
    const formIndex = formData.current.findIndex(
      (record) => record.id === index
    );
    if (formIndex !== -1)
      updatedData[formIndex] = {
        ...updatedData[formIndex],
        [key]: {
          ...formData.current[formIndex][key],
          [item]: event?.toLocaleString(),
        },
      };
    else
      updatedData.push({
        id: index,
        [key]: { [item]: event.toLocaleString() },
      });
    formData.current = updatedData;
  };
  const handleDataChange = (index, item) => (event) => {
    const { name, value } = event.target;
    let updatedData = formData.current;
    if (formData.current.some((show) => show.id === index)) {
      updatedData = updatedData.map((record) =>
        record.id === index ? { ...record, [name]: value } : record
      );
    } else {
      updatedData.push({ id: index, [name]: value });
    }
    formData.current = updatedData;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData.current);

    axios
      .post(`${process.env.REACT_APP_API_URL}/location`, formData.current, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        console.log("success");
        const locationData = response.data;
        setResponseData({ locationData });
        onSubmit("locationInput");
      })
      .catch((error) => {
        // handle errors
        console.log(error);
      });
    //onSubmit("locationInput");
  };
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <div className={styles.appBarSpacer}>
        <Container maxWidth="xl" className={styles.container}>
          <Typography component="h1" variant="h6" color="inherit" noWrap>
            Character Inputs
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <Box sx={{ mt: 2 }}>
                <div className={styles.accordianDetails}>
                  {responseContexts.responseData?.charData?.characters
                    .filter((character, index) => index <= 50)
                    .map((character, index) => {
                      // index <= 5 &&
                      const scenes =
                        responseContexts.responseData?.charData?.char_dict[
                          character
                        ];
                      const item = {
                        name: character,
                        noOfScenes: scenes.length.toString(),
                        scenes: scenes,
                      };

                      return (
                        <Accordion
                          key={index}
                          expanded={expanded === item.name}
                          onChange={handleChange(item.name)}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`${item.name}-content`}
                            id={`${item.name}-header`}
                          >
                            <div>
                              <Typography>{item.name}</Typography>
                            </div>
                          </AccordionSummary>
                          <AccordionDetails
                            className={styles.accordionContainer}
                          >
                            <CharacterItem>
                              <Typography
                                variant="body1"
                                className={styles.heading}
                              >
                                Character Details
                              </Typography>
                              <Stack>
                                <Item>
                                  <Grid container direction="row">
                                    <Grid item sm={2}>
                                      <Typography variant="body2">
                                        Character:
                                      </Typography>
                                    </Grid>
                                    <Grid item sm={4}>
                                      <Typography variant="body1">
                                        <b>{item.name}</b>
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Item>
                                <Item>
                                  <Grid container direction="row">
                                    <Grid item sm={2}>
                                      <Typography variant="body2">
                                        Character Name:
                                      </Typography>
                                    </Grid>
                                    <Grid item sm={0} />
                                    <Grid item sm={4}>
                                      <TextField
                                        inputProps={{
                                          name: "characterName",
                                          id: item.name + "characterName",
                                        }}
                                        label="Name"
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleDataChange(index, item)}
                                      />
                                    </Grid>
                                  </Grid>
                                </Item>
                                <Item>
                                  <Grid container direction="row">
                                    <Grid item sm={2}>
                                      <Typography variant="body2">
                                        Number of scenes:
                                      </Typography>
                                    </Grid>
                                    <Grid item sm={4}>
                                      <Typography variant="body1">
                                        <b>{item.noOfScenes}</b>
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Item>
                                <Item>
                                  <Grid container direction="row">
                                    <Grid item sm={2}>
                                      <Typography variant="body2">
                                        Scene list:
                                      </Typography>
                                    </Grid>
                                    <Grid item sm={0} />
                                    <Grid item sm={2}>
                                      <FormControl variant="outlined">
                                        <Select
                                          native
                                          inputProps={{
                                            name: "sceneNo",
                                            id: item.name + "sceneNo",
                                          }}
                                          onChange={handleDataChange(index)}
                                        >
                                          <option aria-label="None" value="" />
                                          {item.scenes.map((value) => (
                                            <option key={value} value={value}>
                                              {value}
                                            </option>
                                          ))}
                                        </Select>
                                      </FormControl>
                                    </Grid>
                                  </Grid>
                                </Item>
                                <Item>
                                  <Typography variant="body2">
                                    Available Dates:
                                  </Typography>
                                  <Box sx={{ mt: 1 }} fullWidth>
                                    <Accordion>
                                      <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                      >
                                        <div>
                                          <Typography variant="body2">
                                            Time Slots
                                          </Typography>
                                        </div>
                                      </AccordionSummary>
                                      <AccordionDetails
                                        className={styles.details}
                                      >
                                        <TimeSlots
                                          index={index}
                                          timeSlots={timeSlots}
                                          handleDateChange={handleDateChange}
                                        />
                                      </AccordionDetails>
                                    </Accordion>
                                  </Box>
                                </Item>
                                <Item>
                                  <Grid container direction="row">
                                    <Grid item sm={2}>
                                      <Typography variant="body2">
                                        Criticality:
                                      </Typography>
                                    </Grid>
                                    <Grid item sm={0} />
                                    <Grid item sm={2}>
                                      <FormControl variant="outlined">
                                        <Select
                                          native
                                          label={`${item.name}-Criticality`}
                                          inputProps={{
                                            name: "criticality",
                                            id:
                                              item.name +
                                              "outlined-age-native-simple",
                                          }}
                                          onChange={handleDataChange(
                                            index,
                                            item
                                          )}
                                        >
                                          <option aria-label="None" value="" />
                                          <option value={1}>1</option>
                                          <option value={2}>2</option>
                                          <option value={3}>3</option>
                                          <option value={4}>4</option>
                                          <option value={5}>5</option>
                                          <option value={6}>6</option>
                                        </Select>
                                      </FormControl>
                                    </Grid>
                                  </Grid>
                                </Item>
                              </Stack>
                            </CharacterItem>
                          </AccordionDetails>
                        </Accordion>
                      );
                    })}
                </div>
              </Box>
              <Item>
                <Button variant="contained" type="submit" color="primary">
                  Submit
                </Button>
              </Item>
            </Stack>
          </form>
        </Container>
      </div>
    </div>
  );
};

export default CharacterInputComponent;

const timeSlots = [
  {
    name: "Time Slot 1:",
    key: "timeSlotOne",
  },
  {
    name: "Time Slot 2:",
    key: "timeSlotTwo",
  },
];

export const TimeSlots = ({ index, handleDateChange, timeSlots }) =>
  timeSlots.map((item, index1) => (
    <Box key={index1} sx={{ p: 2 }}>
      <Grid container direction="row" overflow="unset">
        <Grid item sm={2}>
          <Typography variant="caption">Time Slot {index1 + 1}:</Typography>
        </Grid>
        <Grid item sm={3}>
          <Typography variant="caption">
            From
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  inputProps={{
                    name: "fromDate",
                    id: item.name + "fromDate",
                  }}
                  // selected={fromDate}
                  onChange={(e) =>
                    handleDateChange(index, index1, "fromDate", item.key, e)
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
          </Typography>
        </Grid>
        <Grid item sm={1} />
        <Grid item sm={3}>
          <Typography variant="caption">
            To
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  inputProps={{
                    name: "toDate",
                    id: item.name + "toDate",
                  }}
                  // selected={fromDate}
                  onChange={(e) =>
                    handleDateChange(index, index1, "toDate", item.key, e)
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  ));
