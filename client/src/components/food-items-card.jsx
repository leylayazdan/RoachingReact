import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Background from '../../assets/healthy_food.jpg';

export default class FoodItemsCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  };

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleExpand = () => {
    this.setState({expanded: true});
      return fetch('/foodItemData', {
          method: 'GET'
      }).then(function (resp) {
          if (resp.status === 200) {
              return resp.json();
          } else {
              throw new Error(`HTTP Error ${resp.statusText}`);
          }
      }).then(function (data) {

          console.log(data);
      }).catch(function (err) {
          console.log(err);
      });
  };

  handleReduce = () => {
    this.setState({expanded: false});
  };



  render() {

    var sectionStyle = {
      height: "200px",
      flex: 1,
      overflow: "hidden",
      backgroundImage: "url(" + Background + ")"
    };

    var cardHeaderStyle = {
      height: "40px"
    };

    var nutritionTextStyle = {
      height: "70px"
    };

    return (
      <div className="CardList">
        <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
          <CardHeader style={cardHeaderStyle}
            title="Mixed Vegetables and Fruit"
            subtitle="For those willing to lose weight"
            avatar={Background}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText>
          </CardText>
          <CardMedia
            expandable={true}
            overlay={<CardTitle title="Available at..." subtitle="Save-on-Foods" />}
          >
            <section style={sectionStyle}>
            </section>
          </CardMedia>
          <CardTitle title="Nutritional Information" expandable={true} />
          <CardText expandable={true} style={nutritionTextStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          <CardActions>
            <FlatButton label="Expand" onTouchTap={this.handleExpand} />
            <FlatButton label="Reduce" onTouchTap={this.handleReduce} />
          </CardActions>
        </Card>
      </div>

    );
  }
}

FoodItemsCard.displayName = 'FoodItemsCard';

module.exports = FoodItemsCard;
