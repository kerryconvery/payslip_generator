const csvParser = require('./csvParser');
const jsonParser = require('./jsonParser');
const schema = require('./schema');
const typeis = require('type-is');

module.exports = {
	
	parseEmployeeCsvContent: function(req, res, next)
	{
		const contentType = req.headers['content-type'];
		
		if (contentType && typeis.is(contentType, ['application/csv']))
		{
			if (req.body == '') {
				res.setHeader('Content-Type', 'text/plain');
				res.status(400).send("There is no data to process");			
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
		const contentType = req.headers['content-type'];
		
		if (contentType && typeis.is(contentType, ['application/json']))
		{
			const errors = jsonParser.validateEmployeeList(req.body);
				
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