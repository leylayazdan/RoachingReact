import React, { Component } from 'react';
import SelectedFoods from './SelectedFoods';
import FoodSearch from './FoodSearch';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SignUpModal from './components/sign-up-modal';

class App extends Component {
  constructor() {
    super();

    injectTapEventPlugin();
  }

  /*
  state = {
    selectedFoods: [],
  }

  removeFoodItem = (itemIndex) => {
    const filteredFoods = this.state.selectedFoods.filter(
      (item, idx) => itemIndex !== idx,
    );
    this.setState({ selectedFoods: filteredFoods });
  }

  addFood = (food) => {
    const newFoods = this.state.selectedFoods.concat(food);
    this.setState({ selectedFoods: newFoods });
  }

  render() {
    const { selectedFoods } = this.state;

    return (
      <div className='App'>
        <div className='ui text container'>
          <MuiThemeProvider><SignUpComponent /></MuiThemeProvider>
          <SelectedFoods
            foods={selectedFoods}
            onFoodClick={this.removeFoodItem}
          />
          <FoodSearch
            onFoodClick={this.addFood}
          />
        </div>
      </div>
    );
  } */

  render() {
    return (
        <div className='App'>
          <div className='ui text container'>
            <MuiThemeProvider>
              <SignUpModal />
            </MuiThemeProvider>
          </div>
        </div>
    );
  }
}

export default App;
