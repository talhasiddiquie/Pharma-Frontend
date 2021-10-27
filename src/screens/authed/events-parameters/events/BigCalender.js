import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import events from "./events";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Divider from "@mui/material/Divider";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Modal from "@mui/material/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { TextField } from "@material-ui/core";

import Fade from "@material-ui/core/Fade";
import Box from "@mui/material/Box";
const localizer = momentLocalizer(moment);

const useStyles = makeStyles((theme) => ({
  textFieldSsid: {
    width: "100%",
    marginTop: "10px",
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
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
    width: "35%",
    inHeight: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "70%",
      inHeight: "55%",
    },
  },
}));

const BigCalender = () => {
  const classes = useStyles();
  const [cityId, setCityId] = useState("");
  const [dropdownCity, setDropDownCity] = useState([]);
  const [dropdownTier, setDropDownTier] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const docWithTiers = [];

  const [open, setOpen] = React.useState(false);

  const handleOpen = (item) => {
    setOpen(true);
    console.log(item, "=====================>>>>");
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSelect = (event) => {
    console.log(event);
  };

  const handleCity = async (e) => {
    setCityId(e.target.value);
    const filter = e.target.value;
    axios
      .get(`${process.env.REACT_APP_URL}/doctors/getDoctors?cityId=${filter}`)
      .then((res) => {
        setDoctors(res.data.results);
      });
  };

  dropdownTier.forEach((tier) => {
    const tierDocts = doctors.filter(
      (value) => value.tierId.name === tier.name
    );
    // const tierDocts = doctors.forEach(value => console.log(value.tierId.name, " ---->>>>---- ", tier.name))
    docWithTiers.push(tierDocts);
  });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/cities/getCities`).then((res) => {
      setDropDownCity(res?.data?.results);
    });
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/tiers/getTiers`).then((res) => {
      setDropDownTier(res?.data);
    });
  }, []);
  return (
    <>
      <Card style={{ display: "flex", width: "100%" }}>
        <div
          style={{
            borderRight: "solid 0.3px grey",
            width: "15%",
            padding: "0px 10px 10px 10px",
          }}
        >
          <FormControl variant="outlined" className={classes.textFieldSsid}>
            <InputLabel htmlFor="outlined-age-native-simple">City</InputLabel>
            <Select
              // value={department}
              onChange={handleCity}
              id="abc"
              native
              value={cityId}
              label="City"
            >
              <option aria-label="None" />
              {dropdownCity?.map((value, index) => (
                <option key={value.id} value={value.id}>
                  {value.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <Divider />

          {dropdownTier.map((v, i) => (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{v.name.replace("T", "Tier ")}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {docWithTiers[i]?.map((item, index) => [
                    <ListItem
                      button
                      onClick={() => {
                        handleOpen(item);
                      }}
                    >
                      <ListItemText primary={item.name} />

                      <ListItemSecondaryAction>
                        <ListItemIcon edge="end01" aria-label="delete01">
                          {item.count}
                        </ListItemIcon>
                      </ListItemSecondaryAction>
                    </ListItem>,
                  ])}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}

          <Divider />
        </div>
        <div
          style={{
            width: "85%",
            padding: "20px 20px 10px 10px",
          }}
        >
          <Calendar
            localizer={localizer}
            events={events}
            popupOffset={30}
            views={["month", "week", "day"]}
            step={60}
            // defaultDate={new Date()}
            defaultDate={new Date(2015, 3, 11)}
            style={{ height: 800 }}
            onDoubleClickEvent={handleSelect}
          />
        </div>

        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h2 id="transition-modal-title">Hello</h2>
                  <TextField
                    style={{
                      width: "100%",
                      marginTop: "10px",
                      marginRight: "10px",
                    }}
                    required
                    id="outlined-required"
                    label="Abbreviation"
                    variant="outlined"
                  />
                </div>
              </div>
            </Fade>
          </Modal>
        </div>
      </Card>
    </>
  );
};

export default BigCalender;
