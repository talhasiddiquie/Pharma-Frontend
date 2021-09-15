import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Grid from '@material-ui/core/Grid';
import FormGridTabs from '../../../components/Tabs/Form-Grid-Tabs'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { CardMedia } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import GridTable from '../../../components/GridTable/grid-table';
import { useDispatch, useSelector } from 'react-redux';
import * as CompanyActions from '../../../../config/Store/Actions/company.action';
import * as ImageActions from '../../../../config/Store/Actions/imageUpload.action';
import { useAlert } from "react-alert";
import Modal from '../../../components/Modal/Modal';
import ApiServices from '../../../../config/ApiService';

const useStyles = makeStyles({
    root: {
        // padding: 14,
        flexGrow: 1,

    },
    media: {
        maxWidth: 150,
        height: 30,
    }

});


function VerticalGroupCompany() {
    const classes = useStyles();
    const alert = useAlert();
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [abbreviation, setAbbreviation] = useState('')
    const [address, setAddress] = useState('')
    const [contactPerson, setContactPerson] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [contactDetail, setContactDetail] = useState('')
    const [logoImg, setImagePath] = useState('')
    const [imgPreview, setImagePreview] = useState('')
    const [openDialog, setOpenDialog] = useState(false)
    const [objectId, setObjectId] = useState('')
    const [selectedData, setSelectedData] = useState(false)
    const [isEditingSelectedData, setIsEditingSelectedData] = useState(false)
    const [tab, setTab] = useState(0);
    const user = useSelector((state) => state.user.user)
    const allCompanies = useSelector((state) => state.company.allCompanies)
    const image = useSelector((state) => state.image.image)
    const history = useHistory();
    const [refresh, setRefresh] = useState(false);
    const [update, setUpdate] = useState(false);
    const [addForm, setAddForm] = useState(false);
    const [showMulterImage, setShowMulterImage] = useState(false)

    useEffect(() => {
        if (!allCompanies) {
            dispatch(CompanyActions.get_companies())
        }
        if (!refresh) {
            if (image) {
                dispatch(ImageActions.upload_image())
            }
        }
        else {
            setImagePath(image)
        }
    }, [allCompanies, image])

    function handleRowClick(data) {
        setTab(1)
        setSelectedData(true)
        setObjectId(data._id)
        setName(data.name)
        setAbbreviation(data.abbreviation)
        setAddress(data.address)
        setContactPerson(data.contactPerson)
        setContactNumber(data.contactNumber)
        setContactDetail(data.contactDetail)
        setImagePath(data.logoImg)
        setIsEditingSelectedData(true)
        setAddForm(true)
        setShowMulterImage(true)
    }

    const handleImageChange = async (e) => {
        e.isDefaultPrevented();
        const fileUpload = e.target.files[0];
        var data = await new FormData()
        data.append('file', fileUpload);
        setShowMulterImage(false)
        setImagePath('')
        setImagePreview('')
        dispatch(ImageActions.upload_image(data))
        setRefresh(true)
        dispatch(ImageActions.upload_image())
    }

    const handleImage = (img) => {
        setOpenDialog(true)
        setImagePreview(img)
    }

    function handleSave() {
        if (objectId !== "") {
            const body = {
                name,
                abbreviation,
                address,
                contactPerson,
                contactNumber,
                contactDetail,
                logoImg,
                objectId,
                updatedBy: user._id
            }
            dispatch(CompanyActions.update_company(body))
            alert.success("Company Updated!");
            addCompany()
            dispatch(ImageActions.upload_image())
        }
        else {
            if (name !== "" && abbreviation !== "" && address !== "" && contactPerson !== "" && contactNumber !== "" &&
                contactDetail !== "" && image !== null) {
                let obj = {
                    name,
                    abbreviation,
                    address,
                    contactPerson,
                    contactNumber,
                    contactDetail,
                    logoImg,
                    createdBy: user._id
                }
                dispatch(CompanyActions.add_company(obj))
                alert.success("Company Added!");
                addCompany()
                dispatch(ImageActions.upload_image())
            }
            else {
                alert.error("All Fields are required!");
            }
        }
    }

    const editData = () => {
        setIsEditingSelectedData(false)
        setSelectedData(false)
        setAddForm(true)
    }

    const addCompany = () => {
        setName('')
        setAbbreviation('')
        setAddress('')
        setContactPerson('')
        setContactNumber('')
        setContactDetail('')
        setImagePath('')
        setImagePreview('')
        setObjectId('')
        setTab(0)
        setSelectedData(false)
        setIsEditingSelectedData(false)
        setAddForm(false)
    };

    const deleteCompany = () => {
        let body = {
            objectId
        }
        dispatch(CompanyActions.delete_company(body))
        addCompany()
        dispatch(CompanyActions.get_companies())
    }

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="javascript:void(0)" onClick={() => { history.push('/dashboard') }}>
                    Home
                 </Link>
                <Typography color="textPrimary">Vertical-Settings</Typography>
                <Typography color="textPrimary">Vertical-Group-Company</Typography>
            </Breadcrumbs>
            <Modal
                open={openDialog}
                imgPreview={imgPreview}
                close={() => { setOpenDialog(false) }}
            />
            <Card className={classes.root}>
                <CardContent>
                    <FormGridTabs
                        afterRowClick={() => { setTab(0) }}
                        tab={tab}
                        form={
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Company ID"
                                        placeholder="type"
                                        variant="outlined"
                                        disabled
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="name"
                                        label="Company Name"
                                        placeholder="Company Name"
                                        variant="outlined"
                                        fullWidth
                                        value={name}
                                        disabled={isEditingSelectedData}
                                        onChange={(e) => { setName(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Company Abbreviation"
                                        name='abbreviation'
                                        placeholder="Abbreviation"
                                        variant="outlined"
                                        fullWidth
                                        value={abbreviation}
                                        disabled={isEditingSelectedData}
                                        onChange={(e) => { setAbbreviation(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} class="form-group files color">
                                    <input
                                        accept="image/*"
                                        type="file"
                                        class="form-control"
                                        style={{
                                            display: "none"
                                        }}
                                        id={'upload-logo-company'}
                                        onChange={(e) => { handleImageChange(e) }}
                                        disabled={isEditingSelectedData}
                                    />
                                    <label htmlFor="upload-logo-company">
                                        <Button disabled={isEditingSelectedData} color="default" size="large" variant="outlined" component="span">
                                            <PhotoCamera style={{ marginRight: "5px" }} /> Upload Logo
                                        </Button>
                                    </label>
                                </Grid>
                                <Grid item xs={12} sm={6}>

                                    {showMulterImage ?
                                        <Card className={classes.media}>
                                            <CardActionArea
                                                disabled={isEditingSelectedData}>
                                                {logoImg &&
                                                    <CardMedia
                                                        onClick={() => { handleImage(logoImg) }}
                                                        component="img"
                                                        alt="Company Logo"
                                                        src={ApiServices.getBaseUrl() + `/uploads/${logoImg}`}
                                                        title="Company Logo"
                                                    />
                                                }
                                            </CardActionArea>
                                        </Card>
                                        :
                                        <Card className={classes.media}>
                                            <CardActionArea
                                                disabled={isEditingSelectedData}
                                            >
                                                {logoImg &&
                                                    <CardMedia
                                                        onClick={() => { handleImage(logoImg) }}
                                                        component="img"
                                                        alt="Company Logo"
                                                        src={ApiServices.getBaseUrl() +  `/uploads/${logoImg}`}
                                                        title="Company Logo"
                                                    />
                                                }
                                            </CardActionArea>
                                        </Card>
                                    }
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Company Address"
                                        placeholder="Address"
                                        variant="outlined"
                                        name='address'
                                        multiline
                                        rows={3}
                                        fullWidth
                                        value={address}
                                        onChange={(e) => { setAddress(e.target.value) }}
                                        disabled={isEditingSelectedData}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name='contactPerson'
                                        label="Contact Person"
                                        placeholder="Contact Person"
                                        variant="outlined"
                                        fullWidth
                                        value={contactPerson}
                                        onChange={(e) => { setContactPerson(e.target.value) }}
                                        disabled={isEditingSelectedData}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name='contactNumber'
                                        label="Contact No"
                                        placeholder="Contact No"
                                        variant="outlined"
                                        type={"number"}
                                        fullWidth
                                        value={contactNumber}
                                        onChange={(e) => { setContactNumber(e.target.value) }}
                                        disabled={isEditingSelectedData}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        name='contactDetail'
                                        label="Contact Detail"
                                        placeholder="Contact Detail"
                                        variant="outlined"
                                        multiline
                                        rows={3}
                                        fullWidth
                                        value={contactDetail}
                                        onChange={(e) => { setContactDetail(e.target.value) }}
                                        disabled={isEditingSelectedData}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <ButtonGroup variant="contained" color="secondary" size={'large'}>
                                        {addForm &&
                                            < Button onClick={addCompany}><AddIcon style={{ marginRight: "2px" }} /> Add</Button>
                                        }
                                        {!selectedData && <Button disabled={selectedData}
                                            onClick={() => { handleSave() }}>
                                            <SaveAltIcon style={{ marginRight: "5px" }} />
                                            Save</Button>
                                        }
                                        {isEditingSelectedData &&
                                            <Button onClick={editData}><EditIcon style={{ marginRight: "5px" }} /> Edit</Button>
                                        }
                                        {isEditingSelectedData &&
                                            <Button onClick={deleteCompany}><DeleteOutlineIcon style={{ marginRight: "5px" }} /> Delete</Button>
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
                                            { id: 'contactDetail', label: 'Contact Detail' },
                                            { id: 'contactNumber', label: 'Contact Number' },
                                            { id: 'logoImg', label: 'Company Logo' },
                                        ]
                                    }
                                    rows={allCompanies}
                                />
                            </div>
                        }
                    />
                </CardContent>
            </Card >
        </>
    )
}
export default VerticalGroupCompany