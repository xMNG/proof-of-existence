import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';


const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
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


const UploadFile = () => {
    const classes = useStyles();
    const [IPFSFile, setIPFSFile] = React.useState(null);

    const onDrop = useCallback(
        (acceptedFiles) => {
            console.log('>>>', acceptedFiles[0])
            setIPFSFile(acceptedFiles[0])
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

    function IPFSUpload() {
        console.log(IPFSFile);
    }

    return (
        <Container maxWidth='md'>
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
            <Button color="primary" variant="outlined" onClick={() => IPFSUpload()}>Upload to IPFS</Button>
        </Container>
    )
}

export default UploadFile;