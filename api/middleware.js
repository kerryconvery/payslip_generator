var csvParser = require('./csvParser');
var jsonParser = require('./jsonParser');
var schema = require('./schema');

module.exports = {
	
	parseEmployeeCsvContent: function(req, res, next)
	{
		if (req.get('Content-Type') == 'application/csv')
		{
			if (req.body == '')
			{
				res.status(400).send("The request body if blank");
				return;				
			}
	
			csvParser.parse(req.body, csvParser.validateEmployee, csvParser.mapToEmployee, (errors, employees) =>
			{
				if (errors)
				{
					res.status(400).send("csv contains errors");
					return;
				}
				
				req.set('Content-Type', 'application/json');
				req.body = employees;
				
				next();
			});
		}
		else
			next();
	},
	
	parseEmployeeListJsonContent: function(req, res, next)
	{
		if (req.get('Content-Type') == 'application/json')
		{
			jsonParser.parse(req.body, jsonParser.validateEmployeeList, jsonParser.mapToEmployeeList, (errors, employeeList) => {
				
				if (errors)
				{
					console.log(req.body);
					console.log("errors");
					res.status(400).send(errors);
				}
				else
				{
					console.log("not errors");
					req.body = employeeList;
					
					next();
				}
			});
		}
		else
			next();
	}
}