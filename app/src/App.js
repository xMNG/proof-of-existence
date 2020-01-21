// import { Drizzle, generateStore } from "drizzle";
import { Drizzle } from "drizzle";
import { DrizzleContext } from "drizzle-react";
import React from 'react';
// import ProofOfExistence from "./contracts/ProofOfExistence.json";
// import PoeFactory from "./contracts/PoeFactory.json";
import DrizzleConsumerContainer from "./DrizzleConsumerContainer";
import options from './drizzleOptions';
import store from './middleware';


// TODO: rename DrizzleProvider Component

//TODO: break out options and contractEventNotifier into separate files
// const options = {
//   web3: {
//     block: false
//   },
//   contracts: [PoeFactory],
//   events: {
//     PoeFactory:
//       ['LogCreateContract']
//   },
//   polls: {}
// };

// const contractEventNotifier = store => next => action => {
//   console.log('event notifier fired!')
//   // if (action.event.event === "LogCreateContract") {
//   //   const contract = action.name
//   //   const contractEvent = action.event.event
//   //   const message = action.event.returnValues.msgSender
//   //   const display = `${contract}(${contractEvent}): ${message}`
//   //   console.log(">>>>>Event fired!!!: display", display)
//   //   // toast.success(display, { position: toast.POSITION.TOP_RIGHT })
//   // }
//   return next(action)
// }

// const appMiddlewares = [contractEventNotifier]
// const drizzleStore = generateStore({ options, appMiddlewares, disableReduxDevTools: false });
const drizzle = new Drizzle(options, store);

const App = () => {

  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleConsumerContainer></DrizzleConsumerContainer>
    </DrizzleContext.Provider>
  );
}

export default App;
