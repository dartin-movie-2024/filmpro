import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

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

const columns = [
  { id: "sNo", label: "S.No", minWidth: 25 },
  { id: "schedule", label: "Schedule", minWidth: 50 },
  { id: "shootTown", label: "Shoot\u00a0Town", minWidth: 100 },
  {
    id: "sceneNum",
    label: "Scene\u00a0Number",
    minWidth: 50,
  },
  {
    id: "location",
    label: "Location",
    minWidth: 170,
  },
  {
    id: "actor",
    label: "Actor",
    minWidth: 100,
  },
  {
    id: "date",
    label: "Date",
    minWidth: 100,
  },
  {
    id: "d_ID",
    label: "D_ID",
    minWidth: 50,
  },
  {
    id: "fromDate",
    label: "From\u00a0Date",
    minWidth: 100,
  },
  {
    id: "toDate",
    label: "To\u00a0Date",
    minWidth: 100,
  },
];

function createData(
  sNo,
  schedule,
  shootTown,
  sceneNum,
  location,
  actor,
  date,
  d_ID,
  fromDate,
  toDate
) {
  return {
    sNo,
    schedule,
    shootTown,
    sceneNum,
    location,
    actor,
    date,
    d_ID,
    fromDate,
    toDate,
  };
}

// const rows = [
//   createData(
//     "1",
//     "1",
//     "Ramoji",
//     "5",
//     "Ramoji",
//     "Gopi",
//     "2023-06-09",
//     "1",
//     "2023-06-09",
//     "2023-06-09"
//   ),
//   createData(
//     "2",
//     "1",
//     "Ramoji",
//     "50",
//     "Ramoji",
//     "Vijay",
//     "2023-06-09",
//     "1",
//     "2023-06-09",
//     "2023-06-09"
//   ),
//   createData(
//     "3",
//     "1",
//     "Ramoji",
//     "97",
//     "Ramoji",
//     "Gopi",
//     "2023-06-09",
//     "1",
//     "2023-06-09",
//     "2023-06-09"
//   ),
//   createData(
//     "4",
//     "2",
//     "Ramoji",
//     "76",
//     "Ramoji",
//     "Gopi",
//     "2023-06-09",
//     "4",
//     "2023-06-09",
//     "2023-06-09"
//   ),
//   createData(
//     "5",
//     "3",
//     "S.R.Nagar",
//     "87",
//     "Bhashyam",
//     "Suresh",
//     "2023-06-09",
//     "16",
//     "2023-06-09",
//     "2023-06-09"
//   ),
//   createData(
//     "6",
//     "4",
//     "Vizag",
//     "4",
//     "Bhashyam",
//     "Ramu",
//     "2023-06-09",
//     "16",
//     "2023-06-09",
//     "2023-06-09"
//   ),
//   createData(
//     "7",
//     "4",
//     "Vizag",
//     "34",
//     "Lotus Pound",
//     "Ramu",
//     "2023-06-09",
//     "4",
//     "2023-06-09",
//     "2023-06-09"
//   ),
//   createData(
//     "8",
//     "4",
//     "Madhapur",
//     "54",
//     "Lotus Pound",
//     "Suresh",
//     "2023-06-09",
//     "8",
//     "2023-06-09",
//     "2023-06-09"
//   ),
//   createData(
//     "9",
//     "5",
//     "Vizag",
//     "96",
//     "Lotus Pound",
//     "Ravi",
//     "2023-06-09",
//     "7",
//     "2023-06-09",
//     "2023-06-09"
//   ),
//   createData(
//     "10",
//     "6",
//     "Vizag",
//     "107",
//     "Ikea",
//     "Sundar",
//     "2023-06-09",
//     "9",
//     "2023-06-09",
//     "2023-06-09"
//   ),
//   createData(
//     "11",
//     "7",
//     "Kukatpally",
//     "106",
//     "Ikea",
//     "Gopi",
//     "2023-06-09",
//     "5",
//     "2023-06-09",
//     "2023-06-09"
//   ),
//   createData(
//     "12",
//     "7",
//     "Kukatpally",
//     "105",
//     "Sarath City",
//     "Gopi",
//     "2023-06-09",
//     "5",
//     "2023-06-09",
//     "2023-06-09"
//   ),
// ];

const ScheduleOutputComponent = () => {
  const styles = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/schedule`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        console.log("success get loader");
        setApiData(response.data);
      })
      .catch((error) => {
        // handle errors
        console.log(error);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const rows =
    apiData?.data?.length > 0
      ? apiData.data.map((item) => {
          return createData(
            item.D_ID.toString(),
            item.Schedule.toString(),
            item.Location,
            item.Scene_Num.toString(),
            item.Shoot_Town,
            item.Actor,
            item.DATE,
            item.From_Date,
            item.From_Date,
            item.To_Date
          );
        })
      : [];

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div>
      <div className={styles.appBarSpacer}>
        <Container maxWidth="xl" className={styles.container}>
          <Typography component="h1" variant="h6" color="inherit" noWrap>
            Schedule Output
          </Typography>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Container>
      </div>
    </div>
  );
};

export default ScheduleOutputComponent;
