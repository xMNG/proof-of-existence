import React from 'react';

const DisplayData = (props) => {

    return (
        <div>
            <p>what what in </p>
            <p>Owner: {props.storedOwner ? props.storedOwner.value : 'error!'}</p>
            <p>DataCount: {props.dataCount ? props.dataCount.value : 'error!'}</p>
        </div>
    )

}
export default DisplayData;