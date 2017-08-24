import React from 'react';

import {
  AppBar,
  Tabs,
  Tab,
} from 'material-ui';

import RaceHeats from './RaceHeats';

import './race.css';

/** This will display tabs for each section for tab, they keep their state across tabs */
export default class Race extends React.Component {

  render() {
    return (
      <div className="race">
        <header>
          <AppBar title="Race"/>
        </header>
        <main>
          <Tabs>
            <Tab label="Racing" >

            </Tab>
            <Tab label="Heats" >
              <RaceHeats/>
            </Tab>
            <Tab label="Leaders">

            </Tab>
          </Tabs>
        </main>
      </div>
    )
  }
}
