import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import WorldMap from 'components/WorldMap'
import Popover from 'components/Popover'

export default class App extends Component {
    render () {
        const { store } = this.props
        return (
            <Provider store={store}>
                <React.Fragment>
                    <WorldMap/>
                    <Popover />
                </React.Fragment>
            </Provider>
        )
    }
}

App.propTypes = {
    store: PropTypes.any.isRequired,
};
