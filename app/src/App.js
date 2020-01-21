import { Drizzle, generateStore } from "drizzle";
import { DrizzleContext } from "drizzle-react";
import React from 'react';
// import ProofOfExistence from "./contracts/ProofOfExistence.json";
import PoeFactory from "./contracts/PoeFactory.json";
import DrizzleProvider from "./DrizzleProvider";

// TODO: rename DrizzleProvider Component

const options = {
  contracts: [PoeFactory],
  events: {
    PoeFactory:
      ['LogCreateContract']
  }
};

const contractEventNotifier = store => next => action => {
  console.log('event fired!')
  // if (action.event.event === "LogCreateContract") {
  //   const contract = action.name
  //   const contractEvent = action.event.event
  //   const message = action.event.returnValues.msgSender
  //   const display = `${contract}(${contractEvent}): ${message}`
  //   console.log(">>>>>Event fired!!!: display", display)
  //   // toast.success(display, { position: toast.POSITION.TOP_RIGHT })
  // }
  return next(action)
}

const appMiddlewares = [contractEventNotifier]

const drizzleStore = generateStore(options, appMiddlewares);
const drizzle = new Drizzle(options, drizzleStore);

const App = () => {

  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleProvider></DrizzleProvider>
    </DrizzleContext.Provider>
  );
}

export default App;
