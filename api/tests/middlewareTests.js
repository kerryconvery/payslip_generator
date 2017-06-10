var chai = require('chai');
var middleware = require('../middleware');
var check = require("check-types");
var models = require("../models");
var mocks = require("./mocks");
var sinon = require("sinon");
	
describe('Test csv middleware', () => {

	it('When the request content type is application/csv', (done) => {
		
		var req = new mocks.Request();
		
		req.contentType = 'application/csv';
		req.body = '"David","Rudd",60050,9%,"01 March - 31 March"';
		
		middleware.parseEmployeeCsvContent(req, new mocks.Response(), () => {
			
			chai.expect(req.contentType).equals('application/json');
		
			done();
		});
	});
	
	it('When the request content type is application/csv check body is object', (done) => {
		
		var req = new mocks.Request();
		
		req.contentType = 'application/csv';
		req.body = '"David","Rudd",60050,9%,"01 March - 31 March"';
		
		middleware.parseEmployeeCsvContent(req, new mocks.Response(), () => {
			
			chai.expect(Array.isArray(req.body)).equals(true);
			
			done();
		});
				
	});
	
	it('When the request content type is application/csv and body contains errors', (done) => {
		
		var req = new mocks.Request();
		
		req.contentType = 'application/csv';
		req.body = '"David","Rudd",60050,%9,"01 March - 31 March"';
		
		var res = new mocks.Response();
		
		var next = sinon.spy();
		
		res.connection.send = function(value) 
		{
			chai.expect(res.responseStatus).equals(400);
		
			done();
		};
		
		middleware.parseEmployeeCsvContent(req, res, next);
	});
	
	it('When the request content type is application/csv and body is blank', () => {
		
		var req = new mocks.Request();
		
		req.contentType = 'application/csv';
		req.body = '';
		
		var res = new mocks.Response();
		
		var next = sinon.spy();
		
		res.connection.send = function(value) 
		{
			chai.expect(res.responseStatus).equals(400);
		};
		
		middleware.parseEmployeeCsvContent(req, res, next);
		
		chai.expect(next.notCalled).equals(true);
	});
	
	it('When the request content type is not application/csv', (done) => {
		
		var req = new mocks.Request();
		
		req.contentType = 'application/json';
		req.body = '{}';
		
		middleware.parseEmployeeCsvContent(req, new mocks.Response(), () => {
			
			chai.expect(req.contentType).equals('application/json');
			
			done();
		});	
	});
});

describe("Test json to employee model middleware -", () =>
{
	it("valid schema validation", (done) =>
	{
		var req = new mocks.Request();
		
		req.contentType = 'application/json';
		req.body = '{"employees" : [{"firstName" : "David", "lastName" : "Rudd", "annualSalary" : 60050, "superRate" : 0.09, "paymentStartDate" : "01 March - 31 March"}]}';
	
		var res = new mocks.Response(); 
		
		middleware.parseEmployeeListJsonContent(req, res, () => {
						
			chai.expect(Array.isArray(req.body)).equals(true);
			chai.expect(req.body.length).equals(1);
			chai.expect(check.instanceStrict(req.body[0], models.EmployeeModel)).equals(true);	

			done();
		});			
	});
	
	it("invalid schema validation", () =>
	{
		var req = new mocks.Request();
		
		req.contentType = 'application/json';
		req.body = '{"employees" : [{"firstNam" : "David", "lastName" : "Rudd", "annualSalary" : 60050, "superRate" : 0.09, "paymentStartDate" : "01 March - 31 March"}]}';
		
		var res = new mocks.Response(); 
		
		middleware.parseEmployeeListJsonContent(req, res, () => {
		
			chai.expect(res.responseStatus).equals(400);
		});	
	});
	
	it("next is not called when schema validation fails", () => {
		
		var req = new mocks.Request();
		
		req.contentType = 'application/json';
		req.body = '{}';
		
		var next = sinon.spy();
		
		middleware.parseEmployeeListJsonContent(req, new mocks.Response(), next);
		
		chai.expect(next.notCalled).equals(true);
	});
})
