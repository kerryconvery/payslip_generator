var csv = require("csvtojson");
var models = require("./models");

module.exports = {
	
	parse: function(csvString, validate, map, done)
	{
		var items = Array();
		var csvErrors = null;
		var rowCount = 0;
		
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
				done(csvErrors, items);
				
			})
	},

	mapToEmployee: function(row)
	{				
		var employee = new models.EmployeeModel();

		employee.firstName = row[0];
		employee.lastName = row[1];
		employee.annualSalary = parseInt(row[2]);
		employee.superRate = parseInt(row[3]) / 100;
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
		
		if (isNaN(parseInt(row[2]))) //Check annual salary is a valid number
			errors.push("Columns 2 is not a number");
			
		if (isNaN(parseInt(row[3]))) //Check super rate is a valid number
			errors.push("Columns 3 is not a number");
			
		return errors;
	}
}