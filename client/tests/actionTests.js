import {expect} from 'chai'
import {generatePayslips} from '../actions/formActions';

describe("Action Tests.", () => {
	
	it("Check generate payslip action type", () => {
		
		let action = generatePayslips("test data");
				
		expect(action.type).equals('GENERATE_PAYSLIPS');
	})
});