import { DrizzleContext } from "drizzle-react";
import React from "react";
import AccountInfo from "./AccountInfo";
import './App.css';
import logo from './logo.svg';


const DrizzleProvider = () => (
    <DrizzleContext.Consumer>
        {drizzleContext => {
            const { drizzle, drizzleState, initialized } = drizzleContext;

            // wait to be initialized
            if (!initialized) return "Loading...";

            return (
                <React.Fragment>
                    <div className="App">
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo" />
                        </header>

                    </div>
                    <AccountInfo drizzle={drizzle} drizzleState={drizzleState} />
                </React.Fragment>
            )
        }}
    </DrizzleContext.Consumer>
)

export default DrizzleProvider;