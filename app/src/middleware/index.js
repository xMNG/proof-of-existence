// import { generateStore } from 'drizzle';
import { generateStore } from "@drizzle/store";
import Web3 from 'web3';
import ProofOfExistence from '../contracts/ProofOfExistence.json';
import drizzleOptions from '../drizzleOptions';

// TODO: experiment with @drizzle-utils getWeb3
// import getWeb3 from "@drizzle-utils";

const contractEventNotifier = store => next => action => {
    console.log('middleware reached! - action >>>', action)

    if (action.event && action.event.event == 'LogCreateContract') {
        // console.log('create contract event caught!')
        const { createdAddr, msgSender } = action.event.returnValues;
        // console.log(">>>>>: msgSender", msgSender)
        // console.log(">>>>>: createdAddr", createdAddr)

        // now dynamically add the contract
        let web3 = new Web3(Web3.givenProvider);
        let contractName = 'ProofOfExistence';
        let web3Contract = new web3.eth.Contract(ProofOfExistence['abi'], createdAddr)
        let contractConfig = { contractName, web3Contract }
        let events = ['LogAddIPFSHash']

        store.dispatch({ type: 'ADD_CONTRACT', contractConfig, events })
        console.log('contract added: dispatched!')
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