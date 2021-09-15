import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import moment from 'moment';
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import './styles.css'
import SidebarContent from './SidebarContent'
import AddEventDialogue from './AddEvent'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from "react-alert";
import * as WorkPlanActions from '../../../../config/Store/Actions/workPlan.action';
import * as ApprovedPlanActions from '../../../../config/Store/Actions/approvePlan.actions';
import * as DocsActions from '../../../../config/Store/Actions/doctor.action';
import * as RepresentativeActions from '../../../../config/Store/Actions/representative.actions';

const drawerWidth = 240;
var month = moment().format("M")

const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',
    },

    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: 0,
        padding: theme.spacing(2.5),

        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
        padding: theme.spacing(2.5),
        paddingTop: 0,

    },
}));

const localizer = momentLocalizer(moment);

const Calender = () => {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const location = useLocation();
    const alert = useAlert();
    const [open, setOpen] = React.useState(true);
    const dispatch = useDispatch();
    const [openAddEventDialog, setOpenAddEventDialog] = useState(false)
    const [editable, setEditable] = useState(false)
    const [eventToEdit, setEventToEdit] = useState(null)
    const [eventToAdd, setEventToAdd] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const [userWorkPlan, setUserWorkPlan] = useState([]);
    const [approvedSended, setApprovedSended] = useState(true);
    const [checkApproval, setCheckApproval] = useState(false);
    const [repersentativeData, setRepersentativeData] = useState('')
    const [reject, setReject] = useState(false);
    const [modify, setModify] = useState(false);
    const [approved, setApproved] = useState(false);

    const user = useSelector((state) => state.user.user);
    const allWorkPlan = useSelector((state) => state.workPlan.allWorkPlan);
    const doctorEVentCount = useSelector((state) => state.workPlan.countDocs);
    const allApprovelWorkPlan = useSelector((state) => state.approvedPlan.allApprovelWorkPlan);
    const allDoctors = useSelector((state) => state.doctor.allDoctors);
    const allRepresentatives = useSelector((state) => state.representative.allRepresentatives);
console.log(doctorEVentCount , 'doctorEVentCount');
    useEffect(() => {
        const mangerSendUserData = location.state;

        if (!allWorkPlan) {
            dispatch(WorkPlanActions.get_workPlan())
        }
        if (!allDoctors || allDoctors.length === 0) {
            dispatch(DocsActions.get_doctors())
        }
        if (!doctorEVentCount) {
            dispatch(WorkPlanActions.count_doctor_workPlan())
        }
        if (!allApprovelWorkPlan) {
            dispatch(ApprovedPlanActions.get_approved_workPlan())
        }

        if (!allRepresentatives) {
            dispatch(RepresentativeActions.get_all_representatives())
        }

        if (mangerSendUserData !== undefined) {
            if (!refresh) {
                setUserWorkPlan(mangerSendUserData.userData)
                setRepersentativeData(mangerSendUserData.rowData)
                setRefresh(true)
            }
            else {
                if (allWorkPlan) {
                    const arr = []
                    for (var key in allWorkPlan) {
                        if (mangerSendUserData.rowData.employeeId === allWorkPlan[key].user_id) {
                            arr.push(allWorkPlan[key])
                        }
                    }
                    setUserWorkPlan(arr)
                }
            }

        }
        else {
            if (allWorkPlan) {
                const arr = []
                for (var key in allWorkPlan) {
                    if (user._id === allWorkPlan[key].user_id) {
                        arr.push(allWorkPlan[key])
                    }
                }
                setUserWorkPlan(arr)
                setRefresh(true)
                for (var key in allApprovelWorkPlan) {
                    if (allApprovelWorkPlan[key].month == month) {
                        if (allApprovelWorkPlan[key].employeeId === user._id) {
                            if (allApprovelWorkPlan[key].status === "approved") {
                                setCheckApproval(true)
                                setApprovedSended(false)
                            }
                            else {
                                setCheckApproval(false)
                            }

                            if (allApprovelWorkPlan[key].isActive === true && allApprovelWorkPlan[key].status === 'pending') {
                                setApprovedSended(false)
                                setRepersentativeData('')
                            }
                            else if (allApprovelWorkPlan[key].isActive === false && allApprovelWorkPlan[key].status === 'pending') {
                                setApprovedSended(true)
                                setRepersentativeData('')
                            }
                        }
                    }
                }
            }
        }

    }, [allWorkPlan, allApprovelWorkPlan, allDoctors, allRepresentatives])


    const handleDrawerClose = () => {
        setOpen(false);
    };

    const AddToCalender = async (doctor, cityName) => {
        var regions = [];
        var zones = [];
        var territories = [];

        for (var keys in allRepresentatives) {
            if (allRepresentatives[keys].representativeId === doctor.representativeId) {
                regions = allRepresentatives[keys].regionId;
                zones = allRepresentatives[keys].zoneId;
                territories = allRepresentatives[keys].territoryId;
            }
        }
        const previousMeetUp = []
        for (var i = 0; i < doctorEVentCount.length; i++) {
            if (user._id === doctorEVentCount[i]._id) {
                const data = doctorEVentCount[i].data;
                for (var key in data) {
                    if (doctor._id === data[key].doctor_id) {
                        let obj = {}
                        obj.start = data[key].start;
                        obj.end = data[key].end;
                        previousMeetUp.push(obj)
                    }
                }
            }
        }
        setEventToAdd(
            {
                doctor: doctor.name,
                doctor_id: doctor._id,
                imsBrickId: doctor.brickId,
                doctorTierId: doctor.tierId,
                cityName: cityName,
                previousMeetUp: previousMeetUp,
                doctorsMeetingCounter: doctor.count,
                repRegions: regions,
                repZones: zones,
                repTerritories: territories,
                specialityId: doctor.specialityId,
                provinceId: doctor.provinceId,
                hospitalId: doctor.hospitalId,
                zoneId: doctor.zoneId,
                territoryId: doctor.territoryId
            }
        )
        setOpenAddEventDialog(true)
    }

    const sendApprovel = () => {
        var sendSecondTimeForApproval = false
        var objectId = ''
        let obj = {};
        const eventsIds = [];
        const doctorsName = [];
        const doctorsId = [];
        const startDates = [];
        const endDates = [];
        var tier1Docs = 0;
        var tier2Docs = 0;
        var tier3Docs = 0;
        var tier1Percantage = 0;
        var tier2Percantage = 0;
        var tier3Percantage = 0;
        var totalPercantage = 0;


        for (var keys in allDoctors) {
            if (allDoctors[keys].representativeId === user._id) {

                var checkDoctorsName = doctorsName.includes(allDoctors[keys].name);
                var checkDoctorsId = doctorsId.includes(allDoctors[keys]._id);
                if (!checkDoctorsName) {
                    doctorsName.push(allDoctors[keys].name);
                }
                if (!checkDoctorsId) {
                    doctorsId.push(allDoctors[keys]._id);
                    if (allDoctors[keys].tierId === 'T1') {
                        tier1Docs = tier1Docs + 1;
                    }
                    else if (allDoctors[keys].tierId === 'T2') {
                        tier2Docs = tier2Docs + 1;

                    }
                    else if (allDoctors[keys].tierId === 'T3') {
                        tier3Docs = tier3Docs + 1;

                    }
                }
                for (var key in userWorkPlan) {
                    if (moment(userWorkPlan[key].start).format('M') === month) {
                        if (userWorkPlan[key].doctor_id === allDoctors[keys]._id) {
                            var checkStartDates = startDates.includes(userWorkPlan[key].start);
                            var checkEndDates = endDates.includes(userWorkPlan[key].end);
                            var eventId = eventsIds.includes(userWorkPlan[key]._id);

                            if (!checkStartDates) {
                                startDates.push(userWorkPlan[key].start);
                            }
                            if (!checkEndDates) {
                                endDates.push(userWorkPlan[key].start);
                            }
                            if (!eventId) {
                                eventsIds.push(userWorkPlan[key]._id);
                            }
                            if (userWorkPlan[key].doctorTierId === 'T1') {
                                if (userWorkPlan[key].doctorCounter >= 3) {
                                    tier1Percantage = 3 / 3 * 100;
                                    if (tier1Percantage > 100) {
                                        tier1Percantage = 100
                                    }
                                    else {
                                        tier1Percantage = Number(tier1Percantage.toFixed(2))
                                    }
                                }
                                else {
                                    tier1Percantage = 0;
                                }
                            }
                            if (userWorkPlan[key].doctorTierId === 'T2') {
                                if (userWorkPlan[key].doctorCounter >= 2) {
                                    tier2Percantage = 2 / 2 * 100;
                                    if (tier2Percantage > 100) {
                                        tier2Percantage = 100
                                    }
                                    else {
                                        tier2Percantage = Number(tier2Percantage.toFixed(2))
                                    }
                                }
                                else {
                                    tier2Percantage = 0;
                                }
                            }
                            if (userWorkPlan[key].doctorTierId === 'T3') {
                                if (userWorkPlan[key].doctorCounter >= 1) {
                                    tier3Percantage = 1 / 1 * 100;
                                    if (tier3Percantage > 100) {
                                        tier3Percantage = 100
                                    }
                                    else {
                                        tier3Percantage = Number(tier3Percantage.toFixed(2))
                                    }
                                }
                                else {
                                    tier3Percantage = 0;
                                }
                            }
                        }
                    }
                }
            }
        }

        if (eventsIds.length > 0) {
            var total = tier1Percantage + tier2Percantage + tier3Percantage;
            totalPercantage = total / 300 * 100;
            totalPercantage = Number(totalPercantage.toFixed(2))

            obj.eventsIds = eventsIds;
            obj.doctorsName = doctorsName;
            obj.doctorsId = doctorsId;
            obj.startDates = startDates;
            obj.endDates = endDates;
            obj.employeeName = userWorkPlan[0].name;
            obj.managerId = userWorkPlan[0].managerId;
            obj.employeeId = userWorkPlan[0].user_id;
            obj.designation = userWorkPlan[0].designation;
            obj.designationId = userWorkPlan[0].designationId;
            obj.regionId = userWorkPlan[0].repRegions;
            obj.zoneId = userWorkPlan[0].repZones;
            obj.territoryId = userWorkPlan[0].repTerritories;
            obj.month = month;
            obj.year = moment(userWorkPlan[0].start).format('YYYY')
            obj.status = "pending";
            obj.isActive = true;

            obj.tier1Per = tier1Percantage;
            obj.tier2Per = tier2Percantage;
            obj.tier3Per = tier3Percantage;
            obj.totalPer = totalPercantage;
            obj.t1Docs = tier1Docs;
            obj.t2Docs = tier2Docs;
            obj.t3Docs = tier3Docs;

            for (var key in allApprovelWorkPlan) {
                if (allApprovelWorkPlan[key].employeeId === user._id) {
                    if(allApprovelWorkPlan[key].month === month){
                        sendSecondTimeForApproval = true
                        objectId = allApprovelWorkPlan[key]._id
                    }
                }
            }
            obj.objectId = objectId;
            if (sendSecondTimeForApproval) {
                dispatch(ApprovedPlanActions.update_approved_workPlan(obj));

            }
            else {
                dispatch(ApprovedPlanActions.add_approved_workPlan(obj));
            }
        }
        else {
            alert.error('Please Plan Meetings First')
        }

    }


    const managerAction = (param) => {
        var obj = {};
        var eventUpdate = repersentativeData.eventsIds

        if (param === 'reject') {
            obj.isActive = false
            obj.status = 'pending';
            obj.objectId = repersentativeData._id;
            dispatch(ApprovedPlanActions.update_approved_workPlan(obj))
            for (var i = 0; i < eventUpdate.length; i++) {
                obj.objectId = eventUpdate[i]
                dispatch(WorkPlanActions.update_workPlan(obj))
            }
            setReject(true)

        }
        else if (param === 'modify') {
            obj.isActive = false
            obj.objectId = repersentativeData._id;
            dispatch(ApprovedPlanActions.update_approved_workPlan(obj))
            for (var i = 0; i < eventUpdate.length; i++) {
                obj.objectId = eventUpdate[i]
                dispatch(WorkPlanActions.update_workPlan(obj))
            }
            setModify(true)
        }
        else if (param === 'appproved') {
            obj.isActive = true
            obj.status = 'approved';
            obj.objectId = repersentativeData._id;
            dispatch(ApprovedPlanActions.update_approved_workPlan(obj))
            for (var i = 0; i < eventUpdate.length; i++) {
                obj.objectId = eventUpdate[i]
                dispatch(WorkPlanActions.update_workPlan(obj))
            }
            setApproved(true)
        }
    }


    return (
        <section className={'eventsContainer'}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="javascript:void(0)" onClick={() => { history.push('/dashboard') }}>
                    Home
        </Link>

                <Typography color="textPrimary">Events</Typography>
            </Breadcrumbs>
            <Card>
                <CardContent>
                    <div className="card-body">
                        <div className={classes.root}>
                            <CssBaseline />
                            {repersentativeData !== "" ?
                                null
                                :
                                <Drawer
                                    className={classes.drawer}
                                    variant="persistent"
                                    anchor="left"
                                    open={open}
                                    classes={{
                                        paper: classes.drawerPaper,
                                    }}

                                >
                                    <div className={classes.drawerHeader}>
                                        <IconButton onClick={handleDrawerClose}>
                                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                                        </IconButton>
                                    </div>
                                    <Divider />
                                    <SidebarContent
                                        AddToCalender={(doctor, cityName) => AddToCalender(doctor, cityName)}
                                    />
                                </Drawer>
                            }
                            <main
                                className={clsx(classes.content, {
                                    [classes.contentShift]: open,
                                })}
                            >
                                <div className={classes.drawerHeader} />
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "10px 0px 20px",
                                }}>
                                    <p style={{ margin: "0px 0px 0px 10px" }}>Add your events so you won't forget.</p>
                                </div>


                                <div id="calendar">
                                    {allWorkPlan &&
                                        <Calendar
                                            localizer={localizer}
                                            defaultDate={new Date()}
                                            startAccessor="start"
                                            endAccessor="end"
                                            defaultView="month"
                                            events={userWorkPlan}
                                            views={['month', 'week', 'day']}
                                            onSelectEvent={event => {
                                                setOpenAddEventDialog(true)
                                                setEditable(true)
                                                setEventToEdit(event)
                                            }}
                                            style={{ height: "100vh" }}
                                        />
                                    }

                                </div>
                                {repersentativeData === "" && approvedSended ?
                                    <Button color="primary" onClick={sendApprovel}>
                                        Send For Approvel
                                    </Button>
                                    : repersentativeData === "" && checkApproval === false ?
                                        <Button color="primary" disabled>
                                            Already Send For Approvel
                                        </Button>

                                        :
                                        repersentativeData === "" && checkApproval === true ?
                                            <Button color="primary" disabled>
                                                Your Plans has been approved
                                            </Button>
                                            : null
                                }
                                {
                                    repersentativeData !== "" ?
                                        <div>
                                            <Button color="primary"
                                                disabled={reject}
                                                onClick={() => { managerAction('reject') }}>
                                                Reject
                                            </Button>
                                            <Button
                                                disabled={modify}

                                                onClick={() => { managerAction('modify') }}>
                                                Modify
                                            </Button>
                                            <Button
                                                disabled={approved}

                                                onClick={() => { managerAction('appproved') }}>
                                                Approved
                                            </Button>
                                        </div>
                                        :
                                        null
                                }
                            </main>

                        </div>
                    </div>
                    <AddEventDialogue
                        editable={editable}
                        eventToEdit={eventToEdit} open={openAddEventDialog} eventToAdd={eventToAdd}
                        close={() => { setOpenAddEventDialog(false); setEditable(false); setEventToEdit(null) }} />
                </CardContent>
            </Card>
        </section>
    )
}

export default Calender
