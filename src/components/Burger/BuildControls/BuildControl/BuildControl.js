import React from 'react';

import classes from './BuildControl';

const buildControl = (props) => (
    <div>
        <div classesName={classes.BuildControl}>{props.label}</div>
        <button classesName={classes.Less} >Less</button>
        <button classesName={classes.More} >More</button>
    </div>
);

export default buildControl;