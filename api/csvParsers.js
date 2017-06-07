var csv = require("csvtojson");
var models = require("./models");

module.exports = {
	
	parse: function(csvString, validate, map, done)
	{
		var items = [];
		
		csv({noheader:true})
			.fromString(csvString)
			.on('csv', (row) => {
						
				if (this.validate(row))
					items.push(map(row));
			})
			.on('done', () => {
				done(items);
				
			})
	}

	employeeMapper: function(row)
	{				
		var employee = new models.EmployeeModel();

		employee.firstName = row[0];
		employee.lastName = row[1];
		employee.annualSalary = parseInt(row[2]);
		employee.superRate = parseInt(row[3]) / 100;
		employee.paymentStartDate = row[4];			
		
		return employee;
	}
	
	employeeValidator: function(row)
	{
		if (row.length < 5)
			return false;
		
		if (isNaN(parseInt(row[2]))) //Check annual salary is a valid number
			return false;
			
		if (isNaN(parseInt(row[3]))) //Check super rate is a valid number
			return false;
			
		return true;
	}
}