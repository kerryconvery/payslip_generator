import axios from "axios"
import {serverUrl} from "../common";

export function generatePayslips(csvData) {
	
	return {
		type: 'GENERATE_PAYSLIPS',
		payload: axios.post(
			serverUrl + "/payslips",
			csvData,
			{headers : {'Content-Type' : 'application/csv'}})
	}
}

export function updateCsvInput(csvData) {
	
	return {
		type: "CSV_DATA_CHANGED",
		payload: csvData
	}
}