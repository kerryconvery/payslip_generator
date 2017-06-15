import axios from "axios"
import {serverUrl} from "../common";

export function generatePayslips(csvData) {
	
	return {
		type: 'GENERATE_PAYSLIPS',
		payload: axios.post(
			serverUrl + "/api/v1.0/payslips",
			csvData,
			{headers : {'Content-Type' : 'application/csv'}})
	}
}