import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ipfsClient from "ipfs-http-client";
import React, { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';



const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    margin: '0 0 20px 0',
    borderWidth: 5,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

const buttonStyle = {
    margin: '10px, 0, 0, 0'
}

const useStyles = makeStyles(theme => ({
    Button: {
        marginRight: theme.spacing(1),
        marginTop: '20px'
    },
}));


const UploadFile = () => {
    const classes = useStyles();
    const [IPFSFile, setIPFSFile] = React.useState(null);

    const onDrop = useCallback(
        (acceptedFiles) => {
            setIPFSFile(acceptedFiles)
        },
        [],
    )

    const { getRootProps, getInputProps, isDragActive, isDragAccept,
        isDragReject } = useDropzone({
            onDrop,
            multiple: false,
        });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject
    ]);

    const ipfs = ipfsClient({
        host: 'ipfs.infura.io',
        port: '5001',
        protocol: 'https',
    });

    async function IPFSUpload() {
        // TODO: get this hooked up to IPFS and return hash

        if (IPFSFile) {
            // convert to buffer
            // const fileReader = new FileReader();
            // fileReader.readAsArrayBuffer(IPFSFile[0]);
            // const fileArrayBuffer = fileReader.result;
            let fileBuffer = await Buffer.from(IPFSFile);
            console.log(">>>>>: IPFSUpload -> fileBuffer", fileBuffer, typeof fileBuffer)
            // send to infura
            const results = await ipfs.add(fileBuffer.buffer);
            const IPFSHashStr = results[0].hash;
            console.log(
                '>>>>>: IPFS -> fileReader.onload -> IPFSHashStr',
                IPFSHashStr,
                typeof IPFSHashStr
            );
        }
    }

    return (
        <Container maxWidth='md'>
            <Grid container direction='column' alignContent='space-between'>
                <div {...getRootProps({ style })}>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select files</p>
                    }
                </div>
                <span>IPFS File Name: {IPFSFile ? IPFSFile.name : ''}</span>
                <Button className={classes.Button} disabled={IPFSFile == null} color="primary" variant="outlined" onClick={() => IPFSUpload()}>Upload to IPFS</Button>
            </Grid>
        </Container>
    )
}

export default UploadFile;