import React, {Component} from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false 
    }
    SideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }
    SideDrawerToogleHandler = () => {
        this.setState((prevState) => {
             return {showSideDrawer: !this.state.showSideDrawer };
        });
    }

    render () {
        return (
            <Auxiliary>
                <Toolbar drawerToggleClicked={this.SideDrawerToogleHandler}/>
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.SideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
}

export default Layout;