import React from 'react';
import Authentication from './authentication.js';
import Scheduler from './scheduler.js';
import './App.css';

import GetReports from "./getReports";

import Login from './login';

export default function App() {

  return (
    <>

      {/* <Login /> */}
      <Authentication />
      <Scheduler />

      <div className="container-fluid">
        <GetReports />
      </div>
    </>
  )

}

