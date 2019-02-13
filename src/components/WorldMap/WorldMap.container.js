import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import {
    WORLD_MAP_STATE_KEY,
    fetchData,
    getFetchStatus
} from './'

import { showPopover } from "components/Popover";

import WorldMapView from './WorldMap.view'



const mapStateToProps = state => ({
    ...state[WORLD_MAP_STATE_KEY],
});

const mapDispatchToProps = dispatch => ({
    fetchData: () => dispatch(fetchData()),
    showPopover: content => dispatch(showPopover(content))
})

@connect(mapStateToProps, mapDispatchToProps)
export default class WorldMap extends PureComponent {

    render(){
        return (<WorldMapView {...this.props}/>);
    }

}