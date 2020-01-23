import { generateStore } from "@drizzle/store";
import Web3 from 'web3';
import ProofOfExistence from '../contracts/ProofOfExistence.json';
import drizzleOptions from '../drizzleOptions';

// TODO: experiment with @drizzle-utils getWeb3

const contractEventNotifier = store => next => action => {

    if (action.event && action.event.event == 'LogCreateContract') {
        const { createdAddr, msgSender } = action.event.returnValues;
        // now dynamically add the contract
        let web3 = new Web3(Web3.givenProvider);
        let contractName = 'ProofOfExistence';
        let web3Contract = new web3.eth.Contract(ProofOfExistence['abi'], createdAddr)
        let contractConfig = { contractName, web3Contract }
        let events = ['LogAddIPFSHash']

        store.dispatch({ type: 'ADD_CONTRACT', contractConfig, events })
        console.log('contract added: dispatched!')
        window.toastProvider.addMessage("Personal contract created!", {
            variant: 'success',
            colorTheme: 'light'
        })
    }

    if (action.event && action.event.event == 'LogAddIPFSHash') {
        window.toastProvider.addMessage("Added IPFS Hash!", {
            variant: 'success',
            colorTheme: 'light'
        })
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