const middleware = require('./middleware');
const lib = require('./lib');

module.exports = function(app) {

	app.post("/payslips", [middleware.parseEmployeeListJsonContent, middleware.parseEmployeeCsvContent], function(req, res) {
		
		if(Array.isArray(req.body))
		{		
			const payslips = new Array();
			
			try {
				req.body.forEach((item) => payslips.push(lib.getEmployeePayslip(item)));
				
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