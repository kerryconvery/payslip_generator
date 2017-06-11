var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');

let should = chai.should();

chai.use(chaiHttp);

describe("Test endpoints", () => {
	
	it("Test valid payslip returned when valid employee csv data supplied", (done) => {
		
		var employee = 'David, Rudd,60050,9%,01 March-31 March';
		
		chai.request(server)
			.post('/payslips')
			.set('content-type', 'application/csv')
			.send(employee)
			.end((err, res) => {
				
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.length.should.be.eql(1);
				
				done();
			});
	});

	it("Test valid payslip returned when valid employee json data supplied", (done) => {
		
		var employee = [{"firstName" : "David", "lastName" : "Rudd", "annualSalary" : 60050, "superRate" : 0.09, "paymentStartDate" : "01 March - 31 March"}];
		
		chai.request(server)
			.post('/payslips')
			.set('content-type', 'application/json')
			.send(JSON.stringify(employee))
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.length.should.be.eql(1);
				
				done();
			});
	});
	
	it("Test 400 error returned with validation error when invalid json data supplied", () => {
		
		var employee = [{"firstName" : "David", }];
		
		chai.request(server)
			.post('/payslips')
			.set('content-type', 'application/json')
			.send(JSON.stringify(employee))
			.end((err, res) => {
				res.should.have.status(400);
				
				done();
			});
	});	
	
	it("Test valid payslip returned when valid employee csv data supplied", (done) => {
		
		var employee = 'David, Rudd,60050,%9,01 March-31 March';
		
		chai.request(server)
			.post('/payslips')
			.set('content-type', 'application/csv')
			.send(employee)
			.end((err, res) => {
				
				res.should.have.status(400);
				
				done();
			});
	});
	
	it("Test valid payslip returned when invalid employee json data supplied", (done) => {
		
		var employee = [{"firstNam" : "David", "lastName" : "Rudd", "annualSalary" : 60050, "superRate" : 0.09, "paymentStartDate" : "01 March - 31 March"}];
		
		chai.request(server)
			.post('/payslips')
			.set('content-type', 'application/json')
			.send(JSON.stringify(employee))
			.end((err, res) => {
				res.should.have.status(400);
				
				done();
			});
	});
});