import {expect} from 'chai'
import nock from 'nock'
import {generatePayslips} from '../actions/formActions';

describe("Action Tests.", () => {
	
	afterEach(() => {
		nock.cleanAll()
	})
	
	it("Check generate payslip action type", (done) => {
		nock('http://localhost:3000')
			.post('/payslips')
			.reply(200, {body: ["response data"]})
			
		const action = generatePayslips("test data");
		
		action.payload.then((payload) => {
			
			expect(action.type).equals('GENERATE_PAYSLIPS');
			expect(payload.config.data).equals('test data');
			expect(payload.config.url).equals('http://localhost:3000/payslips');
			expect(payload.config.headers).to.deep.include({'Content-Type': 'application/csv'});
			expect(payload.data.body[0]).equals("response data");
			
			done();
		});
	})
});