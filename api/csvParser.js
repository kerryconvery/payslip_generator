const csv = require("csvtojson");
const models = require("./models");

module.exports = {
	
	parse: function(csvString, validate, map, done)
	{
		const items = Array();
		let csvErrors = null;
		let rowCount = 1;
		
		try
		{
			csv({noheader:true})
				.fromString(csvString)
				.on('csv', (row) => {
						
					const errors = validate(row);
						
					if (errors.length == 0)
						items.push(map(row));
					else {
						if (csvErrors == null)
							csvErrors = new Array();
						
						errors.forEach((error) => {csvErrors.push("Row " + rowCount + " " + error)});
					}
				
					rowCount++;
				})
				.on('done', () => {
					
					if (csvErrors)
						done(csvErrors, null);
					else
						done(null, items)
					
				})
		}
		catch(e)
		{
			done([e], null);
		}
	},

	mapToEmployee: function(row)
	{				
		const employee = new models.EmployeeModel();

		employee.firstName = row[0];
		employee.lastName = row[1];
		employee.annualSalary = parseInt(row[2], 10);
		employee.superRate = parseInt(row[3], 10) / 100;
		employee.paymentStartDate = row[4];			
		
		return employee;
	},
	
	validateEmployee: function(row)
	{
		const errors = [];
		
		if (row.length < 5) {
			errors.push("Expected 5 columns");
			return errors;
		}
		
		//Check annual salary
		if (!row[2].match(/^[-]?[\d]*$/))
			errors.push("Column 3 can only be numeric and must be a whole number (e.g. 100)");
		else if (parseFloat(row[2], 10) < 0)
			errors.push("Column 3 is less than zero");
		
		//Check super rate
		if (!row[3].match(/^[\d]*%?$/))
			errors.push("Column 4 can only be a numeric percentage (e.g. 10%)");

		return errors;
	}
}