import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class SignUpComponent extends React.Component {

    state = {
        open: false,
    };

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
           <div className='rc-SignUpComponent'>
               <RaisedButton
                   label='Get Started'
                   onTouchTap={this.handleOpen}
               />
               <Dialog
                   title={'Welcome'}
                   actions={actions}
                   modal={true}
                   open={this.state.open}
               >
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