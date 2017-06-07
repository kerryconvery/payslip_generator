var chai = require("chai");
var csvParser = require("../csvParser");
var models = require("../models");
var check = require("check-types");
var sinon = require("sinon");

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
		});		
});	
	
describe("Test parser", () =>{

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

	it("with multi row where one row fails validation", (done) => {
		
		csvParser.parse(
			'"David","Rudd",60050,%9,"01 March - 31 March" \n\r "Ryan","Chen",120000,10%,"01 March - 31 March"', 
			(row) => {return row[0] == "David" ? ["Column 3 is not a number"] : []},
			(row) => {return new models.EmployeeModel()},
			(errors, employees) => {
			
				chai.expect(errors.length).equals(1);
				chai.expect(employees.length).equals(1);
				chai.expect(errors[0]).equals("Row 0 Column 3 is not a number");
				
				done();
			}
		);
	})
});