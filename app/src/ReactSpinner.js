import { DrizzleContext } from "drizzle-react";
import React from "react";
import AccountInfo from "./AccountInfo";
import './App.css';
import logo from './logo.svg';


const ReactSpinner = () => (
    <DrizzleContext.Consumer>
        {drizzleContext => {
            const { drizzle, drizzleState, initialized } = drizzleContext;

            if (!initialized) return "Loading...";
            // could display the mock site with connect button
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

export default ReactSpinner;