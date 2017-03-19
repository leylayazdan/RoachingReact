import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import rp from 'request-promise';

class SignUpComponent extends React.Component {

    state = {
        email: "",
        open: false,
        password: "",
        username: "",
        error: "",
        dietaryRestrictions: [],
        allergens: [],
        goal: ""
    };

    checkboxStyles = {
        block: {
            maxWidth: 250,
        },
        checkbox: {
            marginBottom: 16,
        },
    };

    radioButtonStyles = {
        block: {
            maxWidth: 250,
        },
        radioButton: {
            marginBottom: 16,
        },
    };

    onPasswordChange(e) {
        const value = e.target.value;
        this.setState({password: value});
    }

    onEmailChange(e) {
        const value = e.target.value;
        this.setState({email: value})
    }

    onUsernameChange(e) {
        const value = e.target.value;
        this.setState({username: value})
    }

    onGoalChanged(e, value) {
        this.setState({goal: value})
    }

    handleNewDietaryRestriction(e, checked) {
        const value = e.target.value;

        var newRestrictions = checked ?
            [...this.state.dietaryRestrictions, value] :
            this.state.dietaryRestrictions.filter(x => x !== value)
            ;

        this.setState({ dietaryRestrictions: newRestrictions });
    }

    handleNewAllergens(e, checked) {
        const value = e.target.value;

        var newAllergens = checked ?
                [...this.state.allergens, value] :
                this.state.allergens.filter(x => x !== value)
            ;

        this.setState({ allergens: newAllergens });
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSubmit = () => {
        this.props.loggedIn();
        // put endpoint in uri

        /*
        var options = {
            method: 'POST',
            url: 'http://localhost:3001/sign-up',
            body: {
                email: this.state.email,
                username: this.state.username,
                password: this.state.password
            },
            json: true // Automatically stringifies the body to JSON
        };

        var self = this;
        rp(options)
            .then(function (parsedBody) {
                self.setState({open: false});
                console.log('here');


            })
            .catch(function (err) {
                console.log(err);
                self.setState({open: true});
        });

        return fetch(`/sign-up`, {
            method: 'post',
            body: JSON.stringify({
                email: this.state.email,
                username: this.state.username,
                password: this.state.password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (resp) {
                if (resp.status === 200) {
                    return resp.json();
                } else {
                    throw new Error(`HTTP Error ${resp.statusText}`);
                }
            })
            .then(function (data) {
                console.log(data);
            })
            .catch(function (err) {
                console.log(err);
            }); */
    };

    render () {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onTouchTap={this.handleSubmit}
            />,
        ];

        return (
           <div className='SignUpComponent'>
               <RaisedButton
                   buttonStyle={{paddingLeft: '10px', paddingRight: '10px', paddingTop: '10px', paddingBottom: '10px', height: '110%', backgroundColor:'#E7C100', borderRadius: '7px'}}
                   labelStyle={{fontSize:'30px', fontFamily:'Helvetica Neue', textTransform: 'capitalize', fontWeight:'600'}}
                   label='Get Started'
                   onTouchTap={this.handleOpen}
                   primary={true}
                   style={{borderRadius: '7px'}}
               />
               <Dialog
                   contentStyle={{width:'500px'}}
                   title={'Lets get you to Eat Smart!'}
                   titleClassName={'setUpModalTitle'}
                   titleStyle={{fontSize: '24px', fontFamily:'Helvetica Neue'}}
                   actions={actions}
                   autoScrollBodyContent={true}
                   modal={false}
                   open={this.state.open}
               >
               <TextField
                   hintText="youremail@email.com"
                   errorText={this.state.error}
                   floatingLabelText="Enter your email"
                   fullWidth={true}
                   type="text"
                   onChange={this.onEmailChange.bind(this)}
                   value={this.state.email}
               /><br />
               <TextField
                   hintText="Username"
                   floatingLabelText="Create a Username"
                   fullWidth={true}
                   type="text"
                   onChange={this.onUsernameChange.bind(this)}
                   value={this.state.username}
               /><br />
               <TextField
                    hintText="Password"
                    floatingLabelText="Create a Password"
                    fullWidth={true}
                    type="password"
                    onChange={this.onPasswordChange.bind(this)}
                    value={this.state.password}
               />
               <div className="-dietaryRestrictions" style={{fontSize:'18px', marginTop: '20px', marginBottom: '20px'}}>Dietary Restrictions</div>
                   {
                       ['Paleo', 'Pescetarian', 'Vegan', 'Vegetarian'].map(x => <Checkbox
                           key={x}
                           label={x}
                           style={this.checkboxStyles.checkbox}
                           onCheck={this.handleNewDietaryRestriction.bind(this)}
                           value={x}
                       />)
                   }
                   <div className="-allergens" style={{fontSize:'18px', marginTop: '20px', marginBottom: '20px'}}>Allergens</div>
                   {
                       ['Diary', 'Eggs', 'Peanuts', 'Seafood', 'Soy', 'Sulphites', 'Tree Nut', 'Wheat & Gluten'].map(x => <Checkbox
                           key={x}
                           label={x}
                           style={this.checkboxStyles.checkbox}
                           onCheck={this.handleNewAllergens.bind(this)}
                           value={x}
                       />)
                   }
               <div className="-goal" style={{fontSize:'18px', marginTop: '20px', marginBottom: '20px'}}>Goal</div>
               <RadioButtonGroup name="goal" onChange={this.onGoalChanged.bind(this)}>
                   <RadioButton
                       value="Weight Loss"
                       label="Weight Loss"
                       style={this.radioButtonStyles.radioButton}
                   />
                   <RadioButton
                       value="Muscle Gain"
                       label="Muscle Gain"
                       style={this.radioButtonStyles.radioButton}
                   />
               </RadioButtonGroup>
               </Dialog>
           </div>
        );
    }
}

SignUpComponent.displayName = 'SignUpComponent';

var {func} = React.PropTypes;

SignUpComponent.propTypes = {
    loggedIn: func.isRequired
}

module.exports = SignUpComponent;