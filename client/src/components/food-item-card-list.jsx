import React from 'react';
import FoodItemsCard from './food-items-card';

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
        <FoodItemsCard />
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
