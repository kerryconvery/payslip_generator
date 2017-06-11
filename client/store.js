import {applyMiddleware, createStore } from "redux"
import logger from "redux-logger"
import promise from "redux-promise-middleware"
import {combineReducers} from "redux"
import {payslipReducer} from "./reducers/payslipReducer"
import {formReducer} from "./reducers/formReducer"


const reducers = combineReducers({
	formState: formReducer,
	payslip: payslipReducer
})

const middleware = applyMiddleware(promise(), logger())

export default createStore(reducers, {

	formState: {
		csvData: ''
	},
	
	payslip: {
		items: [],
		fetching: false,
		fetched: false,
		error: null
	}
	
},middleware)