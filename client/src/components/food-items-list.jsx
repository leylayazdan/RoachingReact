import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';

class FoodItemsComponent extends React.Component {

  state = {
    foodItemsArray: []
  }

  handleOpen = () => {

  };

  render () {

    var listItemStyle = {
      height: "200px",
      width: "100%",
      textAlign: 'center',
      display: 'inline-block',
    };

    return (
      <div classname='FoodItemsComponent'>
        <List>
          <Subheader>Food Items!</Subheader>
          <ListItem
            primaryText={this.state.foodItemsArray}
            leftAvatar={<Avatar src="" />}
            open={this.handleOpen}
            hoverColor="#D5D5D5"
            style={listItemStyle}
          />
          <ListItem
            primaryText=""
            leftAvatar={<Avatar src="" />}
            open={this.handleOpen}
            hoverColor="#D5D5D5"
            style={listItemStyle}
          />
          <ListItem
            primaryText=""
            leftAvatar={<Avatar src="" />}
            open={this.handleOpen}
            hoverColor="#D5D5D5"
            style={listItemStyle}
          />
          <ListItem
            primaryText=""
            leftAvatar={<Avatar src="" />}
            open={this.handleOpen}
            hoverColor="#D5D5D5"
            style={listItemStyle}
          />
          <ListItem
            primaryText=""
            leftAvatar={<Avatar src="" />}
            open={this.handleOpen}
            hoverColor="#D5D5D5"
            style={listItemStyle}
          />
        </List>
      </div>
    )
  }
}

FoodItemsComponent.displayName = 'FoodItemsComponent';

var {func} = React.PropTypes;

FoodItemsComponent.propTypes = {
    loggedIn: func.isRequired
}

module.exports = FoodItemsComponent;
