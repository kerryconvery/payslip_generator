import React from 'react';
import PropTypes from 'prop-types'

export default class Payslip extends React.Component {

	static defaultProps = {
		payslips: []
	};

	static PropTypes = {
		payslips: PropTypes.array
	};
	
  render() {
	const {payslips} = this.props;
			
	var headerStyle = {textAlign:"left"};
	
	var mappedItems = payslips.map((item, index) => 
		<tr key={index}>
			<td>{item.name}</td>
			<td>{item.payPeriod}</td>
			<td>{item.grossIncome}</td>
			<td>{item.incomeTax}</td>
			<td>{item.netIncome}</td>
			<td>{item.superContribution}</td>
		</tr>);
	
	return <div>
		<h3>Payslips:</h3>
		<table style={{width:"100%"}}>
			<thead>
				<tr>
					<th style={headerStyle}>Name</th>
					<th style={headerStyle}>Pay Period</th>
					<th style={headerStyle}>Gross Income</th>
					<th style={headerStyle}>Income Tax</th>
					<th style={headerStyle}>Net Income</th>
					<th style={headerStyle}>Super Contribution</th>
				</tr>
			</thead>
			<tbody>
				{mappedItems}
			</tbody>
		</table>
		</div>
  }
}