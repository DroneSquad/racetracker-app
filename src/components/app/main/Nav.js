import React from 'react';
import _ from 'lodash';

import Paper from 'material-ui/Paper';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import FontIcon from 'material-ui/FontIcon';

/** The routes to display at the bottom of the view */
const ROUTES = [
  {
    path: '/',
    name: 'Home',
    iconClasses: 'mdi mdi-home'
  },
  // { // todo enable when its created
  //   path: '/discover',
  //   name: 'Discover',
  //   iconClasses: 'mdi mdi-calendar'
  // },
  {
    path: '/race',
    name: 'Race',
    iconClasses: 'mdi mdi-flag-checkered'
  },
  {
    path: '/chat',
    name: 'Chat',
    iconClasses: 'mdi mdi-message-text-outline'
  },
];

/** The logic for the nav bar */
export default class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onHistory = this.onHistory.bind(this);
    this.routeIndex = [];
    let currentPageIndex = 0;
    this.NavItems = _.map(ROUTES, (nav, id) => {
      this.routeIndex.push(nav.path); // create an array to map locations to the nav index
      nav.id = id;
      if (window.location.href.indexOf(nav.path) > 0) { // set the current index when first loading to the page
        currentPageIndex = id;
      }
      return <BottomNavigationItem key={id} label={nav.name} icon={<FontIcon className={nav.iconClasses} />} onTouchTap={() => this.onClick(nav)}/>
    });
    this.state = {index: currentPageIndex};
  }

  componentWillMount() {
    this.unlisten = this.props.history.listen(this.onHistory); // docs says to call the function returned to unlisten
  }

  componentWillUnmount() {
    this.unlisten();
  }

  /** Listen to the history and update the index of the nav bar state */
  onHistory(event) {
    console.log('history');
    if (event.pathname === '/404') { // if on 404 page set selected to nothing
      this.setState(state => state.index = -1);
    } else {
      this.routeIndex.forEach((path, id) => {
        let index = event.pathname.indexOf(path);
        if (index > -1) { // find which page we are on and update the nav button selected
          this.setState(state => state.index = id);
        }
      });
    }
  }

  /** When the nav item is clicked update the route */
  onClick(nav) {
    this.props.history.push(nav.path);
  }

  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.index}>
          {this.NavItems}
        </BottomNavigation>
      </Paper>
    )
  }
}
