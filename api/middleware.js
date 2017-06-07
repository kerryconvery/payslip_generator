var csvParser = require('./csvParser');

module.exports = {
	
	parseCsvContent: function(req, res, next)
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
	}
}