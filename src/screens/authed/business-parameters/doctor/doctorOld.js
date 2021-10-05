import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormGridTabs from '../../../components/Tabs/Form-Grid-Tabs'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import GridTable from '../../../components/GridTable/grid-table';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../../config/Store/Actions/doctor.action';
import { useAlert } from "react-alert";
import * as ZoneActions from '../../../../config/Store/Actions/zone.action';
import * as TerritoryActions from '../../../../config/Store/Actions/territory.action';
import * as CityActions from '../../../../config/Store/Actions/city.action';
import * as ProvinceActions from '../../../../config/Store/Actions/provice.action';
import * as DesignationActions from '../../../../config/Store/Actions/designation.action';
import * as HspActions from '../../../../config/Store/Actions/hospital.actions';
import * as QulifActions from '../../../../config/Store/Actions/qulification.action';
import * as SpecActions from '../../../../config/Store/Actions/speciality.action';
import * as DoctorActions from '../../../../config/Store/Actions/doctor.action';
import * as RepresActions from '../../../../config/Store/Actions/representative.actions';
import * as BricksActions from '../../../../config/Store/Actions/brick.action';
import * as UsersActions from '../../../../config/Store/Actions/user.actions';
import axios from 'axios';
import ApiService from '../../../../config/ApiService';

var todatDate = new Date();

const useStyles = makeStyles({
    root: {
    },
    inputTexts: {
        "& .MuiInputLabel-outlined.Mui-focused": {
            color: "black"
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "black"
        },
    },
    errorInput: {
        "& .MuiInputLabel-outlined.Mui-focused": {
            color: "red"
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "red"
        },

    },
});

