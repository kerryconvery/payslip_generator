import React from 'react';
import PropTypes from 'prop-types'
 
export class If extends React.Component {
	
	static defaultProps = {
		test: null
	};

	static PropTypes = {
		test: PropTypes.bool
	};
	
	render() {
		if (this.props.test) {
			return this.props.children;
		}
		else {
			return false;
		}
	}
}