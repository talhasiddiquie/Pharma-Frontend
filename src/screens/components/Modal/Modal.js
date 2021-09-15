import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { CardMedia } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import ApiServices from '../../../config/ApiService';
import FileViewer from 'react-file-viewer';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,

    },
    media: {
        maxWidth: "100%",
        height: "100%",
    },
    contentStyle: {
        height: '160px',
        color: '#000',
        textAlign: 'center',
    }
});

export default function Modal(props) {
    const classes = useStyles();
    const [imgPreview, setImgPreview] = useState('');
    const [filePreview, setfilePreview] = useState('');
    const [fileTypes, setFileType] = useState('')

    useEffect(() => {
        if (props.open) {
            if (props.imgPreview) {
                setImgPreview(props.imgPreview)
            }
            else if (props.previewFile) {
                setfilePreview(props.previewFile)
                var fileTypes = props.previewFile.fileName.substring(props.previewFile.fileName.lastIndexOf('.') + 1, props.previewFile.fileName.length);
                setFileType(fileTypes)
            }
        }
    })

    function handleClose() {
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
                            {imgPreview !== "" &&
                                <Typography variant="h6">
                                    Image Preview
                            </Typography>
                            }
                            {filePreview &&
                                <Typography variant="h6">
                                    Files Preview
                            </Typography>
                            }
                        </Toolbar>
                    </AppBar>
                </DialogTitle>
                <DialogContent>
                    <div className={'eventDialogContent'}>
                        <Grid item xs={12} sm={12}>
                            {imgPreview &&
                                <Card className={classes.media}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="Company Logo"
                                            src={ApiServices.getBaseUrl() + `/uploads/${imgPreview}`}
                                            title="Company Logo"
                                        />
                                    </CardActionArea>
                                </Card>
                            }
                            <div>
                                {filePreview !== "" &&
                                    fileTypes === 'gif' || fileTypes === 'jpg' || fileTypes === 'png' || fileTypes === 'webp' ?
                                    <Card className={classes.media}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                alt="Product Image"
                                                src={ApiServices.getBaseUrl() + `/uploads/${filePreview.fileName}`}
                                                title="Product Image"
                                            />
                                        </CardActionArea>
                                    </Card>
                                    :
                                    filePreview !== "" ?
                                        <FileViewer
                                            fileType={filePreview.fileName.substring(filePreview.fileName.lastIndexOf('.') + 1, filePreview.fileName.length)}
                                            filePath={ApiServices.getBaseUrl() + `/uploads/${filePreview.fileName}`}
                                        />
                                        : null
                                }
                            </div>
                        </Grid>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { handleClose() }} color="red">
                        Cancel
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}