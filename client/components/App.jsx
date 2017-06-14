import React from 'react';
import Payslip from "./Payslip.jsx";
import Error from "./Error.jsx";
import {connect} from "react-redux";
import {generatePayslips} from "../actions/formActions";
import {If} from "./utilityComponents.jsx"

@connect((store) => {
	return {
		payslip: store.payslip,
	};
})
export default class App extends React.Component {
  
  handleSubmit(event) {
	  
	const csvInput = this.refs.csvInput;

	this.props.dispatch(generatePayslips(csvInput.value.trim()))
  }
   
  componentWillMount() {
  }
  
  render() {
	const {payslip} = this.props;
	
	return <div>
				<div>CSV Input:</div>
				<textarea ref="csvInput" cols="100" rows="10"/>
				<br/>
				<button onClick={this.handleSubmit.bind(this)}>Submit</button>
				<If test={payslip.error != null}>
					<Error errors={payslip.error}/>
				</If>
				<If test={payslip.items.length > 0}>
					<Payslip payslips={payslip.items}/>
				</If>
			</div>
  }
}