import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import React from 'react';
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
