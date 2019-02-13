import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import {
    POPOVER_STATE_KEY,
    hidePopover
} from './'

import PopoverView from './Popover.view'



const mapStateToProps = state => ({
    ...state[POPOVER_STATE_KEY],
});

const mapDispatchToProps = dispatch => ({
    hidePopover: () => dispatch(hidePopover()),
})

@connect(mapStateToProps, mapDispatchToProps)
export default class Popover extends PureComponent {
 
    render(){
        const { content } = this.props;

        // Temp solution
        if(!content)
            return null;

        return (<PopoverView {...this.props}/>);
    }

}

