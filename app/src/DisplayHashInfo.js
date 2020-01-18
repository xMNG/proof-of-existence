import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(Description, Tags, Timestamp, Hash) {
    return { Description, Tags, Timestamp, Hash };
}




const DisplayHashInfo = (props) => {
    const classes = useStyles();
    // const { description, tags, hashStr, timeStamp } = props.hash
    const rows = props.hashList.map(hashInfo => createData(hashInfo.description, hashInfo.tags, hashInfo.timeStamp, hashInfo.hashStr))
    console.log(rows)
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Description</TableCell>
                        <TableCell align="left">Tags</TableCell>
                        <TableCell align="left">Timestamp</TableCell>
                        <TableCell align="left">IPFS Hash</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.name}>
                            <TableCell align="left">{row.Description}</TableCell>
                            <TableCell align="left">{row.Tags}</TableCell>
                            <TableCell align="left">{row.Timestamp}</TableCell>
                            <TableCell align="left"><a href={`https://ipfs.infura.io/ipfs/${row.Hash}`}>
                                {row.Hash}</a></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    )
}

export default DisplayHashInfo;