import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React from 'react';

// TODO: modify this to cacheCall with a private state var using a getter func
// TODO: hook this up to redux to get toasts

const style = {
    button: {
        color: 'white',
        borderColor: 'white',
        height: '60%',
        marginRight: '10px'
    }
}

const Admin = (props) => {
    const [isPaused, setPause] = React.useState(false);
    // const [pausedDataKey, setPausedDataKey] = React.useState('')

    React.useEffect(() => {
        getPauseState();
    }, [])

    // get pause state 
    const getPauseState = async () => {
        const isPaused = await props.drizzle.contracts.PoeFactory.methods.paused().call();
        setPause(isPaused)

        // TODO: get cacheCall working with a private state variable with the getter
        // let pauseDataKey = props.drizzle.contracts.PoeFactory.methods.paused.cacheCall()
        // console.log(">>>>>: getPauseState -> pauseDataKey", pauseDataKey)
        // setPausedDataKey(pauseDataKey)
    }

    // pause and unpause
    const togglePause = async () => {
        if (isPaused) {
            await props.drizzle.contracts.PoeFactory.methods.unpause().send({
                from: props.address
            })
            setPause(false) // TODO: switch this to check store from cacheCall
        } else {
            await props.drizzle.contracts.PoeFactory.methods.pause().send({
                from: props.address
            })
            setPause(true) // TODO: switch this to check store from cacheCall
        }
    }
    // withdraw
    const withdraw = () => {
        props.drizzle.contracts.PoeFactory.methods.withdrawEth().send({ from: props.address })
    }

    return (
        <div>
            <Grid container alignContent='center' style={{ height: '100%' }}>
                <Button variant='outlined' style={style.button} onClick={() => togglePause()}>{isPaused ? 'Unpause' : 'Pause'}</Button>
                <Button variant='outlined' style={style.button} onClick={() => withdraw()}>Withdraw ETH</Button>
            </Grid>
        </div>
    )

}

export default Admin;