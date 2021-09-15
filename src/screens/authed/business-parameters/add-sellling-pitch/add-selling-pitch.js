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
import { useDispatch, useSelector } from 'react-redux'
import * as SellingActions from '../../../../config/Store/Actions/seeling-pitch.actions'
import * as ProductActions from '../../../../config/Store/Actions/products.actions'
import { useAlert } from "react-alert";

const useStyles = makeStyles({
    root: {
    },
});

function AddSellingPitch() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch()
    const allSellingPitchs = useSelector((state) => state.selling.allSellingPitchs);
    const allProducts = useSelector((state) => state.product.allProducts);
    const [tab, setTab] = useState(0);
    const alert = useAlert();
    const [objectId, setobjectId] = useState('')
    const [productId, setProductId] = useState('')
    const [callOpening, setCallOpening] = useState('')
    const [callProbing, setCallProbing] = useState('')
    const [problemSetup, setProblemSetup] = useState('')
    const [keyMessages, setKeyMessages] = useState('')
    const [gainingCommitment, setGainingCommitment] = useState('')
    const [selectedData, setSelectedData] = useState(false)
    const [isEditingSelectedData, setIsEditingSelectedData] = useState(false)
    const [addForm, setAddForm] = useState(false);
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        if (!allProducts) {
            dispatch(ProductActions.get_all_products())
        }
        if (!allSellingPitchs) {
            dispatch(SellingActions.get_all_selling_pitchs())
        }
    }, [allProducts, allSellingPitchs])

    function handleRowClick(data) {
        setTab(1)
        setProductId(data.productId)
        setCallOpening(data.callOpening)
        setCallProbing(data.callProbing)
        setProblemSetup(data.problemSetup)
        setKeyMessages(data.keyMessages)
        setGainingCommitment(data.gainingCommitment)
        setSelectedData(true)
        setobjectId(data._id)
        setIsEditingSelectedData(true)
        setAddForm(true)
    }

    function handleAdd() {
        setProductId('')
        setCallOpening('')
        setCallProbing('')
        setProblemSetup('')
        setKeyMessages('')
        setGainingCommitment('')
        setobjectId('')
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

    function handleSave() {
        const body = {
            productId,
            callOpening,
            callProbing,
            problemSetup,
            keyMessages,
            gainingCommitment,
        }
        if (objectId !== "") {
            body.objectId = objectId;
            body.updatedBy = user._id;
            dispatch(SellingActions.update_selling_pitch(body))
            alert.success("Pitch Updated!");
            handleAdd()
        }
        else {
            body.createdBy = user._id;
            if (productId !== '' && callOpening !== "" && callProbing !== "" && problemSetup !== "" && keyMessages !== "" && gainingCommitment !== "") {
                dispatch(SellingActions.add_selling_pitch(body))
                alert.success("Pitch Added!");
                handleAdd()
            }
            else {
                alert.error("All fields are required!");
            }
        }
    }

    const deleteSellingPitch = () => {
        let body = {
            objectId
        }
        dispatch(SellingActions.delete_selling_pitch(body))
        handleAdd()

    }

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="javascript:void(0)" onClick={() => { history.push('/dashboard') }}>
                    Home
             </Link>
                <Typography color="textPrimary">Business-Parameters</Typography>
                <Typography color="textPrimary">Add-Selling-Pitch</Typography>
            </Breadcrumbs>
            <Card className={classes.root}>
                <CardContent>
                    <FormGridTabs
                        tab={tab}
                        afterRowClick={() => { setTab(0) }}
                        form={

                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Selling Pitch ID"
                                        placeholder="type"
                                        variant="outlined"
                                        disabled
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                        <InputLabel id="Product ID">Product ID</InputLabel>
                                        <Select
                                            labelId="Product ID"
                                            label="Product ID"
                                            fullWidth
                                            onChange={(e) => { setProductId(e.target.value) }}
                                            value={productId}
                                            disabled={isEditingSelectedData}
                                        >
                                            {allProducts && allProducts.map((v, i) => {
                                                return <MenuItem value={v._id}>{v.name}</MenuItem>
                                            })}

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Call Opening"
                                        placeholder="type"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        value={callOpening}
                                        onChange={(e) => { setCallOpening(e.target.value) }}
                                        rows={5}
                                        disabled={isEditingSelectedData}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Call Probing"
                                        placeholder="type"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        value={callProbing}
                                        onChange={(e) => { setCallProbing(e.target.value) }}
                                        rows={5}
                                        disabled={isEditingSelectedData}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Problem Setup"
                                        placeholder="type"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        value={problemSetup}
                                        onChange={(e) => { setProblemSetup(e.target.value) }}
                                        rows={5}
                                        disabled={isEditingSelectedData}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Key Messages"
                                        placeholder="type"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        value={keyMessages}
                                        onChange={(e) => { setKeyMessages(e.target.value) }}
                                        rows={5}
                                        disabled={isEditingSelectedData}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Gaining Commitment"
                                        placeholder="type"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        value={gainingCommitment}
                                        onChange={(e) => { setGainingCommitment(e.target.value) }}
                                        rows={5}
                                        disabled={isEditingSelectedData}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <ButtonGroup variant="contained" color="secondary" size={'large'}>
                                        {addForm &&
                                            <Button onClick={handleAdd}><AddIcon style={{ marginRight: "2px" }} /> Add</Button>
                                        }
                                        {!selectedData &&
                                            <Button disabled={selectedData} onClick={() => { handleSave() }}><SaveAltIcon style={{ marginRight: "5px" }} /> Save</Button>
                                        }
                                        {isEditingSelectedData &&
                                            <Button onClick={editData}><EditIcon style={{ marginRight: "5px" }} /> Edit</Button>
                                        }
                                        {isEditingSelectedData &&
                                            <Button onClick={deleteSellingPitch}><DeleteOutlineIcon style={{ marginRight: "5px" }} /> Delete</Button>
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
                                            { id: 'callOpening', label: 'Call Opening' },
                                        ]
                                    }
                                    rows={
                                        allSellingPitchs
                                    } />
                            </div>
                        }
                    />
                </CardContent>
            </Card>
        </>
    )
}

export default AddSellingPitch