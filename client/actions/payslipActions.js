import axios from "axios"
import {serverUrl} from "../common";

export function generatePayslips(csvData) {
	return {
		type: 'GENERATE_PAYSLIPS',
		payload: axios.post(serverUrl + "/payslips")
	}
}