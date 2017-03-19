import React from 'react';
import FoodItemsCard from './food-items-card';
import Divider from 'material-ui/Divider';

export default class FoodItemsCardList extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {

    var cardListStyle = {

    };

    return (
      <div className="FoodItemsCardList">
        <FoodItemsCard />
        <Divider inset={true} />
        <FoodItemsCard />
        <Divider inset={true} />
        <FoodItemsCard />
        <Divider inset={true} />
        <FoodItemsCard />
        <Divider inset={true} />
        <FoodItemsCard />
        <Divider inset={true} />
      </div>
    );
  }
}

FoodItemsCardList.displayName = 'FoodItemsCardList';

var {func} = React.PropTypes;

FoodItemsCardList.propTypes = {
    loggedIn: func.isRequired
}

module.exports = FoodItemsCardList;
