import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import GridTable from '../../../components/GridTable/grid-table';
import * as WorkPlanActions from '../../../../config/Store/Actions/workPlan.action';
import * as DesignationActions from '../../../../config/Store/Actions/designation.action';
import * as ApprovedPlanActions from '../../../../config/Store/Actions/approvePlan.actions';
import ApiService from '../../../../config/ApiService';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(3),
        minWidth: 160,
    },
    btnControl: {
        margin: theme.spacing(2),
        minWidth: 100,
        minHeight: 50
    },

}));

var month = moment().format("M")

export default function EditCalender() {
    const dispatch = useDispatch();
    const history = useHistory()
    const classes = useStyles();
    const user = useSelector((state) => state.user.user);
    const allWorkPlan = useSelector((state) => state.workPlan.allWorkPlan);
    const allDesignations = useSelector((state) => state.designation.allDesignations);
    const allApprovelWorkPlan = useSelector((state) => state.approvedPlan.allApprovelWorkPlan);
    const [monthSearch, setMonthSearch] = useState('')
    const [yearSearch, setYearSearch] = useState('')
    const [designationSearch, setDesignationSearch] = useState('')
    const [statusSearch, setStatusSearch] = useState('')
    const [usersPlanApprovel, setUsersPlanApprovel] = useState([]);

    useEffect(() => {
        if (!allWorkPlan) {
            dispatch(WorkPlanActions.get_workPlan())
        }
        if (!allDesignations) {
            dispatch(DesignationActions.get_designation())
        }
        if (!allApprovelWorkPlan) {
            dispatch(ApprovedPlanActions.get_approved_workPlan())
        }
        else {
            var arr = [];
            for (var i = 0; i < allApprovelWorkPlan.length; i++) {
                if(allApprovelWorkPlan[i].month == month){
                    if (allApprovelWorkPlan[i].managerId === user._id) {
                        arr.push(allApprovelWorkPlan[i])
                    }
                }
            }
            setUsersPlanApprovel(arr)
        }

    }, [allWorkPlan, allDesignations])

    //handle change filter data
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === 'month') {
            setMonthSearch(value)
        }
        else if (name === 'year') {
            setYearSearch(value)
        }
        else if (name === 'designation') {
            setDesignationSearch(value)
        }
        else if (name === 'status') {
            setStatusSearch(value)
        }
    }

    const goForData = () => {
        const arr = [];

        if (monthSearch !== '' && yearSearch !== '' && designationSearch !== '' && statusSearch !== '') {
            for (var key in allApprovelWorkPlan) {
                if (monthSearch === allApprovelWorkPlan[key].month && yearSearch === allApprovelWorkPlan[key].year
                    && designationSearch === allApprovelWorkPlan[key].designationId
                    && statusSearch === allApprovelWorkPlan[key].status) {
                    if (allApprovelWorkPlan[key].employeeId !== user._id) {
                        arr.push(allApprovelWorkPlan[key])
                    }
                }
            }
            setUsersPlanApprovel(arr)
        }

    }

    const handleRowClick = (data) => {
    }


    //handle changed action 
    const handleRowActions = async (e, rowData) => {
        const value = e.target.value;
        var eventUpdate = rowData.eventsIds
        var obj = {}

        if (value === 'lock') {
            obj.isActive = true;
            obj.objectId = rowData._id;
            dispatch(ApprovedPlanActions.update_approved_workPlan(obj))

            for (var i = 0; i < eventUpdate.length; i++) {
                obj.objectId = eventUpdate[i]
                dispatch(WorkPlanActions.update_workPlan(obj))
            }

        }
        else if (value === 'unlock') {
            obj.isActive = false;
            obj.objectId = rowData._id;
            dispatch(ApprovedPlanActions.update_approved_workPlan(obj))

            for (var i = 0; i < eventUpdate.length; i++) {
                obj.objectId = eventUpdate[i]
                dispatch(WorkPlanActions.update_workPlan(obj))
            }

        }
        else if (value === 'view') {
            const eventsIds = rowData.eventsIds;
            const arr = []

            for (var i = 0; i < eventsIds.length; i++) {
                let obj = {
                    objectId: eventsIds[i]
                }
                await axios.post(ApiService.getBaseUrl() + '/workPlans/getSpecificWorkPlanByUserId', obj)
                    .then((res) => {
                        arr.push(res.data.content[0])
                    })
                    .catch((error) => {
                        console.log(error, 'error')
                    })
            }

            let sendData = {
                rowData: rowData,
                userData: arr
            }

            history.push({
                pathname: '/events-parameters/events',
                state: sendData
            });
        }
        else if (value === 'approved') {
            obj.status = value;
            obj.objectId = rowData._id;
            dispatch(ApprovedPlanActions.update_approved_workPlan(obj))

            for (var i = 0; i < eventUpdate.length; i++) {
                obj.objectId = eventUpdate[i]
                dispatch(WorkPlanActions.update_workPlan(obj))
            }

        }
    }


    return (
        <div>

            <Grid container className={classes.root} spacing={3}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={2} style={{ alignItems: "center" }}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-age-native-simple">Month</InputLabel>
                            <Select
                                onChange={handleChange}
                                label="Month"
                                inputProps={{
                                    name: 'month',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                <MenuItem value={'1'}>Jan</MenuItem>
                                <MenuItem value={'2'}>Feb</MenuItem>
                                <MenuItem value={'3'}>Mar</MenuItem>
                                <MenuItem value={'4'}>Apr</MenuItem>
                                <MenuItem value={'5'}>May</MenuItem>
                                <MenuItem value={'6'}>Jun</MenuItem>
                                <MenuItem value={'7'}>Jul</MenuItem>
                                <MenuItem value={'8'}>Aug</MenuItem>
                                <MenuItem value={'9'}>Sep</MenuItem>
                                <MenuItem value={'10'}>Oct</MenuItem>
                                <MenuItem value={'11'}>Nov</MenuItem>
                                <MenuItem value={'12'}>Dec</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-age-native-simple">Year</InputLabel>
                            <Select
                                onChange={handleChange}
                                label="Year"
                                inputProps={{
                                    name: 'year',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                <MenuItem value={'2020'}>2020</MenuItem>
                                <MenuItem value={'2019'}>2019</MenuItem>
                                <MenuItem value={'2018'}>2018</MenuItem>
                                <MenuItem value={'2017'}>2017</MenuItem>
                                <MenuItem value={'2016'}>2016</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-age-native-simple">Designation</InputLabel>
                            <Select
                                onChange={handleChange}
                                label="Designation"
                                inputProps={{
                                    name: 'designation',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                {allDesignations && allDesignations.map((designation) => {
                                    return (
                                        <MenuItem key={designation._id} value={designation._id}>
                                            {designation.name}
                                        </MenuItem>
                                    )
                                }
                                )}
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-age-native-simple">Status</InputLabel>
                            <Select

                                onChange={handleChange}
                                label="Status"
                                inputProps={{
                                    name: 'status',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                <MenuItem value={'pending'}>Pending</MenuItem>
                                <MenuItem value={'approved'}>Approved</MenuItem>
                            </Select>
                        </FormControl>

                        <Button variant="contained" color="secondary" onClick={goForData}>Go</Button>
                    </Grid>

                    <div>

                        <GridTable
                            onRowClick={(data) => { handleRowClick(data) }}
                            onChange={(data, row) => { handleRowActions(data, row) }}
                            headCells={
                                [
                                    { id: 'Action', label: 'Action' },
                                    { id: 'employeeName', label: 'Employee' },
                                    { id: 'cpa', label: 'CPA % (Call plan andherence)' },
                                    { id: 'designation', label: 'Designation' },
                                    { id: 'month', label: 'Month' },
                                    { id: 'status', label: 'Status' },
                                ]
                            }
                            rows={usersPlanApprovel}
                        />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}