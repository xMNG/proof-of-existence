// import { Drizzle, generateStore } from "drizzle";
import { Drizzle } from "drizzle";
import { DrizzleContext } from "drizzle-react";
import React from 'react';
// import ProofOfExistence from "./contracts/ProofOfExistence.json";
// import PoeFactory from "./contracts/PoeFactory.json";
import DrizzleConsumerContainer from "./DrizzleConsumerContainer";
import options from './drizzleOptions';
import store from './middleware';


const drizzle = new Drizzle(options, store);

const App = () => {

  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleConsumerContainer></DrizzleConsumerContainer>
    </DrizzleContext.Provider>
  );
}

export default App;
