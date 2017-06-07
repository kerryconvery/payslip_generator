var chai = require('chai');
var middleware = require('../middleware');

describe('Test csv middleware', () => {

	var Request = function()
	{
		return {
				contentType: '',
				get: function(key) {
						if(key == 'Content-Type') 
							return this.contentType;
						else
							return '';
					 },
				set: function(key, value) {
					  
						if (key == 'Content-Type')
							this.contentType = value;
						
					 },
				body: null
			}
	}
		
	var Connection = function()
	{
		return {
			message: '',
			send: function(value) {this.message = value}
		}
	};
	
	var Response = function()
	{
		return {
			responseStatus: 0,
			connection: new Connection(),
			status: function(value){this.responseStatus = value; return this.connection}
			
		};
	}
	
	it('When the request content type is application/csv', (done) => {
		
		var req = new Request();
		
		req.contentType = 'application/csv';
		req.body = '"David","Rudd",60050,9%,"01 March - 31 March"';
		
		middleware.parseCsvContent(req, new Response(), () => {
			
			chai.expect(req.contentType).equals('application/json');
		
			done();
		});
	});
	
	it('When the request content type is application/csv check body is object', (done) => {
		
		var req = new Request();
		
		req.contentType = 'application/csv';
		req.body = '"David","Rudd",60050,9%,"01 March - 31 March"';
		
		middleware.parseCsvContent(req, new Response(), () => {
			
			chai.expect(Array.isArray(req.body)).equals(true);
			
			done();
		});
				
	});
	
	it('When the request content type is application/csv and body contains errors', (done) => {
		
		var req = new Request();
		
		req.contentType = 'application/csv';
		req.body = '"David","Rudd",60050,%9,"01 March - 31 March"';
		
		var res = new Response();
		
		res.connection.send = function(value) 
		{
			chai.expect(res.responseStatus).equals(400);
		
			done();
		};
		
		middleware.parseCsvContent(req, res, () => {});
	});
	
	it('When the request content type is application/csv and body is blank', () => {
		
		var req = new Request();
		
		req.contentType = 'application/csv';
		req.body = '';
		
		var res = new Response();
		
		res.connection.send = function(value) 
		{
			chai.expect(res.responseStatus).equals(400);
		};
		
		
		middleware.parseCsvContent(req, res, () => {});				
	});
	
	it('When the request content type is not application/csv', (done) => {
		
		var req = new Request();
		
		req.contentType = 'application/json';
		req.body = '{}';
		
		middleware.parseCsvContent(req, new Response(), () => {
			
			chai.expect(req.contentType).equals('application/json');
			
			done();
		});	
	});
});
