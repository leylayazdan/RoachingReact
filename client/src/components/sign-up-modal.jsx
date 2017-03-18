var React = require('react');

class SignUpModal extends React.Component {

    render () {
        return (
            <div className='rc-SignUpModal'><p>{'Hello'}</p></div>
        );
    }
}

SignUpModal.displayName = 'SignUpModal';

SignUpModal.sentences = {

}

SignUpModal.defaultProps = {

};

var {bool} = React.PropTypes;

SignUpModal.propTypes = {
    isSignUp: bool,
};

module.exports = SignUpModal;