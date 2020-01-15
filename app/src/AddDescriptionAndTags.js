import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: 200,
        },
        Button: {
            marginRight: theme.spacing(1),
        },
    },
}));

const AddDescriptionAndTags = (props) => {
    const classes = useStyles();

    const handleDescriptionChange = event => {
        event.preventDefault();
        props.setDescription(event.target.value);
    }
    const handleTagChange = event => {
        event.preventDefault();
        props.setTags(event.target.value);
    }

    return (
        <div>

            <p>AddDescriptionAndTags.js</p>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Description" value={props.description} onChange={handleDescriptionChange} fullWidth /><br></br>
                <TextField id="standard-basic" label="Tags" value={props.tags} onChange={handleTagChange} fullWidth />
            </form>

        </div>

    )

}

export default AddDescriptionAndTags;