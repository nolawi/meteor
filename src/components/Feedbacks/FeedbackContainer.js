import React from 'react';
import PropTypes from 'prop-types';

import './FeedbackContainer.scss';


const FeedbackContainer = ({className, ...props}) => (<div className={`feedback-container ${className}`} {...props} />);

FeedbackContainer.propTypes = {
    className: PropTypes.string
};

export default FeedbackContainer;