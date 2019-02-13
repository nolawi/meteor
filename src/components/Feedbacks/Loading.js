import React from 'react';
import FeedbackContainer from './FeedbackContainer';

import './Loading.scss';

export default ({...props}) => (<FeedbackContainer><div className="loader" {...props}/></FeedbackContainer>);