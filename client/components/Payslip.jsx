import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap'

export default class App extends React.Component {

  render() {
	const {profiles, onProfileClicked} = this.props;
			
	if (!profiles.fetched)
		return null;
	
	const mappedProfiles = profiles.items.map(item => <NavItem key={item.name} onClick={onProfileClicked.bind(this, item)}>{item.name}</NavItem>)
	
	return <Navbar className="navbar navbar-default navbar-fixed-top">
				<Nav bsStyle="pills">{mappedProfiles}</Nav>
			</Navbar>
  }
}