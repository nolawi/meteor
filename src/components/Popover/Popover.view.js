import React from 'react';
import { FeedbackContainer } from 'components/Feedbacks';

import './Popover.scss';

export default ({className, content, hidePopover }) => (<FeedbackContainer onClick={hidePopover}><div className={`popover ${className}`} children={content} onClick={hidePopover}/></FeedbackContainer>);