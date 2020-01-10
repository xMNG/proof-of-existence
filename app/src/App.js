import { Drizzle, generateStore } from "drizzle";
import { DrizzleContext } from "drizzle-react";
import React from 'react';
import ProofOfExistence from "./contracts/ProofOfExistence.json";
import WrapperComponent from './WrapperComponent.js';


const options = { contracts: [ProofOfExistence] };
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

const App = () => {

  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <WrapperComponent></WrapperComponent>
    </DrizzleContext.Provider>
  );
}

export default App;
