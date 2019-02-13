import React from 'react';
import PropTypes from 'prop-types';

const Meteor = ({cx, cy, className, r, fill, ...props}) => (
    <circle className={`meteor ${className}`}
            r={ r || 1 }
            cy={cy}
            cx={cx}
            fill={fill || "#E91E63"}
            {...props}/>);


Meteor.propTypes = {
    cx: PropTypes.number.isRequired,
    cy: PropTypes.number.isRequired,
    className: PropTypes.string,
    fill: PropTypes.string,
    r: PropTypes.number,
    onClick: PropTypes.func,
};

export default Meteor;