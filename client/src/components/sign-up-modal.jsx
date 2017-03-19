import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'

class SignUpComponent extends React.Component {

    state = {
        email: "",
        open: false,
        password: "",
        username: ""
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
                disabled={true}
                onTouchTap={this.handleClose}
            />,
        ];

        return (
           <div className='SignUpComponent'>
               <RaisedButton
                   buttonStyle={{paddingLeft: '10px', paddingRight: '10px', paddingTop: '10px', paddingBottom: '10px', height: '110%', backgroundColor:'#A11F45'}}
                   labelStyle={{fontSize:'30px', fontFamily:'Helvetica Neue', textTransform: 'capitalize', fontWeight:'600'}}
                   label='Get Started'
                   onTouchTap={this.handleOpen}
                   primary={true}
               />
               <Dialog
                   title={'Lets get you eating smart!'}
                   titleClassName={'setUpModalTitle'}
                   titleStyle={{fontSize: '24px', fontFamily:'Helvetica Neue'}}
                   actions={actions}
                   modal={true}
                   open={this.state.open}
                   style={{width:'700px', marginLeft:'80px'}}
               >
               <TextField
                   hintText="youremail@email.com"
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

SignUpComponent.sentences = {
    headerTitle: 'Welcome! Lets get you started'
};

module.exports = SignUpComponent;