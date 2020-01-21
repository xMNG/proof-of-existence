import { generateStore } from 'drizzle';
import ProofOfExistence from '../contracts/ProofOfExistence.json';
import drizzleOptions from '../drizzleOptions';

// TODO: experiment with @drizzle-utils getWeb3
// import getWeb3 from "@drizzle-utils";

const contractEventNotifier = store => next => action => {
    console.log('middleware reached! - action >>>', action)

    if (action.event && action.event.event == 'LogCreateContract') {
        console.log('create contract event caught!')
        const { createdAddr, msgSender } = action.event.returnValues;
        // now dynamically add the contract
        let contractConfig = {
            contractName: 'ProofOfExistence',
            web3Contract: new web3.eth.Contract(ProofOfExistence['abi'], createdAddr)
        }
        const events = ['LogAddIPFSHash']
        store.dispatch({ type: 'ADD_CONTRACT', contractConfig, events })
        console.log('dispatched!')
    }
    return next(action);
};

const appMiddlewares = [contractEventNotifier];

const store = generateStore({
    drizzleOptions,
    appMiddlewares,
    disableReduxDevTools: false, // enable ReduxDevTools!
});

// Use the store with DrizzleProvider
export default store;