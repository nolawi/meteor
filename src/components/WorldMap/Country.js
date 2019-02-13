import React from 'react';
import PropTypes from 'prop-types';

const Country = ({d, className, fill, stroke, strokeWidth,  ...props}) => (
    <path className={`country ${className}`}
          d={ d }
          fill={fill || "#000"}
          stroke={stroke || "#FFF"}
          strokeWidth={strokeWidth || 1 }
          {...props}/>);


Country.propTypes = {
    d: PropTypes.any.isRequired,
    className: PropTypes.string,
    fill: PropTypes.string,
    stroke: PropTypes.string,
    strokeWidth: PropTypes.string
};

export default Country;