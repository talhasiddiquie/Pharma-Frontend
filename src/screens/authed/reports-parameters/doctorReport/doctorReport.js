import React, { useState, useEffect } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import XLSX from "xlsx";
import "react-confirm-alert/src/react-confirm-alert.css";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@material-ui/core";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid white",
    borderRadius: "4px",
    boxShadow: theme.shadows[5],
    padding: "20px",
    width: "45%",
    inHeight: "40%",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      inHeight: "55%",
    },
  },
  paperTwo: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid white",
    borderRadius: "4px",
    boxShadow: theme.shadows[5],
    padding: "20px",
    width: "35%",
    overflow: "scroll",
    inHeight: "50%",
    maxHeight: 800,
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      inHeight: "55%",
    },
  },

  formDiv: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  textFieldName: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "85%",
    },
  },
  textFieldSsid: {
    width: "100%",
    marginTop: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  styleTableHead: {
    padding: "5px",
    background: "#00AEEF",
    color: "white",
    fontWeight: "600",
  },
}));

const DoctorReport = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const classes = useStyles();
  const history = useHistory();
  const [emp, setEmp] = useState([]);
  const [load, setLoad] = useState(false);
  const [repId, setRepId] = useState("");
  const [renderfilter, setRenderFilter] = useState(false);

  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }

  const getRepbyEmail = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_URL}/representative/getRepresentatives?email=${user.email}`
      )
      .then((response) => {
        setRepId(response.data.results[0].id);
        console.log(response.data.results[0].id);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const fetchDoctor = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_URL}/doctors/getDoctors?assignedRepresentativeId=${repId}&limit=100000000`
      )
      .then((response) => {
        const allDoctor = response.data.results;
        console.log(allDoctor);
        setEmp(allDoctor);
        setLoad(false);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const searchFilterByName = async (e) => {
    if (e.target.value == "") {
      setRenderFilter(!renderfilter);
    } else {
      const filter = e.target.value;
      await axios
        .get(
          `${process.env.REACT_APP_URL}/doctors/getDoctors?assignedRepresentativeId=${repId}&limit=100000000&name=${filter}`
        )
        .then((response) => {
          const allDoctor = response.data.results;
          console.log(allDoctor);
          setEmp(allDoctor);
          setLoad(false);
        })
        .catch((error) => console.log(`Error: ${error}`));
    }
  };

  const searchFilterByEmail = async (e) => {
    if (e.target.value == "") {
      setRenderFilter(!renderfilter);
    } else {
      const filter = e.target.value;
      await axios
        .get(
          `${process.env.REACT_APP_URL}/doctors/getDoctors?assignedRepresentativeId=${repId}&limit=100000000&email=${filter}`
        )
        .then((response) => {
          const allDoctor = response.data.results;
          console.log(allDoctor);
          setEmp(allDoctor);
          setLoad(false);
        })
        .catch((error) => console.log(`Error: ${error}`));
    }
  };

  const searchFilterByPhone = async (e) => {
    if (e.target.value == "") {
      setRenderFilter(!renderfilter);
    } else {
      const filter = e.target.value;
      await axios
        .get(
          `${process.env.REACT_APP_URL}/doctors/getDoctors?assignedRepresentativeId=${repId}&limit=100000000&phone=${filter}`
        )
        .then((response) => {
          const allDoctor = response.data.results;
          console.log(allDoctor);
          setEmp(allDoctor);
          setLoad(false);
        })
        .catch((error) => console.log(`Error: ${error}`));
    }
  };

  const excelDownload = () => {
    const newData = emp.map((row) => {
      return {
        Employee: row.name,
        ClientName: row.assignedRepresentativeId.name,
        Phone: row.phone,
        Email: row.email,
        Speciality: row.specialityId.name,
        Qualification: row.qualificationId.name,
        City: row.cityId.name,
        Zone: row.zoneId.name,
        Desination: row.designationId?.name,
        Hospital: row.hospitalId?.name,
        PMDCRegistration: row.pmdcRegistration,
      };
    });
    const workSheet = XLSX.utils.json_to_sheet(newData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "DoctorReport");
    //Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    //Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    //Download
    XLSX.writeFile(workBook, "DoctorReport.xlsx");
  };

  useEffect(() => {
    getRepbyEmail();
  }, [load]);

  useEffect(() => {
    if (repId !== "") {
      fetchDoctor();
    }
  }, [repId, renderfilter]);

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          color="inherit"
          href="javascript:void(0)"
          onClick={() => {
            history.push("/dashboard");
          }}
        >
          Home
        </Link>
        <Typography color="textPrimary">Reports-Parameters</Typography>
        <Typography color="textPrimary">Doctor Report</Typography>
      </Breadcrumbs>

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <TextField
            style={{ marginRight: "10px" }}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            onChange={searchFilterByName}
          />
          <TextField
            style={{ marginRight: "10px" }}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={searchFilterByEmail}
          />
          <TextField
            style={{ marginRight: "10px" }}
            id="outlined-basic"
            label="Phone"
            variant="outlined"
            onChange={searchFilterByPhone}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "15%",
          }}
        >
          <Button
            style={{ color: "white", background: "#00AEEF" }}
            onClick={excelDownload}
            variant="contained"
            startIcon={<CloudDownloadIcon />}
          >
            Download
          </Button>
        </div>
      </div>

      <div>
        <TableContainer
          style={{
            borderRadius: "4px",
            width: "100%",
            overflow: "auto",
            minWidth: "450px",
            overflowY: "auto",
          }}
          component={Paper}
        >
          <Table>
            <TableHead style={{ background: "#00AEEF" }}>
              <TableRow>
                <TableCell
                  style={{ fontWeight: "600", width: "10%", color: "white" }}
                >
                  Employee Name
                </TableCell>
                <TableCell
                  style={{ fontWeight: "600", width: "10%", color: "white" }}
                >
                  Client Name
                </TableCell>
                <TableCell
                  style={{ fontWeight: "600", width: "5%", color: "white" }}
                >
                  Contact
                </TableCell>

                <TableCell
                  style={{ fontWeight: "600", width: "10%", color: "white" }}
                >
                  Email
                </TableCell>

                <TableCell
                  style={{ fontWeight: "600", width: "10%", color: "white" }}
                >
                  Speciality
                </TableCell>

                <TableCell
                  style={{ fontWeight: "600", width: "10%", color: "white" }}
                >
                  Qualification
                </TableCell>

                <TableCell
                  style={{ fontWeight: "600", width: "10%", color: "white" }}
                >
                  City
                </TableCell>

                <TableCell
                  style={{ fontWeight: "600", width: "10%", color: "white" }}
                >
                  Zone
                </TableCell>
                <TableCell
                  style={{ fontWeight: "600", width: "10%", color: "white" }}
                >
                  Designation
                </TableCell>

                <TableCell
                  style={{ fontWeight: "600", width: "10%", color: "white" }}
                >
                  Hospital
                </TableCell>
                <TableCell
                  style={{ fontWeight: "600", width: "10%", color: "white" }}
                >
                  PMDC Registration
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emp?.map((user, key, index) => {
                var convertedTime = tConvert(`${user?.preferredTime}`);

                return (
                  <TableRow key={user.id}>
                    <TableCell component="th" scope="row">
                      {user?.assignedRepresentativeId?.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {user?.name}
                    </TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user?.specialityId?.name}</TableCell>
                    <TableCell>{user?.qualificationId?.name}</TableCell>
                    <TableCell>{user?.cityId?.name} </TableCell>
                    <TableCell>{user?.zoneId?.name} </TableCell>
                    <TableCell>{user?.designationId?.name} </TableCell>
                    <TableCell>{user?.hospitalId?.name} </TableCell>
                    <TableCell>{user?.pmdcRegistration}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default DoctorReport;
