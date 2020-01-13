import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';


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

function IPFSUpload() {

}

const UploadFile = (props) => {
    const classes = useStyles();
    return (
        <Container maxWidth='md'>
            <input
                accept="*"
                className={classes.input}
                id="outlined-button-file"
                multiple
                type="file"
            />
            <label htmlFor="outlined-button-file">
                Select file For IPFS Upload<spam>  </spam>
                <Button variant="outlined" component="span">
                    Upload
                </Button>
            </label>
            <div>
                <Button onClick={() => props.setIPFSHash('unwerked')}>setIPFSHash!</Button>
            </div>
        </Container>
    )
}

export default UploadFile;