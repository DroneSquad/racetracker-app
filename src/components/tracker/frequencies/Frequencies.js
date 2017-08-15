import React from 'react';

import {
  AppBar,
  List,
  ListItem,
  Divider,
  IconButton,
  DropDownMenu,
  MenuItem,
} from 'material-ui';

export default class Frequencies extends React.Component {
  render() {
    return (
      <div className="main">
        <header>
          <AppBar title="Video Frequencies" iconElementLeft={<IconButton />}/>
        </header>
        <main>
          <DropDownMenu value={1} onChange={() => {}}>
            <MenuItem value={1} primaryText="Never" />
            <MenuItem value={2} primaryText="Every Night" />
            <MenuItem value={3} primaryText="Weeknights" />
            <MenuItem value={4} primaryText="Weekends" />
            <MenuItem value={5} primaryText="Weekly" />
          </DropDownMenu>
          <DropDownMenu value={1} onChange={() => {}}>
            <MenuItem value={1} primaryText="Never" />
            <MenuItem value={2} primaryText="Every Night" />
            <MenuItem value={3} primaryText="Weeknights" />
            <MenuItem value={4} primaryText="Weekends" />
            <MenuItem value={5} primaryText="Weekly" />
          </DropDownMenu>
          <List>
            <ListItem primaryText="All mail" rightIcon={<span>Text</span>} />
            <Divider />

            <ListItem primaryText="Trash" rightIcon={<span>Text</span>} />
            <Divider />

            <ListItem primaryText="Spam" rightIcon={<span>Text</span>} />
            <Divider />

            <ListItem primaryText="Follow up" rightIcon={<span>Text</span>} />
            <Divider />

          </List>
        </main>
      </div>
    );
  }
}
