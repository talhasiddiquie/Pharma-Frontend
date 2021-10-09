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
import * as ProductActions from '../../../../config/Store/Actions/products.actions'
import * as CompanyActions from '../../../../config/Store/Actions/company.action';
import * as AttachmentAction from '../../../../config/Store/Actions/attachmentsUpload.action';
import { useAlert } from "react-alert";
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios';
import ApiService from '../../../../config/ApiService';
import CircularProgress from '@material-ui/core/CircularProgress';
import VisibilityIcon from '@material-ui/icons/Visibility';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import PDFIMAGE from '../../../../assets/images/pdf.png';
import DOCSIMAGE from '../../../../assets/images/docx.jpg';
import GIFIMAGE from '../../../../assets/images/gif.png';
import JPGIMAGE from '../../../../assets/images/jpg.png';
import PNGIMAGE from '../../../../assets/images/png.png';
import CSVIMAGE from '../../../../assets/images/csv.jpg';
import MP3IMAGE from '../../../../assets/images/mp3.png';
import MP4IMAGE from '../../../../assets/images/mp4.png';
import TEXTIMAGE from '../../../../assets/images/text.png';
import WEBMIMAGE from '../../../../assets/images/webm.png';
import WEBPIMAGE from '../../../../assets/images/webp.png';
import XLSXIMAGE from '../../../../assets/images/xlsx.png';
import ZIPIMAGE from '../../../../assets/images/zip.png';
import Modal from '../../../components/Modal/Modal';

const Dragger = Upload.Dragger;

const useStyles = makeStyles({
    root: {
    },
    media: {
        maxWidth: 150,
        height: 30,
    },
    dragger: {
        padding: '2% 0%'
    },
    filenames: {
        padding: '0.5% 0%'
    },
    imageThumbnail: {
        width: "70px",
        height: "70px"
    }
});

