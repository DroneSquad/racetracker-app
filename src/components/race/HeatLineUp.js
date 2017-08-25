import React from 'react';

import {
  AppBar,
} from 'material-ui';

import { historyBackButton } from '../../utils';

/** This will display tabs for each section for tab, they keep their state across tabs */
export default class HeatLineUp extends React.Component {

  render() {
    let title = <span className="ds-blue-text">Heat 0 Lineup</span>;
    return (
      <div className="main">
        <header>
          <AppBar className="ds-white" title={title} iconClassNameLeft="ds-gray-alt-text mdi mdi-close" onLeftIconButtonTouchTap={historyBackButton.bind(this)} iconClassNameRight="ds-gray-alt-text mdi mdi-check" onRightIconButtonTouchTap={historyBackButton.bind(this)}/>
        </header>
        <main>

        </main>
      </div>
    )
  }
}
