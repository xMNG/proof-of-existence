import { generateStore } from 'drizzle';
import drizzleOptions from '../drizzleOptions';

const contractEventNotifier = store => next => action => {
    console.log('middleware reached!')

    // BLOCK_RECEIVED;
    if (action.type === 'CONTRACT_SYNCED') {
        console.log('contract synced!')
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