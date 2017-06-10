var csvParser = require('./csvParser');
var jsonParser = require('./jsonParser');
var schema = require('./schema');

module.exports = {
	
	parseEmployeeCsvContent: function(req, res, next)
	{
		if (req.headers['content-type'] == 'application/csv')
		{
			if (req.body == '') {
				res.setHeader('Content-Type', 'text/plain');
				res.status(400).send("The request body is blank");			
			}
			else
			{
				csvParser.parse(req.body, csvParser.validateEmployee, csvParser.mapToEmployee, (errors, employees) =>
				{
					if (errors) {
						res.setHeader('Content-Type', 'application/json');
						res.status(400).send(JSON.stringify(errors));
					}
					else {
						req.headers['content-type'] = 'application/json';
						
						req.body = employees;
					
						next();
					}
				});
			}
		}
		else
			next();
	},
	
	parseEmployeeListJsonContent: function(req, res, next)
	{
		if (req.headers['content-type'] == 'application/json')
		{
			var errors = jsonParser.validateEmployeeList(req.body);
				
			if (errors.length > 0) {
				res.setHeader('Content-Type', 'application/json');
				res.status(400).send(JSON.stringify(errors));
			}
			else {
				req.body = jsonParser.mapToEmployeeList(req.body);
				
				next();
			}
		}
		else
			next();
	}
}