import { generateStore } from 'drizzle';
import drizzleOptions from '../drizzleOptions';

const contractEventNotifier = store => next => action => {
    console.log('middleware reached!')
    console.log('action>>>', action)

    if (action.event && action.event.event == 'LogCreateContract') {
        console.log('create contract event caught!')
    }
    // // BLOCK_RECEIVED;
    // if (action.type === 'CONTRACT_SYNCED') {
    //     console.log('contract synced!')
    // }
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