function Doctor() {
    const classes = useStyles();
    const history = useHistory();
    const alert = useAlert();
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [pmdcRegistration, setPmdcRegistration] = useState('')
    const [zoneId, setZoneId] = useState('');
    const [territoryId, setTerritoryId] = useState('');
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [preferredDay, setPreferredDay] = React.useState([]);
    const [preferredTime, setpreferredTime] = useState('')
    const [qualificationId, setQualificationId] = React.useState('');
    const [designationId, setDesignationId] = useState('')
    const [specialityId, setSpecialityId] = React.useState('');
    const [hospitalId, setHospitalId] = useState('')
    const [provinceId, setProvinceId] = useState('')
    const [cityId, setCityId] = useState('')
    const [district, setDistrict] = useState('')
    const [brickId, setBrickId] = useState('')
    const [tierId, setTierId] = useState('')
    const [status, setStatus] = useState('')
    const [potential, setPotential] = useState('')
    const [representativeId, setRepresentativeId] = useState('')
    const [fee, setFee] = useState('')
    const [lastValidatedAt, setLastValidatedAt] = useState('')
    const [remarks, setRemarks] = useState('')
    const [objectId, setObjectId] = useState('')
    const [selectedData, setSelectedData] = useState(false)
    const [isEditingSelectedData, setIsEditingSelectedData] = useState(false)
    const [addForm, setAddForm] = useState(false);
    const [emailValidate, setEmailValidate] = useState(true)
    const [alreadyEmailExists, setAlreadyEmailExists] = useState(false)
    const [territory, setTerritory] = useState([]);
    const [bricks, setBricks] = useState([]);
    const [cities, setCities] = useState([]);
    const [hospital, setHospital] = useState([]);
    const [representative, setRepresentative] = useState([]);
    const [tab, setTab] = useState(0);
    const [open, setOpen] = useState(false)
    const user = useSelector((state) => state.user.user);
    const allZones = useSelector((state) => state.zone.allZones);
    const allTerritories = useSelector((state) => state.territory.allTerritorys);
    const allCities = useSelector((state) => state.city.allCities);
    const allProvinces = useSelector((state) => state.province.allProvinces);
    const allDesignations = useSelector((state) => state.designation.allDesignations);
    const allHospitals = useSelector((state) => state.hospital.allHospitals);
    const allQulifications = useSelector((state) => state.qulification.allQulifications);
    const allSpecialities = useSelector((state) => state.speciality.allSpecialities);
    const allDoctors = useSelector((state) => state.doctor.allDoctors);
    const allRepresentative = useSelector((state) => state.representative.allRepresentatives);
    const allBricks = useSelector((state) => state.bricks.allBricks);
    const usersEmails = useSelector(state => state.user.allUsers)
    const [emails, setEmails] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        setLastValidatedAt(todatDate);

        if (!allZones) {
            dispatch(ZoneActions.get_zones())
        }
        if (!refresh) {
            if (!allTerritories) {
                dispatch(TerritoryActions.get_territorys())
            }
            else {
                setTerritory(allTerritories)
            }
            if (!allBricks) {
                dispatch(BricksActions.get_Bricks());
            }
            else {
                setBricks(allBricks)
            }
            if (!allHospitals) {
                dispatch(HspActions.get_all_hospitals())
            }
            else {
                setHospital(allHospitals)
            }
            if (!allCities) {
                dispatch(CityActions.get_cities())
            }
            else {
                setCities(allCities)
            }
            if (!allRepresentative) {
                dispatch(RepresActions.get_all_representatives())
            }
            else {
                setRepresentative(allRepresentative)
            }
            setRefresh(true)
        }
        if (!allProvinces) {
            dispatch(ProvinceActions.get_province())
        }
        if (!allDesignations) {
            dispatch(DesignationActions.get_designation())
        }
        if (!allQulifications) {
            dispatch(QulifActions.get_qulification())
        }
        if (!allSpecialities) {
            dispatch(SpecActions.get_speciality())
        }
        if (!allDoctors || allDoctors.length === 0) {
            dispatch(DoctorActions.get_doctors())
        }
        if (!usersEmails) {
            dispatch(UsersActions.all_users())
        }
        if (usersEmails) {
            var arr = [];
            for (var key in usersEmails) {
                arr.push(usersEmails[key].email)
            }
            setEmails(arr)
        }

    }, [allRepresentative, allZones, allTerritories, allCities, allProvinces, allDesignations,
        allHospitals, allQulifications, allSpecialities, allDoctors, allBricks, usersEmails])

    const addDoctor = () => {
        setName('')
        setPmdcRegistration('')
        setZoneId('')
        setTerritoryId('')
        setPhone('')
        setEmail('')
        setPreferredDay([])
        setpreferredTime('')
        setQualificationId([])
        setDesignationId('')
        setSpecialityId([])
        setHospitalId('')
        setProvinceId('')
        setCityId('')
        setDistrict('')
        setBrickId('')
        setTierId('')
        setPotential('')
        setRepresentativeId('')
        setFee('')
        setLastValidatedAt('')
        setRemarks('')
        setStatus('')
        setObjectId('')
        setTab(0)
        setSelectedData(false)
        setIsEditingSelectedData(false)
        setAddForm(false)
    };

    const editData = () => {
        setIsEditingSelectedData(false)
        setSelectedData(false)
        setAddForm(true)
    }

    function handleRowClick(data) {
        setTab(1)
        setSelectedData(true)
        setObjectId(data._id)
        setName(data.name)
        setPmdcRegistration(data.pmdcRegistration)
        onChangeZone(data.zoneId)
        onChangeTerritory(data.territoryId)
        setCityId(data.cityId)
        setDistrict(data.district)
        setPhone(data.phone)
        setEmail(data.email)
        setPreferredDay(data.preferredDay)
        setpreferredTime(data.preferredTime)
        setQualificationId(data.qualificationId)
        setDesignationId(data.designationId)
        setSpecialityId(data.specialityId)
        setHospitalId(data.hospitalId)
        setBrickId(data.brickId)
        setTierId(data.tierId)
        setPotential(data.potential)
        setRepresentativeId(data.representativeId)
        setFee(data.fee)
        setLastValidatedAt(data.lastValidatedAt)
        setRemarks(data.remarks)
        setStatus(data.status)
        setIsEditingSelectedData(true)
        setAddForm(true)
    }

    function handleSave() {
        let body = {
            name,
            pmdcRegistration,
            territoryId,
            zoneId,
            phone,
            email,
            preferredDay,
            preferredTime,
            qualificationId,
            designationId,
            specialityId,
            hospitalId,
            provinceId,
            cityId,
            brickId,
            tierId,
            potential,
            representativeId,
            fee,
            lastValidatedAt,
            remarks,
            district,
            status,
        }
        if (objectId !== "") {
            body.updatedBy = user._id;
            body.objectId = objectId
            dispatch(DoctorActions.update_doctor(body))
            alert.success("Doctor Updated!");
            addDoctor()
        }
        else {
            if (
                name !== "" &&
                pmdcRegistration !== "" &&
                territoryId !== "" &&
                zoneId !== "" &&
                phone !== "" &&
                email !== "" &&
                preferredDay.length > 0 &&
                preferredTime !== "" &&
                qualificationId !== "" &&
                designationId !== "" &&
                specialityId !== "" &&
                hospitalId !== "" &&
                provinceId !== "" &&
                cityId !== "" &&
                brickId !== "" &&
                tierId !== "" &&
                potential !== "" &&
                representativeId !== "" &&
                fee !== "" &&
                lastValidatedAt !== "" &&
                remarks !== "" &&
                district !== "" &&
                status !== "" &&
                emailValidate === true &&
                !alreadyEmailExists
            ) {
                body.createdBy = user._id
                dispatch(Actions.add_doctor(body))
                alert.success("Doctor Added!");
                addDoctor()
            }
            else {
                alert.error("All fields are required!");
            }
        }

    }

    const deleteDoctor = () => {
        let body = {
            objectId
        }

        dispatch(DoctorActions.delete_doctor(body))
        addDoctor()
    }

    const emailChange = (e) => {
        const email = e.target.value
        setEmail(email)
        if (email !== "") {
            checkValidateFunc(email, 'email')
        }
        else {
            setEmailValidate(false)
        }

        if (emails !== null) {
            if (emails.includes(email)) {
                setAlreadyEmailExists(true)
            }
            else {
                setAlreadyEmailExists(false)
            }
        }
        else {
            dispatch(UsersActions.all_users())
        }
    }

    const checkValidateFunc = (text, type) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (type === 'email') {
            if (reg.test(text)) {
                setEmailValidate(true)
            }
            else {
                setEmailValidate(false)
            }
        }
    }


    const onChangeZone = (value) => {
        const arr = [];
        setZoneId(value)
        for (var i = 0; i < allTerritories.length; i++) {
            if (allTerritories[i].zoneId === value) {
                arr.push(allTerritories[i])
            }
        }
        setTerritory(arr)
    }

    const onChangeTerritory = (value) => {
        const arr = [];
        const hspArr = [];
        const representative = [];
        const cityArr = [];

        setTerritoryId(value)

        for (var i = 0; i < allBricks.length; i++) {
            if (allBricks[i].territoryId === value) {
                arr.push(allBricks[i])
            }
        }

        for (var i = 0; i < allHospitals.length; i++) {
            if (allHospitals[i].territoryId === value) {
                hspArr.push(allHospitals[i])
            }
        }

        for (var i = 0; i < allRepresentative.length; i++) {
            var territory = allRepresentative[i].territoryId
            for (var j = 0; j < territory.length; j++) {
                if (territory[j] === value) {
                    representative.push(allRepresentative[i])
                }
            }
        }

        setHospital(hspArr)
        setBricks(arr)
        setRepresentative(representative)

        let obj = {
            objectId: value
        }
        axios.post(ApiService.getBaseUrl() + '/territory/getSpecificTerritoryById', obj)
            .then((res) => {
                var data = res.data.content[0];
                setProvinceId(data.provinceId)
                var citiesIds = data.cityId;
                for (var i = 0; i < citiesIds.length; i++) {
                    for (var j = 0; j < allCities.length; j++) {
                        if (allCities[j]._id === citiesIds[i]) {
                            cityArr.push(allCities[j])
                        }
                    }
                }
                setCities(cityArr)
            })
            .catch((error) => {
                console.log(error, 'error')
            })

    }

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="javascript:void(0)" onClick={() => { history.push('/dashboard') }}>
                    Home
             </Link>
                <Typography color="textPrimary">Business-Parameters</Typography>
                <Typography color="textPrimary">Doctor</Typography>
            </Breadcrumbs>
            <Card className={classes.root}>
                <CardContent>
                    <FormGridTabs
                        tab={tab}
                        afterRowClick={() => { setTab(0) }}
                        form={

                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Dr. Name"
                                        placeholder="Dr."
                                        variant="outlined"
                                        fullWidth
                                        name='name'
                                        value={name}
                                        disabled={isEditingSelectedData}
                                        onChange={(e) => { setName(e.target.value.toUpperCase()) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="PMDC Registration No"
                                        placeholder="PMDC No"
                                        variant="outlined"
                                        fullWidth
                                        name='pmdcRegistration'
                                        value={pmdcRegistration}
                                        disabled={isEditingSelectedData}

                                        onChange={(e) => { setPmdcRegistration(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Phone"
                                        placeholder="type"
                                        variant="outlined"
                                        type={'number'}
                                        fullWidth
                                        name='phone'
                                        value={phone}
                                        disabled={isEditingSelectedData}
                                        onChange={(e) => { setPhone(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Email"
                                        placeholder="type"
                                        variant="outlined"
                                        type={'email'}
                                        fullWidth
                                        name='email'
                                        value={email}
                                        disabled={isEditingSelectedData}
                                        className={
                                            emailValidate ? classes.inputTexts : classes.errorInput
                                        }
                                        onChange={(e) => {
                                            emailChange(e)
                                        }}
                                    />
                                    {alreadyEmailExists &&
                                        <div style={{
                                            color: 'red'
                                        }}>
                                            Email Already Exists
                                        </div>
                                    }
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                        <InputLabel id="zoneId">Zone ID</InputLabel>
                                        <Select
                                            labelId="zoneId"
                                            label="Zone ID"
                                            fullWidth
                                            name='zoneId'
                                            value={zoneId}
                                            disabled={isEditingSelectedData}
                                            onChange={(e) => { onChangeZone(e.target.value) }}
                                        >
                                            {allZones && allZones.map((zone) => {
                                                return (
                                                    <MenuItem key={zone._id} value={zone._id}>
                                                        {zone.name}
                                                    </MenuItem>
                                                )
                                            }
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                        <InputLabel id="territoryId">Territory ID</InputLabel>
                                        <Select
                                            labelId="territoryId"
                                            label="Territory ID"
                                            fullWidth
                                            name='territoryId'
                                            value={territoryId}
                                            disabled={isEditingSelectedData}

                                            onChange={
                                                (e) => { onChangeTerritory(e.target.value) }
                                            }
                                        >
                                            {territory && territory.map((territory) => {
                                                return (
                                                    <MenuItem key={territory._id} value={territory._id}>
                                                        {territory.name}
                                                    </MenuItem>
                                                )
                                            }
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                        <InputLabel id="brickId">Brick</InputLabel>
                                        <Select
                                            labelId="brickId"
                                            label="Brick"
                                            fullWidth
                                            name='brickId'
                                            value={brickId}
                                            disabled={isEditingSelectedData}
                                            onChange={(e) => { setBrickId(e.target.value) }}
                                        >
                                            {bricks && bricks.map((brick) => {
                                                return (
                                                    <MenuItem key={brick._id} value={brick._id}>
                                                        {brick.name}
                                                    </MenuItem>
                                                )
                                            }
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                        <InputLabel id="hospitalId">Hospital / Clinic Name</InputLabel>
                                        <Select
                                            labelId="hospitalId"
                                            label="Hospital / Clinic Name"
                                            fullWidth
                                            name='hospitalId'
                                            value={hospitalId}
                                            disabled={isEditingSelectedData}
                                            onChange={(e) => { setHospitalId(e.target.value) }}
                                        >
                                            {hospital && hospital.map((hospitals) => {
                                                return (
                                                    <MenuItem key={hospitals._id} value={hospitals._id}>
                                                        {hospitals.name}
                                                    </MenuItem>
                                                )
                                            }
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                        <InputLabel id="provinceId">Province</InputLabel>
                                        <Select
                                            labelId="provinceId"
                                            label="Province"
                                            fullWidth
                                            name='provinceId'
                                            value={provinceId}
                                            disabled
                                        >
                                            {allProvinces && allProvinces.map((provinces) => {
                                                return (
                                                    <MenuItem key={provinces._id} value={provinces._id}>
                                                        {provinces.name}
                                                    </MenuItem>
                                                )
                                            }
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                        <InputLabel id="cityId">City</InputLabel>
                                        <Select
                                            labelId="cityId"
                                            label="City"
                                            fullWidth
                                            name='cityId'
                                            value={cityId}
                                            disabled={isEditingSelectedData}

                                            onChange={(e) => {
                                                setCityId(e.target.value)
                                            }}
                                        >
                                            {cities && cities.map((city) => {
                                                return (
                                                    <MenuItem key={city._id} value={city._id}>
                                                        {city.name}
                                                    </MenuItem>
                                                )
                                            }
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="District"
                                        placeholder="type"
                                        variant="outlined"
                                        fullWidth
                                        name='district'
                                        value={district}
                                        disabled={isEditingSelectedData}
                                        onChange={(e) => { setDistrict(e.target.value) }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                        <InputLabel id="preferredDay">Prefered Day</InputLabel>
                                        <Select
                                            labelId="preferredDay"
                                            label="Prefered Day"
                                            fullWidth
                                            name='preferredDay'
                                            multiple
                                            disabled={isEditingSelectedData}
                                            value={preferredDay}
                                            input={<Input
                                                onClick={() => setOpen(!open)} />}
                                            onChange={
                                                (e) => {
                                                    setPreferredDay(e.target.value)
                                                    setOpen(!open)
                                                }
                                            }
                                            open={open}
                                        >
                                            <MenuItem value={'Monday'}>Monday</MenuItem>
                                            <MenuItem value={'Tuesday'}>Tuesday</MenuItem>
                                            <MenuItem value={'Wednesday'}>Wednesday</MenuItem>
                                            <MenuItem value={'Thursday'}>Thursday</MenuItem>
                                            <MenuItem value={'Friday'}>Friday</MenuItem>
                                            <MenuItem value={'Saturday'}>Saturday</MenuItem>
                                            <MenuItem value={'Sunday'}>Sunday</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="time"
                                        label="Preferred Time for Remote Call"
                                        type="time"
                                        defaultValue={moment(preferredTime).format('THH:mm')}
                                        className={classes.textField}
                                        fullWidth
                                        name='preferredTime'
                                        value={preferredTime}
                                        onChange={(e) => { setpreferredTime(e.target.value) }}
                                        variant={'outlined'}
                                        disabled={isEditingSelectedData}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                        <InputLabel id="qualificationId">Qualification</InputLabel>
                                        <Select
                                            labelId="qualificationId"
                                            label="Qualification"
                                            fullWidth
                                            name='qualificationId'
                                            value={qualificationId}
                                            disabled={isEditingSelectedData}
                                            onChange={(e) => { setQualificationId(e.target.value) }}                                        >
                                            {allQulifications && allQulifications.map((qulification) => {
                                                return (
                                                    <MenuItem key={qulification._id} value={qulification._id}>
                                                        {qulification.name}
                                                    </MenuItem>
                                                )
                                            }
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                        <InputLabel id="designationId">Designation</InputLabel>
                                        <Select
                                            labelId="designationId"
                                            label="Designation"
                                            fullWidth
                                            name='designationId'
                                            disabled={isEditingSelectedData}

                                            value={designationId}
                                            onChange={(e) => { setDesignationId(e.target.value) }}
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
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                        <InputLabel id="specialityId">Speciality</InputLabel>
                                        <Select
                                            labelId="specialityId"
                                            label="Speciality"
                                            fullWidth
                                            name='specialityId'
                                            disabled={isEditingSelectedData}
                                            value={specialityId}
                                            onChange={(e) => { setSpecialityId(e.target.value) }}
                                        >
                                            {allSpecialities && allSpecialities.map((speciality) => {
                                                return (
                                                    <MenuItem key={speciality._id} value={speciality._id}>
                                                        {speciality.name}
                                                    </MenuItem>
                                                )
                                            }
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                        <InputLabel id="tierId">Call Objective</InputLabel>
                                        <Select
                                            labelId="tierId"
                                            label="Call Objective"
                                            fullWidth
                                            name='tierId'
                                            value={tierId}
                                            disabled={isEditingSelectedData}

                                            onChange={(e) => { setTierId(e.target.value) }}
                                        >
                                            <MenuItem value={'T1'}>T1</MenuItem>
                                            <MenuItem value={'T2'}>T2</MenuItem>
                                            <MenuItem value={'T3'}>T3</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Potential"
                                        placeholder="type"
                                        variant="outlined"
                                        fullWidth
                                        name='potential'
                                        value={potential}
                                        type={"number"}
                                        disabled={isEditingSelectedData}

                                        onChange={(e) => { setPotential(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                        <InputLabel id="status">Dr Status</InputLabel>
                                        <Select
                                            labelId="status"
                                            label="Dr Status"
                                            fullWidth
                                            name='status'
                                            value={status}
                                            disabled={isEditingSelectedData}

                                            onChange={(e) => { setStatus(e.target.value) }}
                                        >
                                            <MenuItem value={'Presciber'}>Presciber</MenuItem>
                                            <MenuItem value={'Non-Presciber'}>Non-Presciber</MenuItem>
                                            <MenuItem value={'Purchaser'}>Purchaser</MenuItem>
                                            <MenuItem value={'Activity'}>Activity</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                        <InputLabel id="representativeId">Assigned Rep</InputLabel>
                                        <Select
                                            labelId="representativeId"
                                            label="Assigned Rep"
                                            fullWidth
                                            name='representativeId'
                                            value={representativeId}
                                            disabled={isEditingSelectedData}

                                            onChange={(e) => { setRepresentativeId(e.target.value) }}
                                        >
                                            {representative && representative.map((represent) => {
                                                return (
                                                    <MenuItem key={represent.representativeId} value={represent.representativeId}>
                                                        {represent.name}
                                                    </MenuItem>
                                                )
                                            }
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Dr. Fee"
                                        placeholder="type"
                                        variant="outlined"
                                        type={'number'}
                                        fullWidth
                                        name='fee'
                                        value={fee}
                                        onChange={(e) => { setFee(e.target.value) }}
                                        disabled={isEditingSelectedData}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Last Validated Date"
                                        type="date"
                                        defaultValue=""
                                        variant={'outlined'}
                                        fullWidth
                                        value={moment(`${todatDate}`).format('YYYY-MM-DD')}
                                        onChange={(e) => { setLastValidatedAt(todatDate) }}
                                        className={classes.textField}
                                        disabled={isEditingSelectedData}

                                        InputLabelProps={{
                                            shrink: true,
                                        }} />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        label="Remarks"
                                        placeholder="type"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        name='remarks'
                                        value={remarks}
                                        disabled={isEditingSelectedData}
                                        onChange={(e) => { setRemarks(e.target.value) }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <ButtonGroup variant="contained" color="secondary" size={'large'}>
                                        {addForm &&
                                            <Button onClick={addDoctor}><AddIcon style={{ marginRight: "2px" }} /> Add</Button>
                                        }
                                        {!selectedData &&
                                            <Button disabled={selectedData} onClick={() => { handleSave() }}><SaveAltIcon style={{ marginRight: "5px" }} /> Save</Button>
                                        }
                                        {isEditingSelectedData &&
                                            <Button onClick={editData}><EditIcon style={{ marginRight: "5px" }} /> Edit</Button>
                                        }
                                        {isEditingSelectedData &&
                                            <Button onClick={deleteDoctor}><DeleteOutlineIcon style={{ marginRight: "5px" }} /> Delete</Button>
                                        }

                                    </ButtonGroup>
                                </Grid>

                            </Grid>
                        }
                        grid={
                            <div>
                                <GridTable
                                    onRowClick={(data) => { handleRowClick(data) }}
                                    headCells={
                                        [
                                            { id: 'dr.name', label: 'Dr. Names' },
                                            { id: 'tierId', label: 'Tier ID' },
                                            { id: 'fee', label: 'Fee' },

                                        ]
                                    }
                                    rows={allDoctors} />
                            </div>
                        }
                    />
                </CardContent>
            </Card>
        </>
    )
}

export default Doctor