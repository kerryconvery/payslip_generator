var csv = require("csvtojson");
var models = require("./models");

module.exports = {
	
	parse: function(csvString, validate, map, done)
	{
		var items = Array();
		var csvErrors = null;
		var rowCount = 0;
		
		try
		{
		csv({noheader:true})
			.fromString(csvString)
			.on('csv', (row) => {
					
				var errors = validate(row);
					
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
		var employee = new models.EmployeeModel();

		employee.firstName = row[0];
		employee.lastName = row[1];
		employee.annualSalary = parseInt(row[2], 10);
		employee.superRate = parseInt(row[3], 10) / 100;
		employee.paymentStartDate = row[4];			
		
		return employee;
	},
	
	validateEmployee: function(row)
	{
		var errors = [];
		
		if (row.length < 5) {
			errors.push("Expected 5 columns");
			return errors;
		}
		
		//Check annual salary
		if (isNaN(parseFloat(row[2], 10)))
			errors.push("Column 2 is not a number");
		else if (parseFloat(row[2], 10) < 0)
			errors.push("Column 2 is less than zero");
		else if (parseFloat(row[2], 10) % 1 != 0)
			errors.push("Column 2 is not a whole number");
		
		//Check super rate
		if (isNaN(parseFloat(row[3], 10)))
			errors.push("Column 3 is not a number");
		else if (parseFloat(row[3], 10) < 0)
			errors.push("Column 3 is less than zero");
		else if (parseFloat(row[3], 10) % 1 != 0)
			errors.push("Column 3 is not a whole number");	

		return errors;
	}
}