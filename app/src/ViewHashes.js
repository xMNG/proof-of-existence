import React from 'react';
import DisplayHashInfo from './DisplayHashInfo';

const ViewHashes = (props) => {
    const [hashList, setHashList] = React.useState([]);

    React.useEffect(() => {
        updateHashList();
    }, [])

    const updateHashList = async () => {
        const dataCount = await props.drizzle.contracts.ProofOfExistence.methods.dataCount().call();

        const tempArr = []
        for (let i = 0; i < dataCount; i++) {
            const result = await props.drizzle.contracts.ProofOfExistence.methods.getData(i).call()
            tempArr.push(result)
        }
        setHashList(tempArr)
    }

    // hacky as shit, but running out of time. To be revisited during truffleU
    if (props.dataCount && hashList.length !== props.dataCount) updateHashList();
    // 
    // TODO: fix this display
    return (
        < div >
            <p>DataCount: {props.dataCount ? props.dataCount.value : 'error!'}</p>
            <DisplayHashInfo hashList={hashList}></DisplayHashInfo>
            {/* {hashList.map((hash, idx) => <DisplayHashInfo key={idx} hash={hash}></DisplayHashInfo>)} */}
            <button onClick={() => updateHashList()}>Update</button>
        </div >
    )
}

export default ViewHashes;
