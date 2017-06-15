const middleware = require('./middleware');
const lib = require('./lib');

module.exports = function(app) {

	app.post("/api/v1.0/payslips", [middleware.parseEmployeeListJsonContent, middleware.parseEmployeeCsvContent], function(req, res) {
		
		if(Array.isArray(req.body))
		{		
			const payslips = new Array();
			
			try {
				for(let index = 0; index < req.body.length; index++)
					payslips.push(lib.getEmployeePayslip(req.body[index]));
				
				res.setHeader('Content-Type', 'application/json');
				res.send(JSON.stringify(payslips));
			}
			catch(e) {
				console.log(e);
				
				res.setHeader('Content-Type', 'text/plain');
				res.status(500).send("Internal server error");				
			}
		}
		else
		{
			res.setHeader('Content-Type', 'text/plain');
			res.status(400).send("Expected an array of employees");
		}
	});
};