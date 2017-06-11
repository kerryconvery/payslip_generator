import React from 'react';

export default class Error extends React.Component {

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