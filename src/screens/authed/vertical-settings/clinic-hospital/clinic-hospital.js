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
import { useDispatch, useSelector } from 'react-redux';
import * as TerritoryActions from '../../../../config/Store/Actions/territory.action';
import * as HospitalActions from '../../../../config/Store/Actions/hospital.actions';
import * as BricksActions from '../../../../config/Store/Actions/brick.action';
import { useAlert } from "react-alert";

const useStyles = makeStyles({
    root: {
        // padding: 14
    },
});

function ClinicHospital() {
    const classes = useStyles();
    const history = useHistory();
    const alert = useAlert();
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [territoryId, setTerritoryId] = useState('')
    const [phone, setPhone] = useState('')
    const [abbreviation, setAbbreviation] = useState('')
    const [objectId, setObjectId] = useState('')
    const [selectedData, setSelectedData] = useState(false)
    const [isEditingSelectedData, setIsEditingSelectedData] = useState(false);
    const [addForm, setAddForm] = useState(false);
    const [bricks, setBricks] = useState([]);
    const [brickId, setBrickId] = useState('')
    const [tab, setTab] = useState(0);
    const allTerritory = useSelector((state) => state.territory.allTerritorys);
    const allHospitals = useSelector((state) => state.hospital.allHospitals);
    const user = useSelector((state) => state.user.user);
    const allBricks = useSelector((state) => state.bricks.allBricks);

    useEffect(() => {
        if (!allTerritory) {
            dispatch(TerritoryActions.get_territorys())
        }
        if (!allBricks) {
            dispatch(BricksActions.get_Bricks());
        }
        else {
            setBricks(allBricks)
        }
        if (!allHospitals) {
            dispatch(HospitalActions.get_all_hospitals())
        }
    }, [allHospitals, allTerritory, allBricks])


    function handleAddHospital() {
        setName('')
        setAddress('')
        setPhone('')
        setAbbreviation('')
        setTerritoryId('')
        setObjectId('')
        setBrickId('')
        setBricks([])
        setTab(0)
        setSelectedData(false)
        setIsEditingSelectedData(false)
        setAddForm(false)
    }

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
        setAddress(data.address)
        setPhone(data.phone)
        setAbbreviation(data.abbreviation)
        onChangeTerritory(data.territoryId)
        setBrickId(data.brickId)
        setIsEditingSelectedData(true)
        setAddForm(true)
    }

    function handleSave() {
        if (objectId !== "") {

            const body = {
                name,
                address,
                phone,
                abbreviation,
                territoryId,
                brickId,
                updatedBy: user._id,
                objectId
            }
            dispatch(HospitalActions.update_hospital(body))
            alert.success("Hospital/Clinic Updated!");
            handleAddHospital()
        }
        else {
            const body = {
                name,
                address,
                territoryId,
                phone,
                abbreviation,
                brickId,
                createdBy: user._id
            }
            if (name !== "" && address !== "" && territoryId !== "" && phone !== "" && abbreviation !== "" && brickId !== '') {
                dispatch(HospitalActions.add_hospital(body))
                alert.success('Hospital Added!')
                handleAddHospital()
            }
            else {
                alert.error('All fields are required!')
            }
        }
    }

    const deleteHospital = () => {
        let body = {
            objectId
        }
        dispatch(HospitalActions.delete_hospital(body))
        handleAddHospital()
    }

    const onChangeTerritory = (value) => {
        const arr = [];
        setTerritoryId(value)
        for (var i = 0; i < allBricks.length; i++) {
            if (allBricks[i].territoryId === value) {
                arr.push(allBricks[i])
            }
        }
        setBricks(arr)
    }

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="javascript:void(0)" onClick={() => { history.push('/dashboard') }}>
                    Home
             </Link>
                <Typography color="textPrimary">Vertical-Settings</Typography>
                <Typography color="textPrimary">Clinic-Hospital</Typography>
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
                                        label="ID"
                                        placeholder="type"
                                        variant="outlined"
                                        disabled
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Hospital / Clinic Name"
                                        placeholder="type"
                                        variant="outlined"
                                        value={name}
                                        onChange={(e) => { setName(e.target.value) }}
                                        fullWidth
                                        disabled={isEditingSelectedData}

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Hospital / Clinic Address"
                                        placeholder="type"
                                        variant="outlined"
                                        value={address}
                                        onChange={(e) => { setAddress(e.target.value) }}
                                        multiline
                                        rows={4}
                                        fullWidth
                                        disabled={isEditingSelectedData}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                        <InputLabel id="territoryId">Territory ID</InputLabel>
                                        <Select
                                            labelId="territoryId"
                                            label="Territory ID"
                                            fullWidth
                                            disabled={isEditingSelectedData}

                                            value={territoryId}
                                            onChange={(e) => { onChangeTerritory(e.target.value) }}
                                        >
                                            {allTerritory && allTerritory.map((v, i) => {
                                                return <MenuItem value={v._id}>{v.name}</MenuItem>
                                            })}
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
                                    <TextField
                                        label="Phone"
                                        placeholder="type"
                                        variant="outlined"
                                        type={'number'}
                                        value={phone}
                                        onChange={(e) => { setPhone(e.target.value) }}
                                        fullWidth
                                        disabled={isEditingSelectedData}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Hospital / Clinic Abbreviation"
                                        placeholder="type"
                                        variant="outlined"
                                        value={abbreviation}
                                        onChange={(e) => { setAbbreviation(e.target.value) }}
                                        fullWidth
                                        disabled={isEditingSelectedData}

                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <ButtonGroup variant="contained" color="secondary" size={'large'}>
                                        {addForm &&
                                            <Button onClick={handleAddHospital}><AddIcon style={{ marginRight: "2px" }} /> Add</Button>
                                        }
                                        {!selectedData &&
                                            <Button disabled={selectedData} onClick={() => { handleSave() }}><SaveAltIcon style={{ marginRight: "5px" }} /> Save</Button>
                                        }
                                        {isEditingSelectedData &&
                                            <Button onClick={editData}><EditIcon style={{ marginRight: "5px" }} /> Edit</Button>
                                        }
                                        {isEditingSelectedData &&
                                            <Button onClick={deleteHospital}><DeleteOutlineIcon style={{ marginRight: "5px" }} /> Delete</Button>
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
                                            { id: 'name', label: 'Name' },
                                            { id: 'abbreviation', label: 'Abbreviation' },
                                            { id: 'address', label: 'Address' },

                                        ]
                                    }
                                    rows={allHospitals} />
                            </div>
                        }
                    />
                </CardContent>
            </Card>
        </>
    )
}

export default ClinicHospital