var chai = require("chai");
var csvParser = require("../csvParser");
var jsonParser = require("../jsonParser");
var models = require("../models");
var check = require("check-types");


describe("Check employee csv parser", () => {
			
		it ("Test mapper return type", () =>
		{
			var row = ["David", "Rudd", "60050", "9%", "01 March - 31 March"];
			
			var employee = csvParser.mapToEmployee(row);
			
			chai.expect(check.instanceStrict(employee, models.EmployeeModel)).equals(true);			
		})
		
		it("Test parser mapper", () => {
			
			var row = ["David", "Rudd", "60050", "9%", "01 March - 31 March"];
			
			var employee = csvParser.mapToEmployee(row);
			
			chai.expect(employee.firstName).equals("David");
			chai.expect(employee.lastName).equals("Rudd");
			chai.expect(employee.annualSalary).equals(60050);
			chai.expect(employee.superRate).equals(0.09);
			chai.expect(employee.paymentStartDate).equals("01 March - 31 March");
		});
		
		it("Test parser validator", () => {
			
			var row = ["David", "Rudd", "60050", "9%", "01 March - 31 March"];
			
			var errors = csvParser.validateEmployee(row);
			
			chai.expect(Array.isArray(errors)).equals(true);
			chai.expect(errors.length).equals(0);
		});
		
		it("Test parser validator with missing column", () => {
			
			var row = ["David", "Rudd", "60050", "9%"];
			
			var errors = csvParser.validateEmployee(row);
			
			chai.expect(errors.length).equals(1);
			chai.expect(errors[0]).equals("Expected 5 columns");
		});
		
		it("Test parser validator where annual salary and super rate are not numbers", () => {
			
			var row = ["David", "Rudd", "abc", "%9", "01 March - 31 March"];
			
			var errors = csvParser.validateEmployee(row);
			
			chai.expect(errors.length).equals(2);
			chai.expect(errors[0]).equals("Column 3 can only be numeric and must be a whole number (e.g. 100)");
			chai.expect(errors[1]).equals("Column 4 can only be a numeric percentage (e.g. 10%)");
		});		
		
		it("Test parser validator where annual salary is less than zero", () => {
			
			var row = ["David", "Rudd", "-1", "-9%", "01 March - 31 March"];
			
			var errors = csvParser.validateEmployee(row);
			
			chai.expect(errors.length).equals(2);
			chai.expect(errors[0]).equals("Column 3 is less than zero");
			chai.expect(errors[1]).equals("Column 4 can only be a numeric percentage (e.g. 10%)");
		});		
		
		it("Test parser validator where annual salary or super rate contain decimals", () => {
			
			var row = ["David", "Rudd", "60050.5", "0.09", "01 March - 31 March"];
			
			var errors = csvParser.validateEmployee(row);
			
			chai.expect(errors.length).equals(2);
			chai.expect(errors[0]).equals("Column 3 can only be numeric and must be a whole number (e.g. 100)");
			chai.expect(errors[1]).equals("Column 4 can only be a numeric percentage (e.g. 10%)");
		});				
});	
	
describe("Test csv parser", () =>{

	it("with single row csv", (done) => {
		
		csvParser.parse(
			'"David","Rudd",60050,9%,"01 March - 31 March"', 
			(row) => {return []}, 
			(row) => {return new models.EmployeeModel()}, 
			(errors, employees) => {
			
				chai.expect(errors).equals(null);
				chai.expect(employees.length).equals(1);
				done();
			}
		);
	})

	it("with multi row csv", (done) => {
		
		csvParser.parse(
			'"David","Rudd",60050,9%,"01 March - 31 March" \n\r "Ryan","Chen",120000,10%,"01 March - 31 March"', 
			(row) => {return []},
			(row) => {return new models.EmployeeModel()},
			(errors, employees) => {
			
				chai.expect(errors).equals(null);
				chai.expect(employees.length).equals(2);
				
				done();
			}
		);
	})

	it("where row fails validation", (done) => {
		
		csvParser.parse(
			'"David","Rudd",60050,%9,"01 March - 31 March"', 
			(row) => {return row[0] == "David" ? ["Column 3 is not a number"] : []},
			(row) => {return new models.EmployeeModel()},
			(errors, employees) => {
			
				chai.expect(errors.length).equals(1);
				chai.expect(employees).equals(null);
				chai.expect(errors[0]).equals("Row 1 Column 3 is not a number");
				
				done();
			}
		);
	})
});

