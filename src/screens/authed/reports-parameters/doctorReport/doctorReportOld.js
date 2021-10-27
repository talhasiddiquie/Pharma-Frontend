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
import Button from '@material-ui/core/Button';
import axios from 'axios';
import * as ZoneActions from '../../../../config/Store/Actions/zone.action';
import * as TerritoryActions from '../../../../config/Store/Actions/territory.action';
import * as DoctorActions from '../../../../config/Store/Actions/doctor.action';
import ApiService from '../../../../config/ApiService';
import ReportGridTable from '../../../components/GridTable/Report-Grid-Table';
import ExcelExport from '../../../components/Export-Excel/excel-export-doctor-report';

const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing(3),
        minWidth: 140,
    },
}));

function DoctorReport() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const allZone = useSelector((state) => state.zone.allZones);
    const allTerritory = useSelector((state) => state.territory.allTerritorys);
    const allDoctors = useSelector((state) => state.doctor.allDoctors);
    const [zone, setZone] = useState('');
    const [territories, setTerritories] = useState([]);
    const [territory, setTerritory] = useState('');
    const [designation, setDesignation] = useState('');
    const [drStatus, setDrStatus] = useState('');
    const [doctorsList, setDoctorsList] = useState([]);

    useEffect(() => {

        if (!allZone) {
            dispatch(ZoneActions.get_zones())
        }
        if (!allTerritory) {
            dispatch(TerritoryActions.get_territorys())
        }
        if(allTerritory) {
            setTerritories(allTerritory)
        }
        if (!allDoctors || allDoctors.length === 0) {
            dispatch(DoctorActions.get_doctors())
        }

    }, [allZone, allTerritory, allDoctors])

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

    const generateDoctorReport = async () => {

        var arr = [];

        for (var key in allDoctors) {
            if (allDoctors[key].zoneId === zone._id) {
                if (allDoctors[key].territoryId === territory._id) {
                    if (allDoctors[key].designationId === designation) {
                        if (allDoctors[key].status === drStatus) {
                            let obj = {}
                            obj.clientId = allDoctors[key]._id;
                            obj.clientName = `DR. ${allDoctors[key].name}`;
                            obj.contact = allDoctors[key].phone;
                            obj.email = allDoctors[key].email;
                            obj.category = allDoctors[key].tierId;
                            obj.designation = allDoctors[key].designationId;
                            obj.pmdcNo = allDoctors[key].pmdcRegistration;
                            obj.patientPerDay = allDoctors[key].potential;
                            obj.country = "PAKISTAN";
                            obj.zone = zone.name;
                            obj.dob = '';
                            obj.status = '';
                            obj.division = '';

                            //get employee name
                            let employeeName = {
                                objectId: allDoctors[key].representativeId
                            }
                            await axios.post(ApiService.getBaseUrl() + '/representative/getSpecificRepresentativesById', employeeName)
                                .then((res) => {
                                    var data = res.data.content[0];
                                    obj.employeeName = data.name
                                })
                                .catch((error) => {
                                    console.log(error, 'error')
                                })

                            //get speciality name
                            let specilaityName = {
                                objectId: allDoctors[key].specialityId
                            }
                            await axios.post(ApiService.getBaseUrl() + '/speciality/getSpecificSpecialityById', specilaityName)
                                .then((res) => {
                                    var data = res.data.content[0];
                                    obj.speciality = data.name
                                })
                                .catch((error) => {
                                    console.log(error, 'error')
                                })

                            //qualification name
                            let qualificationName = {
                                objectId: allDoctors[key].qualificationId
                            }
                            await axios.post(ApiService.getBaseUrl() + '/qualifications/getSpecificQualificationById', qualificationName)
                                .then((res) => {
                                    var data = res.data.content[0];
                                    obj.qualification = data.name
                                })
                                .catch((error) => {
                                    console.log(error, 'error')
                                })


                            //city Name
                            let cityName = {
                                objectId: allDoctors[key].cityId
                            }
                            await axios.post(ApiService.getBaseUrl() + '/cities/getSpecificCityById', cityName)
                                .then((res) => {
                                    var data = res.data.content[0];
                                    obj.city = data.name;
                                })
                                .catch((error) => {
                                    console.log(error, 'error')
                                })

                            //Hospital Name
                            let hospitalName = {
                                objectId: allDoctors[key].hospitalId
                            }
                            await axios.post(ApiService.getBaseUrl() + '/hospitals/getSpecificHospitalById', hospitalName)
                                .then((res) => {
                                    var data = res.data.content[0];
                                    obj.hospital = data.name;
                                })
                                .catch((error) => {
                                    console.log(error, 'error')
                                })

                            arr.push(obj)

                        }
                    }
                }
            }
        }
        setDoctorsList(arr)
    }

    const handleRowClick = (data) => {
    }

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="javascript:void(0)" onClick={() => { history.push('/dashboard') }}>
                    Home
             </Link>
                    <Typography color="textPrimary">Reports-Parameters</Typography>
                <Typography color="textPrimary">Doctor Report</Typography>
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
                                {allZone && allZone.map((zones, key) => {
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
                            <InputLabel htmlFor="outlined-age-native-simple">Designation</InputLabel>
                            <Select
                                onChange={(e) => {
                                    setDesignation(e.target.value)
                                }}
                                label="Designation"
                                inputProps={{
                                    name: 'designation',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                <MenuItem value={'Administrator'}>Administrator</MenuItem>
                                <MenuItem value={'Assistant Professor'}>Assistant Professor</MenuItem>
                                <MenuItem value={'Associate Professor'}>Associate Professor</MenuItem>
                                <MenuItem value={'RMO'}>RMO</MenuItem>
                                <MenuItem value={'Medical Officer'}>Medical Officer</MenuItem>
                                <MenuItem value={'Professor'}>Professor</MenuItem>
                                <MenuItem value={'Registrar'}>Registrar</MenuItem>
                                <MenuItem value={'Sr. Medical Officer'}>Sr. Medical Officer</MenuItem>
                                <MenuItem value={'Sr. Registrar'}>Sr. Registrar</MenuItem>
                                <MenuItem value={'Private Practitioner'}>Private Practitioner</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-age-native-simple">Dr. Status</InputLabel>
                            <Select
                                onChange={(e) => {
                                    setDrStatus(e.target.value)
                                }}
                                label="Dr. Status"
                                inputProps={{
                                    name: 'dr. Status',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                <MenuItem value={'Presciber'}>Presciber</MenuItem>
                                <MenuItem value={'Non-Presciber'}>Non-Presciber</MenuItem>
                                <MenuItem value={'Purchaser'}>Purchaser</MenuItem>
                                <MenuItem value={'Activity'}>Activity</MenuItem>
                            </Select>
                        </FormControl>

                        <Button variant="contained" color="secondary" onClick={generateDoctorReport}>Go</Button>
                        {doctorsList && <ExcelExport data={doctorsList} />}
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={1} style={{ alignItems: "center" }}>
                            <ReportGridTable
                                onRowClick={(data) => { handleRowClick(data) }}
                                headCells={
                                    [
                                        { id: 'S.No', label: 'S. No' },
                                        { id: 'clientId', label: 'Client ID' },
                                        { id: 'clientName', label: 'Client Name' },
                                        { id: 'docEmployeeName', label: 'Employee Name' },
                                        { id: 'contact', label: 'Contact' },
                                        { id: 'email', label: 'Email' },
                                        { id: 'speciality', label: 'Speciality' },
                                        { id: 'qualification', label: 'Qualification' },
                                        { id: 'docsCity', label: 'City' },
                                        { id: 'division', label: 'Division' },
                                        { id: 'category', label: 'Category' },
                                        { id: 'zone', label: 'Zone' },
                                        { id: 'dob', label: 'DOB' },
                                        { id: 'designation', label: 'Designation' },
                                        { id: 'hospital', label: 'Hospital' },
                                        { id: 'pmdcNo', label: 'PMDC No' },
                                        { id: 'country', label: 'Country' },
                                        { id: 'status', label: 'Status' },
                                    ]
                                }
                                rows={doctorsList}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default DoctorReport