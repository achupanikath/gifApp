import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class NavBar extends React.Component {
	constructor(){
		super();

		this.state = {
      open: false//the label that decides the action
    };
  }

    handleToggle = () => this.setState({ open: !this.state.open });
    //this method forcefully sets the state's value to false
    handleClose = () => this.setState({ open: false });
    // this is the method which return the html block of this component

    render() {
    
    return (
      // the jsx elemnts has to wrap inside one element
        
        <div>
          <AppBar title="GIF-APP.COM"
            onLeftIconButtonClick={this.handleToggle}
          />
          <Drawer docked={false}
            width={400}
            open={this.state.open}
            onRequestChange={(open) => this.setState({ open })}>
            <br/>
            <MenuItem  onClick={this.handleClose}>{<Link to='/home' >Home</Link>}</MenuItem><br/>
            <MenuItem  onClick={this.handleClose}>{<Link to='/favorites' >Favorites</Link>}</MenuItem>
          </Drawer>
        </div>
    );
  }
}