describe("Check employee json parser", () => {
	
	it("validate valid json", () => {
		
		var validJson = [{"firstName" : "David", "lastName" : "Rudd", "annualSalary" : 60050, "superRate" : 0.09, "paymentStartDate" : "01 March - 31 March"},  
			 {"firstName" : "Ryan", "lastName" : "Chen", "annualSalary" : 120000, "superRate" : 0.1, "paymentStartDate" : "01 March - 31 March"}];
		
		var errors = jsonParser.validateEmployeeList(validJson);
		
		chai.expect(Array.isArray(errors)).equals(true);
		chai.expect(errors.length).equals(0);
	});
	
	it("validate json with missing array", () => {
		
		var invalidJson = {"firstName" : "David", "lastName" : "Rudd", "annualSalare" : 60050, "superRate" : 0.09, "paymentStartDate" : "01 March - 31 March"};

		var errors = jsonParser.validateEmployeeList(invalidJson);
	
		chai.expect(Array.isArray(errors)).equals(true);
		chai.expect(errors.length).equals(1);
	});

	it("validate json with missing fields", () => {
		
	var invalidJson = [{"firstNam" : "David", "lastNam" : "Rudd", "annualSalar" : 60050, "superRat" : 0.09, "paymentStartDat" : "01 March - 31 March"}];

		var errors = jsonParser.validateEmployeeList(invalidJson);
		
		chai.expect(errors.length).equals(5);
	});

	it("validate json with numbers are string", () => {
		
		var invalidJson = [{"firstName" : "David", "lastName" : "Rudd", "annualSalary" : "60050", "superRate" : "9%", "paymentStartDate" : "01 March - 31 March"}];

		var errors = jsonParser.validateEmployeeList(invalidJson);
		
		chai.expect(errors.length).equals(2);
	});

	it("validate invalid json with numbers out of range", () => {
		
		var invalidJson = [{"firstName" : "David", "lastName" : "Rudd", "annualSalary" : 60050.5, "superRate" : 2, "paymentStartDate" : "01 March - 31 March"}];

		var errors = jsonParser.validateEmployeeList(invalidJson);
		
		chai.expect(errors.length).equals(2);
	});	
	
	it("validate invalid json with negative numbers", () => {
		
		var invalidJson = [{"firstName" : "David", "lastName" : "Rudd", "annualSalary" : -1, "superRate" : -1, "paymentStartDate" : "01 March - 31 March"}];

		var errors = jsonParser.validateEmployeeList(invalidJson);
		
		chai.expect(errors.length).equals(2);
	});
	
	it("map object to employee list model", () => {
		
		var object = [{firstName: "David", lastName : "Rudd", annualSalary : 60050, superRate : 0.09, paymentStartDate : "01 March - 31 March"}];
		
		var employees = jsonParser.mapToEmployeeList(object);
		
		chai.expect(employees.length).equals(1);
		
		chai.expect(check.instanceStrict(employees[0], models.EmployeeModel)).equals(true);	
	
		chai.expect(employees[0].firstName).equals("David");
		chai.expect(employees[0].lastName).equals("Rudd");
		chai.expect(employees[0].annualSalary).equals(60050);
		chai.expect(employees[0].superRate).equals(0.09);
		chai.expect(employees[0].paymentStartDate).equals("01 March - 31 March");
	});
	
	it("map object to employee model", () => {
		
		var object = {firstName: "David", lastName : "Rudd", annualSalary : 60050, superRate : 0.09, paymentStartDate : "01 March - 31 March"};
		
		var employee = jsonParser.mapToEmployee(object);
		
		chai.expect(check.instanceStrict(employee, models.EmployeeModel)).equals(true);	
	
		chai.expect(employee.firstName).equals("David");
		chai.expect(employee.lastName).equals("Rudd");
		chai.expect(employee.annualSalary).equals(60050);
		chai.expect(employee.superRate).equals(0.09);
		chai.expect(employee.paymentStartDate).equals("01 March - 31 March");
	});
});