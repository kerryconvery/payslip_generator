import {applyMiddleware, createStore } from "redux"
import logger from "redux-logger"
import promise from "redux-promise-middleware"
import {combineReducers} from "redux"
import {payslipReducer} from "./reducers/payslipReducer"


const reducers = combineReducers({
	payslip: payslipReducer
})

const middleware = applyMiddleware(promise(), logger())

export default createStore(reducers, {

	payslip: {
		items: [],
		fetching: false,
		fetched: false,
		error: null
	}
	
},middleware)