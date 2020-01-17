import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

const DisplayHashInfo = (props) => {
    const classes = useStyles();
    // const { description, tags, hashStr, timeStamp } = props.hash
    return (
        <List className={classes.root}>
            {props.hashList.map(hashInfo => {
                return (
                    <ListItem alignItems="flex-start">
                        <ListItemText primary={hashInfo.description}
                            secondary={hashInfo.hashStr}
                        >
                        </ListItemText>
                    </ListItem>
                )
            })}
        </List>
        // <div>
        //     {/* {/* <p>File Name: {fileName ? fileName : ''}</p> */}
        //     <p>Description: {description ? description : ''}</p>
        //     <p>Tags: {tags ? tags : ''}</p>
        //     <p>IPFS Hash: {hashStr ? hashStr : ''}</p>
        //     <p>IPFS Timestamp: {timeStamp ? timeStamp : ''}</p>
        //     <br></br>
        // </div>
    )
}

export default DisplayHashInfo;