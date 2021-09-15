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
import moment from 'moment';
import axios from 'axios';
import * as RegionActions from '../../../../config/Store/Actions/region.action';
import * as ZoneActions from '../../../../config/Store/Actions/zone.action';
import * as TerritoryActions from '../../../../config/Store/Actions/territory.action';
import * as MeetingsActions from '../../../../config/Store/Actions/meetingInitiator.action';
import * as ApprovedPlanActions from '../../../../config/Store/Actions/approvePlan.actions';
import ApiService from '../../../../config/ApiService';
import ReportGridTable from '../../../components/GridTable/Report-Grid-Table';
import ExcelExport from '../../../components/Export-Excel/excel-export-kpi-report';

const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing(3),
        minWidth: 140,
    },
}));

function KPIReport() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const allRegions = useSelector((state) => state.region.allRegions);
    const allZone = useSelector((state) => state.zone.allZones);
    const allTerritory = useSelector((state) => state.territory.allTerritorys);
    const allMeetings = useSelector((state) => state.meetingsData.meetings);
    const user = useSelector((state) => state.user.user)
    const allApprovelWorkPlan = useSelector((state) => state.approvedPlan.allApprovelWorkPlan);
    const [region, setRegion] = useState('')
    const [zones, setZones] = useState([])
    const [zone, setZone] = useState('');
    const [territories, setTerritories] = useState([]);
    const [territory, setTerritory] = useState('');
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [monthList, setMonthList] = useState([{ name: 'January', no: '1' }, { name: 'February', no: '2' }, { name: 'March', no: '3' }
        , { name: 'April', no: '4' }, { name: 'May', no: '5' }, { name: 'June', no: '6' }, { name: 'July', no: '7' }, { name: 'August', no: '8' }
        , { name: 'September', no: '9' }, { name: 'October', no: '10' }, { name: 'November', no: '11' }, { name: 'December', no: '12' }]);
    const [kpiReportList, setKPIReportList] = useState([]);

    useEffect(() => {
        if (!allRegions) {
            dispatch(RegionActions.get_regions())
        }
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
        if (!allMeetings) {
            dispatch(MeetingsActions.get_meeting_initiates())
        }
        if (!allApprovelWorkPlan) {
            dispatch(ApprovedPlanActions.get_approved_workPlan())
        }

    }, [allRegions, allZone, allTerritory, allMeetings, allApprovelWorkPlan])

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

    const generateKPIReport = async () => {
        var arr = [];
        for (var key in allApprovelWorkPlan) {
            var regionCheck = allApprovelWorkPlan[key].regionId;
            var zoneCheck = allApprovelWorkPlan[key].zoneId;
            var territoryCheck = allApprovelWorkPlan[key].territoryId;

            if (allApprovelWorkPlan[key].month === month) {
                if (allApprovelWorkPlan[key].year === year) {
                    for (var j = 0; j < regionCheck.length; j++) {
                        if (regionCheck[j] === region._id) {
                            for (var k = 0; k < zoneCheck.length; k++) {
                                if (zoneCheck[k] === zone._id) {
                                    for (var l = 0; l < territoryCheck.length; l++) {
                                        if (territoryCheck[l] === territory._id) {
                                            var repData = {};
                                            var dates = allApprovelWorkPlan[key].startDates;
                                            var daysInField = []
                                            repData.employeeId = allApprovelWorkPlan[key].employeeId;
                                            repData.employeeName = allApprovelWorkPlan[key].employeeName;
                                            repData.doctorsId = allApprovelWorkPlan[key].doctorsId;
                                            repData.zone = zone.name;
                                            repData.territory = territory.name;
                                            repData.t1TargetDocs = allApprovelWorkPlan[key].t1Docs;
                                            repData.t2TargetDocs = allApprovelWorkPlan[key].t2Docs;
                                            repData.t3TargetDocs = allApprovelWorkPlan[key].t3Docs;
                                            repData.totalTargetDocs = allApprovelWorkPlan[key].t1Docs + allApprovelWorkPlan[key].t2Docs + allApprovelWorkPlan[key].t3Docs;

                                            let managerName = {
                                                objectId: allApprovelWorkPlan[key].managerId
                                            }
                                            await axios.post(ApiService.getBaseUrl() + '/representative/getSpecificRepresentativesById', managerName)
                                                .then((res) => {
                                                    var data = res.data.content[0];
                                                    repData.managerName = data.name;
                                                })
                                                .catch((error) => {
                                                    console.log(error, 'error')
                                                })

                                            for (var i = 0; i < dates.length; i++) {
                                                var checkDate = daysInField.includes(moment(dates[i]).format('DD-MM-YYYY'))
                                                if (!checkDate) {
                                                    daysInField.push(moment(dates[i]).format('DD-MM-YYYY'))
                                                }
                                            }

                                            repData.managerId = allApprovelWorkPlan[key].managerId;
                                            repData.daysInField = daysInField;
                                        }
                                    }
                                }
                            }
                        }

                    }
                    if (repData !== undefined) {
                        arr.push(repData)
                    }
                }
            }


        }

        if (arr.length > 0) {
            for (var keys in arr) {
                var kpiReport = arr[keys];
                var doctorsId = kpiReport.doctorsId;
                var t1CallsDocs = 0;
                var t2CallsDocs = 0;
                var t3CallsDocs = 0;
                var totalCallsDocs = 0;
                var t1CoverDocs = 0;
                var t2CoverDocs = 0;
                var t3CoverDocs = 0;
                var totalCoverDocs = 0;
                var t1CoverDocsPer = 0;
                var t2CoverDocsPer = 0;
                var t3CoverDocsPer = 0;
                var totalCoverDocsPer = 0;
                var t1CPACallPer = 0;
                var t2CPACallPer = 0;
                var t3CPACallPer = 0;
                var dailyCallAverage = 0;
                var jionVisitCall = 0;


                for (var keyss in allMeetings) {
                    var collegueId = allMeetings[keyss].colleagueId;

                    if (allMeetings[keyss].eventUserId === kpiReport.employeeId) {
                        for (var m = 0; m < doctorsId.length; m++) {
                            if (allMeetings[keyss].eventDoctorId === doctorsId[m]) {
                                if (allMeetings[keyss].eventDoctorTierId === 'T1') {
                                    t1CallsDocs = t1CallsDocs + 1;
                                }
                                else if (allMeetings[keyss].eventDoctorTierId === 'T2') {
                                    t2CallsDocs = t2CallsDocs + 1;
                                }
                                else if (allMeetings[keyss].eventDoctorTierId === 'T3') {
                                    t3CallsDocs = t3CallsDocs + 1;
                                }
                            }
                        }
                    }
                    for (var n = 0; n < collegueId.length; n++) {
                        if (collegueId[n] === kpiReport.employeeId) {
                            jionVisitCall = jionVisitCall + 1;
                        }
                    }
                }


                totalCallsDocs = t1CallsDocs + t2CallsDocs + t3CallsDocs;
                t1CoverDocs = Math.round(t1CallsDocs / 3);
                t2CoverDocs = Math.round(t2CallsDocs / 2);
                t3CoverDocs = Math.round(t3CallsDocs / 1);
                totalCoverDocs = t1CoverDocs + t2CoverDocs + t3CoverDocs;
                t1CoverDocsPer = t1CoverDocs / kpiReport.t1TargetDocs * 100;
                t2CoverDocsPer = t2CoverDocs / kpiReport.t2TargetDocs * 100;
                t3CoverDocsPer = t3CoverDocs / kpiReport.t3TargetDocs * 100;
                totalCoverDocsPer = totalCoverDocs / kpiReport.totalTargetDocs * 100;
                t1CoverDocsPer = Number(t1CoverDocsPer.toFixed(2))
                t2CoverDocsPer = Number(t2CoverDocsPer.toFixed(2))
                t3CoverDocsPer = Number(t3CoverDocsPer.toFixed(2))
                totalCoverDocsPer = Number(totalCoverDocsPer.toFixed(2));
                t1CPACallPer = t1CallsDocs / (kpiReport.t1TargetDocs * 3) * 100;
                t2CPACallPer = t2CallsDocs / (kpiReport.t2TargetDocs * 2) * 100;
                t3CPACallPer = t3CallsDocs / (kpiReport.t3TargetDocs * 1) * 100;
                t1CPACallPer = Number(t1CPACallPer.toFixed(2));
                t2CPACallPer = Number(t2CPACallPer.toFixed(2));
                t3CPACallPer = Number(t3CPACallPer.toFixed(2));
                dailyCallAverage = Math.round(totalCallsDocs / kpiReport.daysInField.length);

                kpiReport['daysInFieldNo'] = kpiReport.daysInField.length;
                kpiReport['t1CallsDocs'] = t1CallsDocs;
                kpiReport['t2CallsDocs'] = t2CallsDocs;
                kpiReport['t3CallsDocs'] = t3CallsDocs;
                kpiReport['totalCallsDocs'] = totalCallsDocs;
                kpiReport['t1CoverDocs'] = t1CoverDocs;
                kpiReport['t2CoverDocs'] = t2CoverDocs;
                kpiReport['t3CoverDocs'] = t3CoverDocs;
                kpiReport['totalCoverDocs'] = totalCoverDocs;
                kpiReport['t1CoverDocsPer'] = t1CoverDocsPer;
                kpiReport['t2CoverDocsPer'] = t2CoverDocsPer;
                kpiReport['t3CoverDocsPer'] = t3CoverDocsPer;
                kpiReport['totalCoverDocsPer'] = totalCoverDocsPer;
                kpiReport['t1CPACallPer'] = t1CPACallPer;
                kpiReport['t2CPACallPer'] = t2CPACallPer;
                kpiReport['t3CPACallPer'] = t3CPACallPer;
                kpiReport['dailyCallAverage'] = dailyCallAverage;
                kpiReport['jionVisitCall'] = jionVisitCall;
            }
        }


        setKPIReportList(arr)
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
                <Typography color="textPrimary">KPI Report</Typography>
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
                            <InputLabel id="Month">Month</InputLabel>
                            <Select
                                labelId="Month"
                                label="Month"
                                fullWidth
                                onChange={(e) => {
                                    setMonth(e.target.value)
                                }}
                            >
                                {monthList && monthList.map((month, key) => {
                                    return (
                                        <MenuItem value={month.no}>{month.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="Year">Year</InputLabel>
                            <Select
                                labelId="Year"
                                label="Year"
                                fullWidth
                                onChange={(e) => {
                                    setYear(e.target.value)
                                }}
                            >
                                <MenuItem value={'2020'}>
                                    2020
                                </MenuItem>
                                <MenuItem value={'2021'}>
                                    2021
                                </MenuItem>
                                <MenuItem value={'2022'}>
                                    2022
                                </MenuItem>
                                <MenuItem value={'2023'}>
                                    2024
                                </MenuItem>
                                <MenuItem value={'2024'}>
                                    2024
                                </MenuItem>
                                <MenuItem value={'2025'}>
                                    2025
                                </MenuItem>
                            </Select>
                        </FormControl>

                        <Button variant="contained" color="secondary" onClick={generateKPIReport}>Go</Button>
                        {kpiReportList && <ExcelExport data={kpiReportList} />}
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={1} style={{ alignItems: "center" }}>
                            <ReportGridTable
                                onRowClick={(data) => { handleRowClick(data) }}
                                headCells={
                                    [
                                        { id: 'S.No', label: 'S. No' },
                                        { id: 'territory', label: 'Territory' },
                                        { id: 'zoneKPI', label: 'Zone ' },
                                        { id: 'employeeNameKPI', label: 'Employee Name ' },
                                        { id: 'flmName', label: 'FLM Name' },
                                        { id: 'daysInField', label: 'Days in Field' },
                                        { id: 't1TargetDocs', label: 'T1', changeLable: 'No. of customer-target' },
                                        { id: 't2TargetDocs', label: 'T2' },
                                        { id: 't3TargetDocs', label: 'T3' },
                                        { id: 'totalTargetDocs', label: 'Total' },
                                        { id: 't1CoverDocs', label: 'T1' },
                                        { id: 't2CoverDocs', label: 'T2' },
                                        { id: 't3CoverDocs', label: 'T3' },
                                        { id: 'totalCoverDocs', label: 'Total' },
                                        { id: 't1CoverDocsPer', label: 'T1' },
                                        { id: 't2CoverDocsPer', label: 'T2' },
                                        { id: 't3CoverDocsPer', label: 'T3' },
                                        { id: 'totalCoverDocsPer', label: 'Total' },
                                        { id: 't1CallsDocs', label: 'T1' },
                                        { id: 't2CallsDocs', label: 'T2' },
                                        { id: 't3CallsDocs', label: 'T3' },
                                        { id: 'totalCallsDocs', label: 'Total' },
                                        { id: 't1CPACallPer', label: 'T1' },
                                        { id: 't2CPACallPer', label: 'T2' },
                                        { id: 't3CPACallPer', label: 'T3' },
                                        { id: 'dailyCallsAverage', label: 'Daily Calls Average' },
                                        { id: 'jionVisitCalls', label: 'Joined Visit Calls' },
                                    ]
                                }
                                rows={kpiReportList}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default KPIReport