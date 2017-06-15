import {expect} from 'chai'
import nock from 'nock'
import {generatePayslips} from '../actions/formActions';

describe("Generate Payslip action", () => {
	
	afterEach(() => {
		nock.cleanAll()
	})
	
	it("should generate payslip action type GENERATE_PAYSLIPS", (done) => {
		nock('http://localhost:3000')
			.post('/api/v1.0/payslips')
			.reply(200, {body: ["response data"]})
			
		const action = generatePayslips("test data");
		
		action.payload.then((payload) => {
			
			expect(action.type).equals('GENERATE_PAYSLIPS');
			expect(payload.config.data).equals('test data');
			expect(payload.config.url).equals('http://localhost:3000/api/v1.0/payslips');
			expect(payload.config.headers).to.deep.include({'Content-Type': 'application/csv'});
			expect(payload.data.body[0]).equals("response data");
			
			done();
		});
	})
});