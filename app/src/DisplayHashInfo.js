import React from 'react';

const DisplayHashInfo = (props) => {
    console.log(props.hash)
    const { description, tags, hashStr, timeStamp } = props.hash
    return (
        <div>
            {/* {/* <p>File Name: {fileName ? fileName : ''}</p> */}
            <p>Description: {description ? description : ''}</p>
            <p>Tags: {tags ? tags : ''}</p>
            <p>IPFS Hash: {hashStr ? hashStr : ''}</p>
            <p>IPFS Timestamp: {timeStamp ? timeStamp : ''}</p>
            <br></br>
        </div>
    )
}

export default DisplayHashInfo;