function Product() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user);
    const allProducts = useSelector((state) => state.product.allProducts);
    const allCompanies = useSelector((state) => state.company.allCompanies);
    const attachment = useSelector((state) => state.attachment.attachmentsFiles)
    const [tab, setTab] = useState(0);
    const alert = useAlert();
    const [name, setName] = useState('')
    const [abbreviation, setAbbreviation] = useState('')
    const [molecule, setMolecule] = useState('')
    const [sellingLine, setSellingLine] = useState('')
    const [approvedIndication, setApprovedIndication] = useState('')
    const [mrp, setMrp] = useState('')
    const [tp, setTp] = useState('')
    const [sellingMessages, setSellingMessages] = useState('')
    const [additionalInfo, setAdditionalInfo] = useState('')
    const [discount, setDiscount] = useState(null)
    const [company, setCompany] = useState('')
    const [addForm, setAddForm] = useState(false);
    const [selectedData, setSelectedData] = useState(false)
    const [isEditingSelectedData, setIsEditingSelectedData] = useState(false)
    const [objectId, setobjectId] = useState('')
    const [fileList, setFileList] = useState([])
    const [files, setFiles] = useState([])
    const [refersh, setRefresh] = useState(false)
    const [loader, setLoader] = useState(false);
    const [previewFile, setPreviewFile] = useState('')
    const [openDialog, setOpenDialog] = useState(false)

    useEffect(() => {
        if (!allCompanies) {
            dispatch(CompanyActions.get_companies())
        }
        if (!allProducts) {
            dispatch(ProductActions.get_all_products())
        }
        if (!refersh) {
            if (attachment) {
                dispatch(AttachmentAction.upload_attachment())
            }
        }

    }, [allProducts, allCompanies])

    function handleRowClick(data) {
        setTab(1)
        setName(data.name)
        setAbbreviation(data.abbreviation)
        setMolecule(data.molecule)
        setSellingLine(data.sellingLine)
        setApprovedIndication(data.approvedIndication)
        setMrp(data.mrp)
        setTp(data.tp)
        setCompany(data.company)
        setSellingMessages(data.sellingMessages)
        setAdditionalInfo(data.additionalInfo)
        setDiscount(data.discount)
        setSelectedData(true)
        setobjectId(data._id)
        setFiles(data.files)
        setIsEditingSelectedData(true)
        setAddForm(true)
    }

    function handleAdd() {
        setName('')
        setAbbreviation('')
        setMolecule('')
        setSellingLine('')
        setApprovedIndication('')
        setMrp('')
        setTp('')
        setSellingMessages('')
        setAdditionalInfo('')
        setDiscount('')
        setobjectId('')
        setCompany('')
        setFileList([])
        setFiles([])
        setTab(0)
        setSelectedData(false)
        setIsEditingSelectedData(false)
        setAddForm(false)
        setLoader(false)

    }

    const editData = () => {
        setIsEditingSelectedData(false)
        setSelectedData(false)
        setAddForm(true)
    }

    const handleSave = async () => {
        setLoader(true)
        setIsEditingSelectedData(true)
        const arr = []
        await Promise.all(fileList.map(async (val, i) => {
            var data = new FormData()
            data.append('file', val.originFileObj);
            await axios.post(ApiService.getBaseUrl() + '/attachmnets/uploadAttachments', data, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then((res) => {
                arr.push(res.data.content)
                dispatch({ type: "UPLOAD_ATTACHMENT", payload: res.data });
            }).catch((error) => {
                dispatch({ type: "UPLOAD_ATTACHMENT_FAILURE", payload: error });
            })
        })).then((results) => {

        })

        const body = {
            name,
            abbreviation,
            molecule,
            sellingLine,
            approvedIndication,
            mrp,
            tp,
            sellingMessages,
            additionalInfo,
            discount,
            company
        }
        if (objectId !== "") {
            body.objectId = objectId;
            body.updatedBy = user._id;
            body.files = [...files, ...arr]
            dispatch(ProductActions.update_product(body))
            alert.success("Product Updated!");
            handleAdd()
        }
        else {
            body.createdBy = user._id;
            if (name !== '' && abbreviation !== "" && molecule !== "" && sellingLine !== "" && approvedIndication !== "" && mrp !== "" &&
                tp !== "" && sellingMessages !== "" && additionalInfo !== "" && arr.length !== 0
            ) {
                body.files = arr;
                dispatch(ProductActions.add_product(body))
                alert.success("Product Added!");
                handleAdd()
            }
            else {
                alert.error("All fields are required!");
                setLoader(false)
                setIsEditingSelectedData(false)
            }
        }
    }

    const deleteProduct = () => {
        let body = {
            objectId
        }
        dispatch(ProductActions.delete_product(body));
        handleAdd()
    }

    const props = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                setFileList(info.fileList)
                setRefresh(true)
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const handleChanged = (file, index) => {
        setPreviewFile(file)
        setOpenDialog(true)
    }

    const handleChangeDelete = (file, index) => {
        var filesDataChanged = []
        for (var keys in files) {
            var data = files[keys];
            if (data._id !== file._id) {
                filesDataChanged.push(data)
            }
        }
        setFiles(filesDataChanged)
    }


    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="javascript:void(0)" onClick={() => { history.push('/dashboard') }}>
                    Home
             </Link>
                <Typography color="textPrimary">Business-Parameters</Typography>
                <Typography color="textPrimary">Product</Typography>
            </Breadcrumbs>
            <Modal
                open={openDialog}
                previewFile={previewFile}
                close={() => { setOpenDialog(false) }}
            />
            <Card className={classes.root}>
                <CardContent>
                    {loader && <CircularProgress color="inherit" />}
                    <FormGridTabs
                        tab={tab}
                        afterRowClick={() => { setTab(0) }}
                        form={

                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Product ID"
                                        placeholder="type"
                                        variant="outlined"
                                        disabled
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Product Name"
                                        placeholder="type"
                                        variant="outlined"
                                        fullWidth
                                        disabled={isEditingSelectedData}
                                        value={name}
                                        onChange={(e) => { setName(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Product Abbreviation"
                                        placeholder="type"
                                        variant="outlined"
                                        fullWidth
                                        value={abbreviation}
                                        disabled={isEditingSelectedData}
                                        onChange={(e) => { setAbbreviation(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Molecule"
                                        placeholder="type"
                                        variant="outlined"
                                        fullWidth
                                        value={molecule}
                                        disabled={isEditingSelectedData}
                                        onChange={(e) => { setMolecule(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Company"
                                        placeholder="type"
                                        variant="outlined"
                                        fullWidth
                                        value={company}
                                        disabled={isEditingSelectedData}
                                        onChange={(e) => { setCompany(e.target.value) }}
                                    />

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
                                                    <MenuItem key={company._id} value={company._id}>
                                                        {company.name}
                                                    </MenuItem>
                                                )
                                            }
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Approved Indication"
                                        placeholder="type"
                                        variant="outlined"
                                        fullWidth
                                        disabled={isEditingSelectedData}
                                        value={approvedIndication}
                                        onChange={(e) => { setApprovedIndication(e.target.value) }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="MRP"
                                        placeholder="type"
                                        variant="outlined"
                                        fullWidth
                                        type={"number"}
                                        disabled={isEditingSelectedData}
                                        value={mrp}
                                        onChange={(e) => { setMrp(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="TP"
                                        placeholder="type"
                                        variant="outlined"
                                        fullWidth
                                        type={"number"}
                                        disabled={isEditingSelectedData}
                                        value={tp}
                                        onChange={(e) => { setTp(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Scheme / Discount"
                                        placeholder="type"
                                        variant="outlined"
                                        fullWidth
                                        disabled={isEditingSelectedData}
                                        value={discount}
                                        onChange={(e) => { setDiscount(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Key Selling Messages"
                                        placeholder="type"
                                        variant="outlined"
                                        fullWidth
                                        disabled={isEditingSelectedData}
                                        value={sellingMessages}
                                        onChange={(e) => { setSellingMessages(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Additional Info"
                                        placeholder="type"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        disabled={isEditingSelectedData}
                                        value={additionalInfo}
                                        onChange={(e) => { setAdditionalInfo(e.target.value) }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12}

                                >
                                    <div className={classes.dragger}>
                                        <Dragger {...props}
                                            disabled={isEditingSelectedData}
                                        >
                                            <p className="ant-upload-drag-icon" >
                                                <InboxOutlined />
                                            </p>

                                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                            <p className="ant-upload-hint">
                                                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                                                band files
                                        </p>
                                        </Dragger>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <div style={{
                                        display: "flex",
                                    }}>
                                        {files && files.length > 0 && files.map((elem, key) => {
                                            var fileTypes = elem.fileName.substring(elem.fileName.lastIndexOf('.'), elem.fileName.length);
                                            var fileName = elem.fileName.substring(elem.fileName.indexOf('f'), elem.fileName.lastIndexOf('-'));
                                            return (
                                                <Grid item xs={12} sm={2}
                                                >
                                                    <Button
                                                        disabled={isEditingSelectedData}
                                                        onClick={() => { handleChangeDelete(elem, key) }}
                                                    >
                                                        <RemoveCircleOutlineIcon />
                                                    </Button>
                                                    <Button
                                                        disabled={isEditingSelectedData}
                                                        onClick={() => { handleChanged(elem, key) }}
                                                    >
                                                        <VisibilityIcon />
                                                    </Button>
                                                    <div style={{
                                                        display: "table-caption",
                                                        alignItems: "center",
                                                        justifyContent: "space-between",
                                                        marginRight: '10px',
                                                        marginLeft: '10px',
                                                    }}>
                                                        <div>
                                                            {fileName}
                                                        </div>
                                                        <div>
                                                            {fileTypes}
                                                        </div>
                                                        <div className={classes.filenames}>
                                                            {fileTypes === '.pdf' ? <img src={PDFIMAGE} alt='img' className={classes.imageThumbnail} />
                                                                :
                                                                fileTypes === '.docx' ? <img src={DOCSIMAGE} alt='img' className={classes.imageThumbnail} />
                                                                    :
                                                                    fileTypes === '.gif' ? <img src={GIFIMAGE} alt='img' className={classes.imageThumbnail} />
                                                                        :
                                                                        fileTypes === '.jpg' ? <img src={JPGIMAGE} alt='img' className={classes.imageThumbnail} />
                                                                            :
                                                                            fileTypes === '.png' ? <img src={PNGIMAGE} alt='img' className={classes.imageThumbnail} />
                                                                                :
                                                                                fileTypes === '.csv' ? <img src={CSVIMAGE} alt='img' className={classes.imageThumbnail} />
                                                                                    :
                                                                                    fileTypes === '.mp3' ? <img src={MP3IMAGE} alt='img' className={classes.imageThumbnail} />
                                                                                        :
                                                                                        fileTypes === '.mp4' ? <img src={MP4IMAGE} alt='img' className={classes.imageThumbnail} />
                                                                                            :
                                                                                            fileTypes === '.txt' ? <img src={TEXTIMAGE} alt='img' className={classes.imageThumbnail} />
                                                                                                :
                                                                                                fileTypes === '.webm' ? <img src={WEBMIMAGE} alt='img' className={classes.imageThumbnail} />
                                                                                                    :
                                                                                                    fileTypes === '.webp' ? <img src={WEBPIMAGE} alt='img' className={classes.imageThumbnail} />
                                                                                                        :
                                                                                                        fileTypes === '.xlsx' ? <img src={XLSXIMAGE} alt='img' className={classes.imageThumbnail} />
                                                                                                            :
                                                                                                            fileTypes === '.zip' ? <img src={ZIPIMAGE} alt='img' className={classes.imageThumbnail} />
                                                                                                                :
                                                                                                                null
                                                            }
                                                        </div>
                                                    </div>
                                                </Grid>
                                            )
                                        })}
                                    </div>
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
                                            <Button onClick={deleteProduct}><DeleteOutlineIcon style={{ marginRight: "5px" }} /> Delete</Button>
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
                                            { id: 'company', label: 'Company' },
                                            { id: 'molecule', label: 'Molecule' },
                                            { id: 'files', label: 'Files' },
                                        ]
                                    }
                                    rows={
                                        allProducts
                                    } />
                            </div>
                        }
                    />
                </CardContent>
            </Card>
        </>
    )
}

export default Product