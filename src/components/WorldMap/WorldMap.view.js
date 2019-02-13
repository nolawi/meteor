import React, { PureComponent } from 'react';
import {HTTP_STATUS, MAP_LIMITS} from 'consts';
import { geoMercator, geoPath } from "d3-geo";
import { ErrorMessage, Loading, FeedbackContainer } from 'components/Feedbacks';
import {
    Country,
    Meteor,
    MeteorPopover
} from "./"

import './WorldMap.scss'

export default class extends PureComponent {

    constructor(props){
        super(props);

        const h = window.innerHeight
        const w = window.innerWidth

        this.state = {
            zoom: MAP_LIMITS.ZOOM.MIN,
            height: h,
            width: w,
            translateMap: [w/2, h/2]
        };

        this.handleResize = this.handleResize.bind(this);
        this.handleZoom = this.handleZoom.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.projection = this.projection.bind(this)
    }

    componentDidMount() {
        this.props.fetchData();
        window.addEventListener("resize", this.handleResize);
        window.addEventListener('wheel', this.handleZoom);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
        window.removeEventListener('wheel', this.handleZoom);
    }

    handleResize(){
        this.setState({
                height: window.innerHeight,
                width: window.innerWidth
            });
    }

    // TODO: make map dragable with zooming into a point
    handleMouseMove({offsetX,offsetY}){
        // Update last mouse position only when scroll out
        if(this.state.zoom === MAP_LIMITS.ZOOM.MIN){
            this.setState({
                cursorX: offsetX,
                cursorY: offsetY
            });
        }
    }

    handleZoom({deltaY}){
        const prevState = { ...this.state};
        let zoom = prevState.zoom + (deltaY*10);

        if(zoom > MAP_LIMITS.ZOOM.MAX){
            zoom = MAP_LIMITS.ZOOM.MAX;
        }

        if(zoom <= MAP_LIMITS.ZOOM.MIN){
            zoom = MAP_LIMITS.ZOOM.MIN;
        }


        this.setState({
            zoom
        })
    }

    errorMsg(){
        const { fetchData } = this.props;
        return (
            <ErrorMessage>
                Somethign went wrong. <strong style={{cursor: "pointer"}} onClick={fetchData}>Click here to try again</strong>
            </ErrorMessage>
        )
    }

    // Position countries and meteors
    projection() {
        const { translateMap, zoom, } = this.state;

        return geoMercator()
            .scale(zoom)
            .translate(translateMap)
    }

    render(){
        const {
            countries,
            meteors,
            fetchStatus,
            showPopover
        } = this.props;
        const { height, width, zoom} = this.state;
        const meteorRad = zoom / 200 * 1;
        // Display loading while fetching data from NASA api
        if(fetchStatus === HTTP_STATUS.PENDING){
            return (<Loading />);
        }

        // Display error message in case there is fetch error
        if(fetchStatus === HTTP_STATUS.ERROR){
            return this.errorMsg();
        }

        return (
            <FeedbackContainer className="world-map">
                <svg className="world-map"
                     width={ width }
                     height={ height }
                     viewBox={`0 0 ${width} ${height}`}>
    `
                    <g className="countries">
                        {countries.map((country,i) => (<Country key={ `path-${ i }` }
                                                                d={geoPath().projection(this.projection())(country)}/>))}
                    </g>

                    <g className="markers">
                        {
                            meteors.map(meteor => (<Meteor key={ `meteor-${meteor.id}`}
                                                        r={meteorRad}
                                                        onClick={() => showPopover(<MeteorPopover meteor={meteor} />)}
                                                        cx={ this.projection()(meteor.geolocation.coordinates)[0] }
                                                        cy={ this.projection()(meteor.geolocation.coordinates)[1] }/>
                            ))
                        }
                    </g>

                </svg>
            </FeedbackContainer>
        )
    }
}