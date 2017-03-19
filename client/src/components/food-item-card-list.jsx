import React from 'react';
import FoodItemsCard from './food-items-card';
import Divider from 'material-ui/Divider';

export default class FoodItemsCardList extends React.Component {

  render() {

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

module.exports = FoodItemsCardList;
