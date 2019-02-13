import React from 'react';

export default ({meteor}) => (
    <React.Fragment>
        <h1>{meteor.name}</h1>
        <ul>
            <li>Mass: {meteor.mass}</li>
            <li>Year: {meteor.year}</li>
        </ul>
        <p>Click anywhere to hide</p>
    </React.Fragment>
);

