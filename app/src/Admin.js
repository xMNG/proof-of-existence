import Button from '@material-ui/core/Button';
import React from 'react';

const Admin = (props) => {
    const [isPaused, setPause] = React.useState(false);
    const [pausedDataKey, setPausedDataKey] = React.useState('')

    React.useEffect(() => {
        getPauseState();
    }, [])

    // get pause state 
    const getPauseState = async () => {
        const isPaused = await props.drizzle.contracts.PoeFactory.methods.paused().call();
        setPause(isPaused)
        // let pauseDataKey =  props.drizzle.contracts.ProofOfExistence.methods.isPaused.cacheCall()
        // setPausedDataKey(pauseDataKey)
    }

    // pause and unpause
    const togglePause = async () => {
        if (isPaused) {
            await props.drizzle.contracts.PoeFactory.methods.unpause.send({
                from: props.address
            })
        } else {
            await props.drizzle.contracts.PoeFactory.methods.pause().send({
                from: props.address
            })
        }
    }
    // withdraw
    const withdraw = () => {
        props.drizzle.contracts.PoeFactory.methods.withdrawEth.send({ from: props.address })
    }
    // total eth
    // console.log(props.drizzle)
    // console.log(props.drizzleState)
    console.log('paused???', isPaused)
    return (
        <div>
            <Button onClick={() => togglePause()}>{isPaused ? 'Unpause' : 'Pause'}</Button>
            <Button onClick={() => withdraw()}>Withdraw ETH</Button>
            <p>wat</p>
        </div>
    )

}

export default Admin;