import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import axios from 'axios';
import * as CityActions from '../../../../config/Store/Actions/city.action';
import * as RepresentativeActions from '../../../../config/Store/Actions/representative.actions';
import * as EmployeeAttendace from '../../../../config/Store/Actions/attendaceEmployee.actions';
import ApiService from '../../../../config/ApiService';
import ReportGridTable from '../../../components/GridTable/Report-Grid-Table';
import ExcelExport from '../../../components/Export-Excel/excel-export-employee-report';

var today = new Date();
today = moment(today).format('DD-MM-YYYY');

const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing(3),
        minWidth: 140,
    },
}));

function AttendaceReport() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const allCities = useSelector((state) => state.city.allCities);
    const allRepresentatives = useSelector((state) => state.representative.allRepresentatives);
    const allEmployeeAttendance = useSelector((state) => state.attendance.employeesAttendaces);
    const [city, setCity] = useState('');
    const [repersentatives, setRepersentatives] = useState([]);
    const [repersentative, setRepersentative] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [attendaceList, setAttendanceList] = useState([]);

    useEffect(() => {
        if (!allCities) {
            dispatch(CityActions.get_cities())
        }
        if (!allRepresentatives) {
            dispatch(RepresentativeActions.get_all_representatives())
        }
        if (allRepresentatives) {
            setRepersentatives(allRepresentatives)
        }
        if (!allEmployeeAttendance) {
            dispatch(EmployeeAttendace.get_employee_attendances())
        }
    }, [allCities, allRepresentatives, allEmployeeAttendance])


    const onChangeCity = (value) => {
        const arr = [];
        setCity(value)
        for (var i = 0; i < allRepresentatives.length; i++) {
            if (allRepresentatives[i].headquarterId === value._id) {
                arr.push(allRepresentatives[i])
            }

        }
        setRepersentatives(arr)
    }

    const generateAttendaceReport = async () => {
        var arr = [];

        var arrDates = []
        const dates = dateRange(startDate, endDate);

        for (var i = 0; i < dates.length; i++) {
            for (var attendance in allEmployeeAttendance) {
                var attendanceData = allEmployeeAttendance[attendance];
                var checkDates = arrDates.includes(moment(dates[i]).format('DD-MM-YYYY'));

                if (!checkDates) {
                    arrDates.push(moment(dates[i]).format('DD-MM-YYYY'))
                    if (attendanceData.todayDate === moment(dates[i]).format('DD-MM-YYYY')) {
                        if (attendanceData.employeeUserId === repersentative.representativeId) {
                            if (attendanceData.cityName === city.name) {
                                if (attendanceData.endTime === undefined) {
                                    attendanceData['endTime'] = 'NA'
                                }
                                arr.push(attendanceData)
                            }
                        }
                    }
                }

            }
        }
    }

    const handleRowClick = (data) => {

    }

    //genrate date range
    function dateRange(startDate, endDate, steps = 1) {
        const dateArray = [];
        let currentDate = new Date(startDate);

        while (currentDate <= new Date(endDate)) {
            dateArray.push(new Date(currentDate));
            // Use UTC date to prevent problems with time zones and DST
            currentDate.setUTCDate(currentDate.getUTCDate() + steps);
        }
        return dateArray;
    }

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="javascript:void(0)" onClick={() => { history.push('/dashboard') }}>
                    Home
             </Link>
                <Typography color="textPrimary">Reports-Parameters</Typography>
                <Typography color="textPrimary">Attendance Report</Typography>
            </Breadcrumbs>

            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={2} style={{ alignItems: "center" }}>


                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-age-native-simple">City</InputLabel>
                            <Select
                                onChange={(e) => {
                                    onChangeCity(e.target.value)
                                }}
                                label="City"
                            >
                                {allCities && allCities.map((city, key) => {
                                    return (
                                        <MenuItem key={city} value={city}>{city.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-age-native-simple">Employee</InputLabel>
                            <Select
                                onChange={(e) => {
                                    setRepersentative(e.target.value)
                                }}
                                label="Employee"
                            >
                                {repersentatives && repersentatives.map((territory, key) => {
                                    return (
                                        <MenuItem key={territory} value={territory}>{territory.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
                                id="date"
                                label="Start Date"
                                type="date"
                                defaultValue={today}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => { setStartDate(e.target.value) }}
                            />
                        </FormControl>

                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
                                id="date"
                                label="End Date"
                                type="date"
                                defaultValue={today}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => { setEndDate(e.target.value) }}

                            />
                        </FormControl>
                        <Button variant="contained" color="secondary" onClick={generateAttendaceReport}>Go</Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={1} style={{ alignItems: "center" }}>
                            <ReportGridTable
                                onRowClick={(data) => { handleRowClick(data) }}
                                headCells={
                                    [
                                        { id: 'S.No', label: 'S. No' },
                                        { id: 'code', label: 'Code' },
                                        { id: 'name', label: 'Name' },
                                        { id: 'assignTo', label: 'Assign To' },
                                        { id: 'contact', label: 'Contact' },
                                        { id: 'email', label: 'Email' },
                                        { id: 'city', label: 'City' },
                                        { id: 'division', label: 'Division/Department' },
                                        { id: 'city', label: 'Zone' },
                                        { id: 'designation', label: 'Designation' },
                                        { id: 'status', label: 'Status' },
                                    ]
                                }
                                rows={attendaceList}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default AttendaceReport