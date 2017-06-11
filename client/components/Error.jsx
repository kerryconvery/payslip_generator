import React from 'react';

export default class Error extends React.Component {

  render() {
	const {errors} = this.props;
			
	console.log(errors);
	
	var mappedErrors ='';
	
	if (Array.isArray(errors))
		mappedErrors = errors.map(item => <p key={item}>{item}</p>);
	else
		mappedErrors = <p>{errors}</p>
	
	return <div> {mappedErrors}	</div>;
  }
}