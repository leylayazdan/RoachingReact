import React, { Component, PropTypes } from 'react';
import SelectedFoods from './SelectedFoods';
import FoodSearch from './FoodSearch';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SignUpModal from './components/sign-up-modal';
import Background from '../assets/healthy_food.jpg';
import LoginModal from './components/login-modal';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    };

    this.login = this.login.bind(this);

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


  login() {
    this.setState({loggedIn: true});
  }

  render() {
    if (!this.state.loggedIn) {
      var sectionStyle = {
        height: "900px",
        backgroundSize: "cover",
        flex: 1,
        overflow: "hidden",
        backgroundImage: "url(" + Background + ")"
      };

      var buttonStyles = {
        paddingBottom: '20px',
        textAlign: 'center'
      };

      return (
          <div className='App'>
            <section style={ sectionStyle }>
              <div className='ui text container'>
                <div className="Buttons" style={{marginTop: '40%'}}>
                  <MuiThemeProvider>
                    <div className="SignUpModal" style={buttonStyles}>
                      <SignUpModal
                      loggedIn={this.login}
                      />
                    </div>
                  </MuiThemeProvider>
                  <MuiThemeProvider>
                    <div className="LoginModal" style={buttonStyles}>
                      <LoginModal
                        loggedIn={this.login}
                      />
                  </div>
                  </MuiThemeProvider>
                </div>
              </div>
            </section>
          </div>
      );
    }

    <
  }
}

export default App;
