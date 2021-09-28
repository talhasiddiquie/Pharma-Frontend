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
import * as Actions from '../../../../config/Store/Actions/brick.action';
import { useAlert } from "react-alert";
import * as BricksActions from '../../../../config/Store/Actions/brick.action';
import * as TerritoryActions from '../../../../config/Store/Actions/territory.action';
import * as RegionActions from '../../../../config/Store/Actions/region.action';
import * as ZoneActions from '../../../../config/Store/Actions/zone.action';

const useStyles = makeStyles({
    root: {
    },
});

function Brick(props) {
    const classes = useStyles();
    const history = useHistory();
    const alert = useAlert();
    const [brickType, setBrickType] = useState('')
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [abbreviation, setAbbreviation] = useState('');
    const [regionId, setRegionId] = useState('');
    const [zone, setZones] = useState([]);
    const [zoneId, setZoneId] = useState('');
    const [territory, setTerritory] = useState([]);
    const [territoryId, setTerritoryId] = useState('');
    const [objectId, setObjectId] = useState('');
    const [selectedData, setSelectedData] = useState(false)
    const [isEditingSelectedData, setIsEditingSelectedData] = useState(false)
    const [addForm, setAddForm] = useState(false);
    const [tab, setTab] = useState(0);
    const user = useSelector((state) => state.user.user);
    const allRegions = useSelector((state) => state.region.allRegions);
    const allZones = useSelector((state) => state.zone.allZones);
    const allTerritories = useSelector((state) => state.territory.allTerritorys);
    const allBricks = useSelector((state) => state.bricks.allBricks);

    useEffect(() => {

        if (!allRegions) {
            dispatch(RegionActions.get_regions())
        }
        if (!allZones) {
            dispatch(ZoneActions.get_zones())
        }
        else {
            setZones(allZones)
        }
        if (!allTerritories) {
            dispatch(TerritoryActions.get_territorys())
        }
        else {
            setTerritory(allTerritories)
        }
        if (!allBricks) {
            dispatch(BricksActions.get_Bricks())
        }

    }, [allRegions, allZones, allTerritories, allBricks])

    const onChangeRegion = (value) => {
        const arr = [];
        setRegionId(value)
        for (var i = 0; i < allZones.length; i++) {
            if (allZones[i].regionId === value) {
                arr.push(allZones[i])
            }
        }
        setZones(arr)
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

    const addBrick = () => {
        setName('')
        setAbbreviation('')
        setRegionId('')
        setZoneId('')
        setZones([])
        setObjectId('')
        setTerritoryId('')
        setTerritory([])
        setBrickType('')
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
        setName(data.name)
        setAbbreviation(data.abbreviation)
        setRegionId(data.regionId)
        setZoneId(data.zoneId)
        setTerritoryId(data.territoryId)
        setBrickType(data.brickType)
        setObjectId(data._id)
        setIsEditingSelectedData(true)
        setAddForm(true)
        onChangeRegion(data.regionId)
        onChangeZone(data.zoneId)
    }

    function handleSave() {

        if (objectId !== "") {
            const body = {
                name,
                abbreviation,
                regionId,
                zoneId,
                brickType,
                territoryId,
                updatedBy: user._id,
                objectId
            }
            dispatch(Actions.update_brick(body))
            alert.success("Brick Updated!");
            addBrick()

        }
        else {
            if (
                name !== "" &&
                regionId !== "" &&
                territoryId !== "" &&
                zoneId !== "" &&
                brickType !== ""
            ) {
                let obj = {
                    name,
                    abbreviation,
                    regionId,
                    territoryId,
                    zoneId,
                    brickType,
                    createdBy: user._id
                }
                dispatch(Actions.add_brick(obj))
                alert.success("Brick Added!");
                addBrick()
            }
            else {
                alert.error("All fields are required!");
            }
        }

    }

    const deleteBrick = () => {
        let body = {
            objectId
        }
        dispatch(BricksActions.delete_brick(body))
        addBrick()
    }

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="javascript:void(0)" onClick={() => { history.push('/dashboard') }}>
                    Home
             </Link>
                <Typography color="textPrimary">Vertical-Settings</Typography>
                <Typography color="textPrimary">Brick</Typography>
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
                                        label="Brick ID"
                                        placeholder="type"
                                        variant="outlined"
                                        disabled
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                        <InputLabel id="regionId">Region ID</InputLabel>
                                        <Select
                                            labelId="regionId"
                                            label="Region ID"
                                            fullWidth
                                            name='regionId'
                                            value={regionId}
                                            disabled={isEditingSelectedData}

                                            onChange={(e) => { onChangeRegion(e.target.value) }}
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
                                            {zone && zone.map((zone) => {
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

                                            onChange={(e) => {
                                                setTerritoryId(e.target.value)
                                            }}
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
                                    <TextField
                                        label="Brick Name"
                                        placeholder="type"
                                        variant="outlined"
                                        fullWidth
                                        name='name'
                                        value={name}
                                        disabled={isEditingSelectedData}

                                        onChange={(e) => { setName(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Brick Abbreviation"
                                        placeholder="type"
                                        variant="outlined"
                                        fullWidth
                                        name='abbreviation'
                                        value={abbreviation}
                                        disabled={isEditingSelectedData}

                                        onChange={(e) => { setAbbreviation(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend" style={{ marginBottom: "5px" }}>Brick Type</FormLabel>
                                        <RadioGroup aria-label="brick-type" name="brickType" value={brickType}
                                            onChange={(event) => { setBrickType(event.target.value) }}
                                        >
                                            <FormControlLabel value="Ims Brick" control={<Radio disabled={isEditingSelectedData} color={'primary'} />} label="IMS Brick" />
                                            <FormControlLabel value="Distributor Brick" control={<Radio disabled={isEditingSelectedData} color={'primary'} />} label="Distributor Brick" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <ButtonGroup variant="contained" color="secondary" size={'large'}>
                                        {addForm &&
                                            <Button onClick={addBrick}><AddIcon style={{ marginRight: "2px" }} /> Add</Button>
                                        }
                                        {!selectedData &&
                                            <Button disabled={selectedData} onClick={() => { handleSave() }}><SaveAltIcon style={{ marginRight: "5px" }} /> Save</Button>
                                        }
                                        {isEditingSelectedData &&
                                            <Button onClick={editData}><EditIcon style={{ marginRight: "5px" }} /> Edit</Button>
                                        }
                                        {isEditingSelectedData &&
                                            <Button onClick={deleteBrick}><DeleteOutlineIcon style={{ marginRight: "5px" }} /> Delete</Button>
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
                                            { id: 'brickType', label: 'Brick Type' },
                                        ]
                                    }
                                    rows={allBricks} />
                            </div>
                        }
                    />
                </CardContent>
            </Card>
        </>
    )
}

export default Brick