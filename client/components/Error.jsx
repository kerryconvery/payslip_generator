import React from 'react';
import PropTypes from 'prop-types'

export default class Error extends React.Component {
	
	static defaultProps = {
		errors: []
	};

	static PropTypes = {
		errors: PropTypes.array
	};
	
  render() {
	const {errors} = this.props;
	
	var mappedErrors ='';
	
	if (Array.isArray(errors))
		mappedErrors = errors.map((item, index) => <li key={index}>{item}</li>);
	else
		mappedErrors = <li>{errors}</li>
	
	return <div><p>The following error occurred:</p><ul>{mappedErrors}</ul></div>;
  }
}