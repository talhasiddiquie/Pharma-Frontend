import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useDispatch, useSelector } from 'react-redux';
import * as ActionsPlan from '../../../../config/Store/Actions/workPlan.action';
import * as BricksActions from '../../../../config/Store/Actions/brick.action';

const today = new Date();

export default function EditCalender(props) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [doctor, setDoctor] = useState('')
    const [imsBrickId, setImsBrickId] = useState('')
    const [doctorTierId, setDoctorTierId] = useState('')
    const [user_id, setUser_id] = useState('')
    const [formStatus, setFormStatus] = useState(false)
    const [eventStatus, setStatus] = useState('pending')
    const [name, setUserName] = useState('')
    const [designation, setDesignation] = useState('')
    const [designationId, setDesignationId] = useState('')
    const [cityName, setCityName] = useState('')
    const [doctor_id, setDoctor_id] = useState(null);
    const [objectId, setObject_id] = useState(null);
    const [previousMeetUp, setPreviousMeetUp] = useState([]);
    const [doctorCounter, setDoctorCounter] = useState('');
    const [managerId, setManagerId] = useState('');
    const [repRegions, setRepRegions] = useState([]);
    const [repZones, setRepZones] = useState([]);
    const [repTerritories, setTerritories] = useState([]);
    const [specialityId, setSpecialityId] = useState('');
    const [provinceId, setProvinceId] = useState('');
    const [hospitalId, setHospitalId] = useState('');
    const [zoneId, setZoneId] = useState('');
    const [territoryId, setTerritoryId] = useState('');
    const user = useSelector((state) => state.user.user);
    const imsBricks = useSelector((state) => state.bricks.allBricks);

    useEffect(() => {
        if (!imsBricks) {
            dispatch(BricksActions.get_Bricks());
        }
    }, [imsBricks])


    useEffect(() => {
        if (props.eventToEdit) {
            const event = { ...props.eventToEdit }
            setDoctor(event.doctor);
            setDescription(event.description);
            setStart(event.start);
            setEnd(event.end);
            setTitle(event.doctor);
            setDoctor_id(event.doctor_id);
            setImsBrickId(event.imsBrickId);
            setObject_id(event._id);
            setDoctorTierId(event.doctorTierId);
            setFormStatus(event.isActive);
            setStatus(event.status);
            setUserName(event.name);
            setDesignation(event.designation);
            setDesignationId(event.designationId);
            setCityName(event.cityName);
            setDoctorCounter(event.doctorCounter);
        }
        else if (props.eventToAdd) {
            const event = { ...props.eventToAdd }
            setTitle(event.doctor);
            setDoctor(event.doctor);
            setDoctor_id(event.doctor_id);
            setImsBrickId(event.imsBrickId);
            setDoctorTierId(event.doctorTierId);
            setCityName(event.cityName);
            setUser_id(user._id);
            setUserName(user.name);
            setDesignation(user.designation);
            setDesignationId(user.designationId);
            setManagerId(user.managerId);
            setPreviousMeetUp(event.previousMeetUp);
            setFormStatus(false);
            setStatus(eventStatus);
            setRepRegions(event.repRegions);
            setRepZones(event.repZones);
            setTerritories(event.repTerritories);
            setSpecialityId(event.specialityId)
            setProvinceId(event.provinceId)
            setHospitalId(event.hospitalId)
            setZoneId(event.zoneId)
            setTerritoryId(event.territoryId)

            if (event.doctorsMeetingCounter !== undefined) {
                setDoctorCounter(event.doctorsMeetingCounter + 1);
            }
            else {
                setDoctorCounter(1);
            }
        }
    }, props.eventToEdit, props.eventToAdd)

    function handleAdd() {
        var cityNameWithTitle = cityName + ' ' + title;
        const body = {
            title: cityNameWithTitle,
            description,
            start,
            end,
            doctor,
            imsBrickId,
            doctor_id,
            user_id,
            doctorTierId,
            name,
            designation,
            designationId,
            isActive: true,
            status: eventStatus,
            cityName,
            doctorCounter,
            allDay: true,
            managerId,
            statusEvent: 'open',
            repRegions,
            repZones,
            repTerritories,
            specialityId,
            provinceId,
            hospitalId,
            zoneId,
            territoryId,
        }
        dispatch(ActionsPlan.add_workPlan(body));
        dispatch(ActionsPlan.count_doctor_workPlan());
        handleClose();
    }

    function handleSaveChanges() {
        var cityNameWithTitle = cityName + ' ' + title;
        const body = {
            title: cityNameWithTitle,
            description,
            start,
            end,
            objectId,
            name,
            isActive: formStatus,
            status: eventStatus,
        }

        dispatch(ActionsPlan.update_workPlan(body));
        dispatch(ActionsPlan.count_doctor_workPlan());
        handleClose();
    }

    function handleClose() {
        setTitle('')
        setDescription('')
        setStart('')
        setEnd('')
        setDoctor('')
        setImsBrickId('')
        props.close()
    }


    return (
        <div>
            <Dialog
                open={props.open}
                onClose={() => { handleClose() }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth={'sm'}
            >
                <DialogTitle id="alert-dialog-title">
                    <AppBar position="static">
                        <Toolbar>
                            {props.editable ? <EditIcon /> : <AddIcon />}
                            <Typography variant="h6">
                                {props.editable ? "Edit Event" : "Add Event"}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </DialogTitle>
                <DialogContent>
                    {cityName && <div>City Name: {cityName}</div>}
                    {previousMeetUp && previousMeetUp.map((elem, key) => {
                        return (
                            <div>
                                <span>
                                    Date: {moment(elem.start).format('YYYY-MM-DD')}
                                </span>
                                <span>
                                    Time: {moment(elem.start).format('HH:mm')}
                                </span>
                            </div>
                        )
                    })}
                    <div className={'eventDialogContent'}>

                        <TextField
                            id={"title"}
                            label={"Title"}
                            name={"title"}
                            onChange={(e) => { setTitle(e.target.value) }}
                            variant={"outlined"}
                            required={true}
                            fullWidth
                            value={title}
                            disabled={true}
                        />

                        <TextField
                            id="doctor"
                            label="Doctor"
                            name="doctor"
                            onChange={(e) => { setDoctor(e.target.value) }}
                            variant="outlined"
                            required
                            fullWidth
                            disabled={true}
                            value={doctor}
                        />

                        <InputLabel id="imsBrickId">IMS Brick</InputLabel>
                        <Select
                            labelId="imsBrickId"
                            label="IMS Brick"
                            fullWidth
                            name='imsBrickId'
                            disabled={true}
                            value={imsBrickId}
                            onChange={(e) => { setImsBrickId(e.target.value) }}
                        >
                            {imsBricks && imsBricks.map((imsBricks) => {
                                return (
                                    <MenuItem key={imsBricks._id} value={imsBricks._id}>
                                        {imsBricks.name}
                                    </MenuItem>
                                )
                            }
                            )}
                        </Select>

                        <TextField
                            id="stardate-datetime-local"
                            label="Start Date and Time"
                            type="datetime-local"
                            defaultValue={moment(start).format('YYYY-MM-DDTHH:mm')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{ min: today }}
                            fullWidth
                            disabled={formStatus}
                            onChange={(e) => { setStart(e.target.value) }}
                        />

                        <TextField
                            id="enddate"
                            label="End Date and Time"
                            type="datetime-local"
                            min={today}
                            defaultValue={moment(end).format('YYYY-MM-DDTHH:mm')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            disabled={formStatus}
                            onChange={(e) => { setEnd(e.target.value) }}

                        />

                        <TextField
                            className="mt-8 mb-16"
                            id="desc"
                            label="Description"
                            type="text"
                            name="desc"
                            multiline
                            rows={5}
                            variant="outlined"
                            onChange={(e) => { setDescription(e.target.value) }}
                            disabled={formStatus}
                            fullWidth
                            value={description}
                        />

                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { handleClose() }} color="red">
                        Cancel
          </Button>

                    {props.editable ? <Button disabled={formStatus} onClick={() => { handleSaveChanges() }} color="primary" autoFocus style={{ color: "#2b90d9" }}>
                        Save Changes
                    </Button>

                        : title == '' ? <Button disabled color="primary" autoFocus >Add</Button>
                            : description == '' ? <Button disabled color="primary" autoFocus >Add</Button>
                                :
                                start == '' ? <Button disabled color="primary" autoFocus >Add</Button> :
                                    end == '' ? <Button disabled color="primary" autoFocus >Add</Button> :
                                        <Button onClick={() => { handleAdd() }} color="primary" autoFocus style={{ color: "#2b90d9" }}>
                                            Add
                    </Button>
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
}