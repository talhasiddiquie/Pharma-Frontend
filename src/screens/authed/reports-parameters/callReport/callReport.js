import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import * as ZoneActions from '../../../../config/Store/Actions/zone.action';
import * as TerritoryActions from '../../../../config/Store/Actions/territory.action';
import * as RepresentativeActions from '../../../../config/Store/Actions/representative.actions';
import * as MeetingsActions from '../../../../config/Store/Actions/meetingInitiator.action';
import ApiService from '../../../../config/ApiService';
import ReportGridTable from '../../../components/GridTable/Report-Grid-Table';
import ExcelExport from '../../../components/Export-Excel/excel-export-call-report';

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

function CallReport() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const allZone = useSelector((state) => state.zone.allZones);
    const allTerritory = useSelector((state) => state.territory.allTerritorys);
    const allRepresentatives = useSelector((state) => state.representative.allRepresentatives);
    const allMeetings = useSelector((state) => state.meetingsData.meetings);
    const [zones, setZones] = useState([])
    const [zone, setZone] = useState('');
    const [territories, setTerritories] = useState([]);
    const [territory, setTerritory] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [repersentative, setRepersentative] = useState('')
    const [callsList, setCallsList] = useState([]);
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        if (!allZone) {
            dispatch(ZoneActions.get_zones())
        }
        if (allZone) {
            setZones(allZone)
        }
        if (!allTerritory) {
            dispatch(TerritoryActions.get_territorys())
        }
        if (allTerritory) {
            setTerritories(allTerritory)
        }
        if (!allRepresentatives) {
            dispatch(RepresentativeActions.get_all_representatives())
        }
        if (!allMeetings || allMeetings.length === 0) {
            if (!refresh) {
                dispatch(MeetingsActions.get_meeting_initiates())
                setRefresh(true)
            }
        }
        console.log(allMeetings.length, 'allMeetings');
    }, [allZone, allTerritory, allRepresentatives, allMeetings])

    const onChangeZone = (value) => {
        const arr = [];
        setZone(value)
        for (var i = 0; i < allTerritory.length; i++) {
            if (allTerritory[i].zoneId === value._id) {
                arr.push(allTerritory[i])
            }
        }
        setTerritories(arr)
    }

    const generateCallsReport = async () => {
        var arr = [];
        var serachTime = moment().format('YYYY-MM-DDTHH:mm')

        const dates = dateRange(startDate, endDate);
        console.log(allMeetings, 'condiotion true');

        for (var i = 0; i < dates.length; i++) {
            for (var key in allMeetings) {
                if (moment(allMeetings[key].eventStartDateTime).format('DD-MM-YYYY') === moment(dates[i]).format('DD-MM-YYYY')) {
                    var obj = {}
                    if (allMeetings[key].docZoneId === zone._id) {
                        if (allMeetings[key].docTerritoryId === territory._id) {
                            if (allMeetings[key].eventUserId === repersentative.representativeId) {
                                var products = allMeetings[key].product;
                                var promtedProducts = '';

                                for (var keys in products) {
                                    if (promtedProducts !== "") {
                                        promtedProducts = promtedProducts + "," + products[keys].name;
                                    }
                                    else {
                                        promtedProducts = products[keys].name
                                    }
                                }
                                obj.visitDate = allMeetings[key].visitDate;
                                obj.checkInTime = allMeetings[key].checkInTime;
                                obj.checkOutTime = allMeetings[key].checkOutTime;
                                obj.docName = allMeetings[key].eventDoctorName;
                                obj.employeeName = allMeetings[key].eventRepName;
                                obj.city = allMeetings[key].eventCityName;
                                obj.objectiveName = allMeetings[key].callObjective;

                                //event status check
                                let status = {
                                    objectId: allMeetings[key].eventId
                                }
                                await axios.post(ApiService.getBaseUrl() + '/workPlans/getSpecificWorkPlanByUserId', status)
                                    .then((res) => {
                                        var data = res.data.content[0];
                                        obj.eventStatus = data.statusEvent
                                    })
                                    .catch((error) => {
                                        console.log(error, 'error')
                                    })


                                //state name
                                let state = {
                                    objectId: allMeetings[key].docProvinceId
                                }
                                await axios.post(ApiService.getBaseUrl() + '/provinces/getSpecificProvinceById', state)
                                    .then((res) => {
                                        var data = res.data.content[0];
                                        obj.state = data.name
                                    })
                                    .catch((error) => {
                                        console.log(error, 'error')
                                    })

                                //get speciality name
                                let specilaityName = {
                                    objectId: allMeetings[key].docSpecialityId
                                }
                                await axios.post(ApiService.getBaseUrl() + '/speciality/getSpecificSpecialityById', specilaityName)
                                    .then((res) => {
                                        var data = res.data.content[0];
                                        obj.docSpeciality = data.name
                                    })
                                    .catch((error) => {
                                        console.log(error, 'error')
                                    })


                                //Hospital Address
                                let hospitalAddress = {
                                    objectId: allMeetings[key].docHospitalId
                                }
                                await axios.post(ApiService.getBaseUrl() + '/hospitals/getSpecificHospitalById', hospitalAddress)
                                    .then((res) => {
                                        var data = res.data.content[0];
                                        obj.hospitalAddress = data.address;
                                    })
                                    .catch((error) => {
                                        console.log(error, 'error')
                                    })

                                obj.products = promtedProducts;
                                obj.lastSyncTime = serachTime;
                                arr.push(obj)
                            }
                        }
                    }
                }
            }
        }
        console.log(arr, 'arr');
        setCallsList(arr)
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
                <Typography color="textPrimary">Call Report</Typography>
            </Breadcrumbs>

            <Grid container className={classes.root} spacing={3}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={2} style={{ alignItems: "center" }}>

                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-age-native-simple">Zone</InputLabel>
                            <Select
                                onChange={(e) => {
                                    onChangeZone(e.target.value)
                                }}
                                label="Zone"
                            >
                                {zones && zones.map((zones, key) => {
                                    return (
                                        <MenuItem key={zones} value={zones}>{zones.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-age-native-simple">Territory</InputLabel>
                            <Select
                                onChange={(e) => {
                                    setTerritory(e.target.value)
                                }}
                                label="Territory"
                            >
                                {territories && territories.map((territory, key) => {
                                    return (
                                        <MenuItem key={territory} value={territory}>{territory.name}</MenuItem>
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
                                {allRepresentatives && allRepresentatives.map((representative, key) => {
                                    return (
                                        <MenuItem key={representative} value={representative}>{representative.name}</MenuItem>
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

                        <Button variant="contained" color="secondary" onClick={generateCallsReport}>Go</Button>
                        {callsList && <ExcelExport data={callsList} />}
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={1} style={{ alignItems: "center" }}>
                            <ReportGridTable
                                onRowClick={(data) => { handleRowClick(data) }}
                                headCells={
                                    [
                                        { id: 'S.No', label: 'S. No' },
                                        { id: 'callEventStatus', label: 'Status' },
                                        { id: 'callVisitDate', label: 'Visit Date' },
                                        { id: 'checkInTime', label: 'Check In Time' },
                                        { id: 'checkOutTime', label: 'Check Out Time' },
                                        { id: 'docName', label: 'Name' },
                                        { id: 'callEmployeeName', label: 'Employee Name' },
                                        { id: 'callCity', label: 'City' },
                                        { id: 'docSpeciality', label: 'Speciality' },
                                        { id: 'state', label: 'State' },
                                        { id: 'products', label: 'Promoted Products' },
                                        { id: 'objectiveName', label: 'Objective Name' },
                                        { id: 'clinic/HospitalAddress', label: 'Clinic/Hospital Address' },
                                        { id: 'lastSyncTime', label: 'Last Sync Time' }
                                    ]
                                }
                                rows={callsList}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default CallReport