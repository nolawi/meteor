import React from 'react';
import PropTypes from 'prop-types';
import FeedbackContainer from './FeedbackContainer';


const ErrorMessage = ({style, ...props}) => (<FeedbackContainer><div style={{color: "red", ...style}} {...props}/></FeedbackContainer>);

ErrorMessage.propTypes = {
    style: PropTypes.object,
    children: PropTypes.any.isRequired,
};

export default ErrorMessage;