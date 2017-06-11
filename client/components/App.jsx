import React from 'react';
import Payslip from "./Payslip.jsx";
import Error from "./Error.jsx";
import {connect} from "react-redux";
import {generatePayslips, updateCsvInput} from "../actions/formActions";

@connect((store) => {
	return {
		formState: store.formState,
		payslip: store.payslip,
	};
})
export default class App extends React.Component {
  
  handleSubmit(event) {
	console.log('submitting');
	  
	var csvInput = this.refs.csvInput;

	console.log(csvInput.value);
	
	this.props.dispatch(generatePayslips(csvInput.value))
  }
  
  handleChange(event) {
	  console.log('submitting');
	  
	  this.props.dispatch(updateCsvInput(event.target.value));
  }
  
  componentWillMount() {
  }
  
  render() {
	const {payslip, formState} = this.props;
		
	var If = React.createClass({
		render: function() {
			if (this.props.test) {
				return this.props.children;
			}
			else {
				return false;
			}
		}
	});
	
	return <div>
				<label>CSV Input:
				<textarea ref="csvInput" cols="100" rows="10"/>
				</label>
				<button onClick={this.handleSubmit.bind(this)}>Submit</button>
				<If test={payslip.error != null}>
					<Error errors={payslip.error}/>
				</If>
			</div>
  }
}