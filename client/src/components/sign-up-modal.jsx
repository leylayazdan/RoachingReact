import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import rp from 'request-promise';

class SignUpComponent extends React.Component {

    state = {
        email: "",
        open: false,
        password: "",
        username: "",
        error: ""
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

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSubmit = () => {
        //this.props.loggedIn();
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
        });*/

        return fetch(`http://localhost:3001/sign-up`, {
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
            });
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
                   modal={true}
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