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
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { useDispatch, useSelector } from 'react-redux';
import * as TerritoryActions from '../../../../config/Store/Actions/territory.action'
import * as ZoneActions from '../../../../config/Store/Actions/zone.action'
import * as RegionActions from '../../../../config/Store/Actions/region.action';
import * as ProvinceActions from '../../../../config/Store/Actions/provice.action'
import * as DesignationActions from '../../../../config/Store/Actions/designation.action'
import * as RepresentativeActions from '../../../../config/Store/Actions/representative.actions'
import * as CityActions from '../../../../config/Store/Actions/city.action';
import * as UsersActions from '../../../../config/Store/Actions/user.actions';
import * as CompanyActions from '../../../../config/Store/Actions/company.action';
import axios from 'axios';
import ApiService from '../../../../config/ApiService';
import { useAlert } from "react-alert";
import moment from 'moment'
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles(() => ({
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
}));

function Representative() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user);
    const alert = useAlert();
    const allZones = useSelector((state) => state.zone.allZones);
    const allTerritories = useSelector((state) => state.territory.allTerritorys);
    const allRegions = useSelector((state) => state.region.allRegions);
    const allProvinces = useSelector((state) => state.province.allProvinces);
    const allDesignations = useSelector((state) => state.designation.allDesignations);
    const allRepresentatives = useSelector((state) => state.representative.allRepresentatives);
    const allCities = useSelector((state) => state.city.allCities);
    const usersEmails = useSelector(state => state.user.allUsers);
    const allCompanies = useSelector((state) => state.company.allCompanies)
    const [tab, setTab] = useState(0);
    const [name, setName] = useState('')
    const [identifier, setIdentifier] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [workType, setWorkType] = useState('')
    const [maritalStatus, setMaritalStatus] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [bloodGroupId, setBloodGroupId] = useState('')
    const [designationId, setDesignationId] = useState('')
    const [provinceId, setProvinceId] = useState('')
    const [headquarterId, setHeadquarterId] = useState('')
    const [sellingLine, setSellingLine] = useState('')
    const [managerId, setManager] = useState('')
    const [zoneId, setZoneId] = useState([])
    const [territoryId, setTerritoryId] = useState([])
    const [regionId, setRegionId] = useState([])
    const [objectId, setobjectId] = useState('')
    const [managersName, setManagerName] = useState('')
    const [designationDataStart, setDesignationDataStart] = useState('')
    const [designationDataEnd, setDesignationDataEnd] = useState('')
    const [password, genratePassword] = useState('')
    const [cities, setCities] = useState([]);
    const [emailValidate, setEmailValidate] = useState(true)
    const [alreadyEmailExists, setAlreadyEmailExists] = useState(false)
    const [addForm, setAddForm] = useState(false);
    const [selectedData, setSelectedData] = useState(false)
    const [isEditingSelectedData, setIsEditingSelectedData] = useState(false)
    const [loader, setLoader] = useState(false);
    const [openRegion, setOpenRegion] = useState(false)
    const [openZone, setOpenZone] = useState(false)
    const [openTerritory, setOpenTerritory] = useState(false)
    const [repUserId, setRepUserId] = useState('');
    const [repUserPassword, setRepUserPassword] = useState('');
    const [emails, setEmails] = useState([]);
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        if (!refresh) {
            if (!allCities) {
                dispatch(CityActions.get_cities())
            }
            else {
                setCities(allCities)
            }
            setRefresh(true)
        }

        if (!allRegions) {
            dispatch(RegionActions.get_regions())
        }
        if (!allZones) {
            dispatch(ZoneActions.get_zones())
        }
        if (!allTerritories) {
            dispatch(TerritoryActions.get_territorys())
        }

        if (!allProvinces) {
            dispatch(ProvinceActions.get_province())
        }

        if (!allDesignations) {
            dispatch(DesignationActions.get_designation())
        }
        if (!allRepresentatives) {
            dispatch(RepresentativeActions.get_all_representatives())
        }
        if (!allCompanies) {
            dispatch(CompanyActions.get_companies())
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
        generatePassword()

    }, [allZones, allTerritories, allRegions, allProvinces, allDesignations, allRepresentatives, allCities, usersEmails, refresh, allCompanies]);

    const generatePassword = () => {
        try {
            var length = 8,
                charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
                password = "";
            for (var i = 0, n = charset.length; i < length; ++i) {
                password += charset.charAt(Math.floor(Math.random() * n));
            }
            genratePassword(password)
        }
        catch (e) {
            console.log(e)
        }
    }

    function handleRowClick(data) {
        setTab(1)
        setIdentifier(data.identifier)
        setName(data.name)
        setPhone(data.phone)
        setEmail(data.email)
        setGender(data.gender)
        setWorkType(data.workType)
        setMaritalStatus(data.maritalStatus)
        setDateOfBirth(data.dateOfBirth)
        setBloodGroupId(data.bloodGroupId)
        setHeadquarterId(data.headquarterId)
        setSellingLine(data.sellingLine)
        setManager(data.managerId)
        setTerritoryId(data.territoryId)
        setRegionId(data.regionId)
        setZoneId(data.zoneId)
        setSelectedData(true)
        setobjectId(data._id)
        setDesignationDataStart(data.designationDataStart)
        setDesignationDataEnd(data.designationDataEnd)
        setIsEditingSelectedData(true)
        setAddForm(true)
        setRepUserId(data.representativeId)
        setDesignationId(data.designationId);
        designationsHandle(data.designationId)
        onChangeProvince(data.provinceId)
        setRepUserPassword(data.password)
    }

    const handleAdd = () => {
        setIdentifier('')
        setName('')
        setPhone('')
        setEmail('')
        setGender('')
        setWorkType('')
        setMaritalStatus('')
        setDateOfBirth('')
        setBloodGroupId('')
        setDesignationId('')
        setProvinceId('')
        setHeadquarterId('')
        setSellingLine('')
        setManager('')
        setDesignationDataStart('')
        setDesignationDataEnd('')
        setZoneId([])
        setTerritoryId([])
        setRegionId([])
        setobjectId('')
        setRepUserId('')
        setRepUserPassword('')
        setTab(0)
        setSelectedData(false)
        setIsEditingSelectedData(false)
        setAddForm(false)
        setLoader(false)
        setAlreadyEmailExists(false)
    }

    const editData = () => {
        setIsEditingSelectedData(false)
        setSelectedData(false)
        setAddForm(true)
        setRepUserPassword('')
    }

    function handleSave() {
        const body = {
            identifier,
            name,
            phone,
            email,
            gender,
            workType,
            maritalStatus,
            dateOfBirth,
            bloodGroupId,
            designationId,
            provinceId,
            headquarterId,
            sellingLine,
            managerId,
            zoneId,
            territoryId,
            regionId,
            designationDataStart,
            designationDataEnd,
        }
        if (objectId !== "") {
            body.objectId = objectId;
            body.updatedBy = user._id;
            let emailSignUpObj = {
                name: body.name,
                email: body.email,
                designation: body.designationId.name,
                designationId: body.designationId._id,
                role: body.designationId.type,
                managerId: body.managerId,
                objectId: repUserId
            }

            dispatch(RepresentativeActions.update_representative(body))
            alert.success("Representative Updated!");

            dispatch(UsersActions.update_user(emailSignUpObj))
            alert.success("User Updated!");
            handleAdd()
        }
        else {
            body.password = password
            body.createdBy = user._id

            if (!alreadyEmailExists && emailValidate === true && identifier !== "" && name !== "" && phone !== "" && email !== "" && gender !== "" && workType !== "" && maritalStatus !== "" && dateOfBirth !== "" && bloodGroupId !== ""
                && designationId !== "" && provinceId !== "" && headquarterId !== "" && sellingLine !== ""
                && managerId !== ""
                && zoneId !== "" && territoryId !== "" && regionId !== "" && designationDataStart !== "" && designationDataEnd !== "" && password !== ''
            ) {
                let emailSignUpObj = {
                    name: body.name,
                    email: body.email,
                    password: body.password,
                    designation: body.designationId.name,
                    designationId: body.designationId._id,
                    role: body.designationId.type,
                    managerId: body.managerId
                }
                setLoader(true)
                setIsEditingSelectedData(true)
                axios.post(ApiService.getBaseUrl() + '/representative/sendEmail', emailSignUpObj)
                    .then((res) => {
                        if (res.status === 200) {
                            if (res.data.success) {
                                axios.post(ApiService.getBaseUrl() + '/users/signUp', emailSignUpObj)
                                    .then((res) => {
                                        dispatch({ type: "CREATE_USER", payload: res.data.content });
                                        body.representativeId = res.data.content._id
                                        dispatch(RepresentativeActions.add_representatives(body))
                                    })
                                    .catch((error) => {
                                        dispatch({ type: "CREATE_USER_FAILURE", payload: error });
                                    })
                                alert.success("Representative Added!");
                                handleAdd()
                            }
                        }
                    })
                    .catch((error) => {
                        console.log(error, 'error')
                        alert.error(`${error} Check your email or network`);
                        setLoader(false)
                        setIsEditingSelectedData(false)
                    })
            }
            else {
                alert.error("All fields are required!");
                setLoader(false)
                setIsEditingSelectedData(false)
            }
        }

    }


    const deleteRepersentative = () => {
        let body = {
            objectId
        }
        let userDelete = {
            objectId: repUserId
        }
        dispatch(RepresentativeActions.delete_repersentative(body))
        dispatch(UsersActions.delete_user(userDelete))
        alert.success("Representative Deleted!");
        alert.success("User Deleted!");
        handleAdd()
    }

    const designationsHandle = (value) => {

        var data = value;
        var startKey;
        var endKey;
        var manegersName = []

        allDesignations && allDesignations.map(function (item, key) {
            if (item._id === data._id) {
                startKey = 0
                endKey = key
            }
        })

        if (allRepresentatives.length > 0) {
            allRepresentatives.map(function (item, key) {
                for (var i = startKey; i <= endKey; i++) {
                    if (item.designationDataStart === startKey && item.designationDataEnd === i) {
                        manegersName.push(item)
                    }
                }
            })
        }
        else {
            let obj = {
                name: 'Azhar',
                _id: '5f75de6913bbdb3238d21b40',
                role: "admin",
            }
            manegersName.push(obj)
        }
        setManagerName(manegersName);
        setDesignationDataStart(startKey)
        setDesignationDataEnd(endKey)
        setDesignationId(data)
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

    const onChangeProvince = (value) => {
        const arr = [];
        setProvinceId(value)
        for (var i = 0; i < allCities.length; i++) {
            if (allCities[i].provinceId === value) {
                arr.push(allCities[i])
            }
        }
        setCities(arr)
    }

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="javascript:void(0)" onClick={() => { history.push('/dashboard') }}>
                    Home
                </Link>
                <Typography color="textPrimary">Business-Parameters</Typography>
                <Typography color="textPrimary">Representative</Typography>
            </Breadcrumbs>
            <Card className={classes.root}>
                <CardContent>
                    {loader && <CircularProgress color="inherit" />}

                    <FormGridTabs
                        tab={tab}
                        afterRowClick={() => { setTab(0) }}
                        form={
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Employee ID"
                                        placeholder="type"
                                        variant="outlined"
                                        fullWidth
                                        value={identifier}
                                        disabled={isEditingSelectedData}
                                        onChange={(e) => { setIdentifier(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Employee Name"
                                        placeholder="type"
                                        variant="outlined"
                                        fullWidth
                                        value={name}
                                        disabled={isEditingSelectedData}
                                        onChange={(e) => { setName(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Phone"
                                        placeholder="type"
                                        variant="outlined"
                                        type={'number'}
                                        fullWidth
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
                                        value={email}
                                        className={
                                            emailValidate ? classes.inputTexts : classes.errorInput
                                        }
                                        disabled={isEditingSelectedData}
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
                                    {repUserPassword !== "" &&
                                        <div style={{
                                            color: 'red'
                                        }}>
                                            {`Password: ${repUserPassword}`}
                                        </div>
                                    }
                                </Grid>

                                <Grid item sm={4}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend" style={{ marginBottom: "5px" }}>Gender</FormLabel>
                                        <RadioGroup aria-label="gender" name="gender" value={gender} onChange={(event) => { setGender(event.target.value) }}>
                                            <FormControlLabel value="Male" control={<Radio disabled={isEditingSelectedData} color={'primary'} />} label="Male" />
                                            <FormControlLabel value="Female" control={<Radio disabled={isEditingSelectedData} color={'primary'} />} label="Female" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>

                                <Grid item sm={4}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend" style={{ marginBottom: "5px" }}>Work Type</FormLabel>
                                        <RadioGroup aria-label="Work Type" name="Work Type" value={workType}
                                            onChange={(event) => { setWorkType(event.target.value) }}>
                                            <FormControlLabel value="Office" control={<Radio disabled={isEditingSelectedData} color={'primary'} />} label="Office" />
                                            <FormControlLabel value="On Field" control={<Radio disabled={isEditingSelectedData} color={'primary'} />} label="On Field" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>

                                <Grid item sm={4}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend" style={{ marginBottom: "5px" }}>Marital Status</FormLabel>
                                        <RadioGroup aria-label="Marital Status" name="Marital Status" value={maritalStatus} onChange={(event) => { setMaritalStatus(event.target.value) }}>
                                            <FormControlLabel value="Single" control={<Radio disabled={isEditingSelectedData} color={'primary'} />} label="Single" />
                                            <FormControlLabel value="Married" control={<Radio disabled={isEditingSelectedData} color={'primary'} />} label="Married" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Date of Birth"
                                        type="date"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant={'outlined'}
                                        fullWidth
                                        value={moment(`${dateOfBirth}`).format('YYYY-MM-DD')}
                                        onChange={(e) => { setDateOfBirth(e.target.value) }}
                                        disabled={isEditingSelectedData}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                        <InputLabel id="blood-group">Blood Group</InputLabel>
                                        <Select
                                            labelId="blood-group"
                                            label="Blood Group"
                                            fullWidth
                                            value={bloodGroupId}
                                            disabled={isEditingSelectedData}
                                            onChange={(e) => { setBloodGroupId(e.target.value) }}
                                        >
                                            <MenuItem value={'O+'}>O+</MenuItem>
                                            <MenuItem value={'O-'}>O-</MenuItem>
                                            <MenuItem value={'A+'}>A+</MenuItem>
                                            <MenuItem value={'A-'}>A-</MenuItem>
                                            <MenuItem value={'B+'}>B+</MenuItem>
                                            <MenuItem value={'B-'}>B-</MenuItem>
                                            <MenuItem value={'AB+'}>AB+</MenuItem>
                                            <MenuItem value={'AB-'}>AB-</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                        <InputLabel id="Designation">Designation</InputLabel>
                                        <Select
                                            labelId="Designation"
                                            label="Designation"
                                            fullWidth
                                            value={designationId}
                                            disabled={isEditingSelectedData}
                                            onChange={
                                                (e) => designationsHandle(e.target.value)
                                            }

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
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                        <InputLabel id="Manager's Name">Manager's Name</InputLabel>
                                        {managersName &&

                                            <Select
                                                labelId="Manager's Name"
                                                label="Manager's Name"
                                                fullWidth
                                                value={managerId}
                                                disabled={isEditingSelectedData}
                                                onChange={(e) => {
                                                    setManager(e.target.value)
                                                }}
                                            >
                                                {managersName && managersName.map((manager) => {
                                                    return (
                                                        <MenuItem key={manager.representativeId} value={manager.representativeId}>
                                                            {manager.name}
                                                        </MenuItem>
                                                    )
                                                }
                                                )}
                                            </Select>
                                        }
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                        <InputLabel id="Selling Line">Selling Line</InputLabel>
                                        <Select
                                            labelId="Selling Line"
                                            label="Selling Line"
                                            fullWidth
                                            value={sellingLine}
                                            disabled={isEditingSelectedData}
                                            onChange={(e) => { setSellingLine(e.target.value) }}
                                        >
                                            {allCompanies && allCompanies.map((company) => {
                                                return (
                                                    <MenuItem key={company.name} value={company.name}>
                                                        {company.name}
                                                    </MenuItem>
                                                )
                                            }
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                        <InputLabel id="Province">Province</InputLabel>
                                        <Select
                                            labelId="Province"
                                            label="Province"
                                            fullWidth
                                            value={provinceId}
                                            disabled={isEditingSelectedData}
                                            onChange={(e) => { onChangeProvince(e.target.value) }}
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
                                        <InputLabel id="Head Quarter">Head Quarter</InputLabel>
                                        <Select
                                            labelId="Head Quarter"
                                            label="Head Quarter"
                                            fullWidth
                                            value={headquarterId}
                                            disabled={isEditingSelectedData}
                                            onChange={(e) => { setHeadquarterId(e.target.value) }}
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
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                        <InputLabel id="region-id">Region ID</InputLabel>
                                        <Select
                                            labelId="region-id"
                                            label="Region ID"
                                            fullWidth
                                            value={regionId}
                                            disabled={isEditingSelectedData}
                                            multiple
                                            input={<Input
                                                onClick={() => setOpenRegion(!openRegion)} />}
                                            onChange={(e) => {
                                                setRegionId(e.target.value)
                                                setOpenRegion(!openRegion)
                                            }}

                                            open={openRegion}
                                        >
                                            {allRegions && allRegions.map((region) => {
                                                return (
                                                    <MenuItem key={region._id} value={region._id}>
                                                        {region.name}
                                                    </MenuItem>
                                                )
                                            }
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                        <InputLabel id="zone-id">Zone ID</InputLabel>
                                        <Select
                                            labelId="zone-id"
                                            label="Zone ID"
                                            fullWidth
                                            value={zoneId}
                                            disabled={isEditingSelectedData}
                                            multiple
                                            input={<Input
                                                onClick={() => setOpenZone(!openZone)} />}
                                            onChange={(e) => {
                                                setZoneId(e.target.value)
                                                setOpenZone(!openZone)
                                            }}

                                            open={openZone}
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
                                        <InputLabel id="territory-id">Territory ID</InputLabel>
                                        <Select
                                            labelId="territory-id"
                                            label="Territory ID"
                                            fullWidth
                                            value={territoryId}
                                            disabled={isEditingSelectedData}
                                            multiple
                                            input={<Input
                                                onClick={() => setOpenTerritory(!openTerritory)} />}
                                            onChange={(e) => {
                                                setTerritoryId(e.target.value)
                                                setOpenTerritory(!openTerritory)
                                            }}
                                            open={openTerritory}
                                        >
                                            {allTerritories && allTerritories.map((territory) => {
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


                                <Grid item xs={12}>
                                    <ButtonGroup variant="contained" color="secondary" size={'large'}>
                                        {addForm &&
                                            <Button onClick={handleAdd}><AddIcon style={{ marginRight: "2px" }} /> Add</Button>
                                        }
                                        {!selectedData &&
                                            <Button disabled={selectedData} onClick={() => { handleSave() }}><SaveAltIcon style={{ marginRight: "5px" }} /> Save</Button>
                                        }
                                        {isEditingSelectedData && !loader &&
                                            <Button onClick={editData}><EditIcon style={{ marginRight: "5px" }} /> Edit</Button>
                                        }
                                        {isEditingSelectedData && !loader &&
                                            <Button onClick={deleteRepersentative}><DeleteOutlineIcon style={{ marginRight: "5px" }} /> Delete</Button>
                                        }
                                    </ButtonGroup>
                                </Grid>

                            </Grid>
                        }
                        grid={
                            <div>
                                <GridTable
                                    headCells={
                                        [
                                            { id: 'name', label: 'Name' },
                                            { id: 'identifier', label: 'Employee ID' },
                                            { id: 'email', label: 'Email' },
                                            { id: 'phone', label: 'Phone' },

                                        ]
                                    }
                                    rows={allRepresentatives}
                                    onRowClick={(data) => { handleRowClick(data) }}
                                />
                            </div>
                        }
                    />
                </CardContent>
            </Card>
        </>
    )
}

export default Representative