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
import * as RegionActions from '../../../../config/Store/Actions/region.action';
import * as ZoneActions from '../../../../config/Store/Actions/zone.action';
import * as TerritoryActions from '../../../../config/Store/Actions/territory.action';
import * as DesignationActions from '../../../../config/Store/Actions/designation.action'
import * as CompanyActions from '../../../../config/Store/Actions/company.action';
import * as RepresentativeActions from '../../../../config/Store/Actions/representative.actions';
import ApiService from '../../../../config/ApiService';
import ReportGridTable from '../../../components/GridTable/Report-Grid-Table';
import ExcelExport from '../../../components/Export-Excel/excel-export-employee-report';

const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing(3),
        minWidth: 140,
    },
}));

function EmployeeReport() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const allRegions = useSelector((state) => state.region.allRegions);
    const allZone = useSelector((state) => state.zone.allZones);
    const allTerritory = useSelector((state) => state.territory.allTerritorys);
    const allDesignations = useSelector((state) => state.designation.allDesignations);
    const allCompanies = useSelector((state) => state.company.allCompanies)
    const allRepresentatives = useSelector((state) => state.representative.allRepresentatives);
    const [region, setRegion] = useState('')
    const [zones, setZones] = useState([])
    const [zone, setZone] = useState('');
    const [territories, setTerritories] = useState([]);
    const [territory, setTerritory] = useState('');
    const [designation, setDesignation] = useState('');
    const [division, setDivision] = useState('');
    const [employeesList, setEmployeesList] = useState([]);

    useEffect(() => {
        if (!allRegions) {
            dispatch(RegionActions.get_regions())
        }
        if (!allZone) {
            dispatch(ZoneActions.get_zones())
        }
        if(allZone) {
            setZones(allZone)
        }
        if (!allTerritory) {
            dispatch(TerritoryActions.get_territorys())
        }
        if(allTerritory) {
            setTerritories(allTerritory)
        }
        if (!allDesignations) {
            dispatch(DesignationActions.get_designation())
        }
        if (!allCompanies) {
            dispatch(CompanyActions.get_companies())
        }
        if (!allRepresentatives) {
            dispatch(RepresentativeActions.get_all_representatives())
        }
    }, [allRegions, allZone, allTerritory, allDesignations, allCompanies, allRepresentatives])

    const onChangeRegion = (value) => {
        const arr = [];
        setRegion(value)
        for (var i = 0; i < allZone.length; i++) {
            if (allZone[i].regionId === value._id) {
                arr.push(allZone[i])
            }
        }
        setZones(arr)
    }

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

    const generateEmployeeReport = async () => {
        var arr = [];

        for (var key in allRepresentatives) {
            const regionss = allRepresentatives[key].regionId;
            const zoness = allRepresentatives[key].zoneId;
            const territoriess = allRepresentatives[key].territoryId;
            for (var i = 0; i < regionss.length; i++) {
                if (regionss[i] === region._id) {
                    for (var j = 0; j < zoness.length; j++) {
                        if (zoness[j] === zone._id) {
                            for (var k = 0; k < territoriess.length; k++) {
                                if (territoriess[k] === territory._id) {
                                    if (allRepresentatives[key].designationId._id === designation._id) {
                                        if (allRepresentatives[key].sellingLine === division.name) {
                                            var obj = {}
                                            obj.code = allRepresentatives[key].identifier;
                                            obj.name = allRepresentatives[key].name;
                                            obj.contact = allRepresentatives[key].phone;
                                            obj.email = allRepresentatives[key].email;
                                            obj.designation = designation.name;
                                            obj.division = division.name;
                                            obj.zone = zone.name;
                                            obj.status = '';

                                            //city Name
                                            let cityName = {
                                                objectId: allRepresentatives[key].headquarterId
                                            }
                                            await axios.post(ApiService.getBaseUrl() + '/cities/getSpecificCityById', cityName)
                                                .then((res) => {
                                                    var data = res.data.content[0];
                                                    obj.city = data.name;
                                                })
                                                .catch((error) => {
                                                    console.log(error, 'error')
                                                })

                                            //manager Name
                                            let managerName = {
                                                objectId: allRepresentatives[key].managerId
                                            }
                                            await axios.post(ApiService.getBaseUrl() + '/representative/getSpecificRepresentativesById', managerName)
                                                .then((res) => {
                                                    var data = res.data.content[0];
                                                    obj.manager = data.name;
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
                    }
                }
            }

        }
        setEmployeesList(arr)
    }

    const handleRowClick = (data) => {
    }

    
    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="javascript:void(0)" onClick={() => { history.push('/dashboard') }}>
                    Home
             </Link>
                <Link color="inherit" href="javascript:void(0)" onClick={() => { history.push('/reports-parameters/reports') }}>
                    <Typography color="textPrimary">Reports-Parameters</Typography>
                </Link>
                <Typography color="textPrimary">Employee Report</Typography>
            </Breadcrumbs>

            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={2} style={{ alignItems: "center" }}>

                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-age-native-simple">Region</InputLabel>
                            <Select
                                onChange={(e) => {
                                    onChangeRegion(e.target.value)
                                }}
                                label="Region"
                            >
                                {allRegions && allRegions.map((region, key) => {
                                    return (
                                        <MenuItem key={region} value={region}>{region.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>

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
                            <InputLabel id="Designation">Designation</InputLabel>
                            <Select
                                labelId="Designation"
                                label="Designation"
                                fullWidth
                                onChange={(e) => {
                                    setDesignation(e.target.value)
                                }}
                            >
                                {allDesignations && allDesignations.map((designation, key) => {
                                    return (
                                        <MenuItem key={designation} value={designation}>
                                            {designation.name}
                                        </MenuItem>
                                    )
                                }
                                )}
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-age-native-simple">Division</InputLabel>
                            <Select
                                onChange={(e) => {
                                    setDivision(e.target.value)
                                }}
                                label="Division"
                            >
                                {allCompanies && allCompanies.map((company, key) => {
                                    return (
                                        <MenuItem key={company} value={company}>{company.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <Button variant="contained" color="secondary" onClick={generateEmployeeReport}>Go</Button>
                        {employeesList && <ExcelExport data={employeesList} />}
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
                                        { id: 'zone', label: 'Zone' },
                                        { id: 'designation', label: 'Designation' },
                                        { id: 'employeestatus', label: 'Status' },
                                    ]
                                }
                                rows={employeesList}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default EmployeeReport