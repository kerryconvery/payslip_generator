import React from 'react'
import {mount, shallow} from 'enzyme'
import {expect} from 'chai'
import {If} from '../components/utilityComponents.jsx'
import Error from '../components/Error.jsx'
import Payslip from '../components/Payslip.jsx'
import App from '../components/App.jsx'
import {applyMiddleware, createStore } from "redux"
import logger from "redux-logger"
import promise from "redux-promise-middleware"
import {combineReducers} from "redux"
import {payslipReducer} from "../reducers/payslipReducer"
import {Provider} from "react-redux"
import sinon from "sinon"

describe("Utility Components", () => {
	
	describe("<If/>", () => {
	
		it("should have a prop called test", () => {
		
			const wrapper = mount(<If/>);
			
			expect(wrapper.props().test).to.not.equal(undefined);
		}),
		
		it("should return children when prop is true", () => {
		
			const wrapper = mount(<If test={true}><label/></If>);
			
			expect(wrapper.find('label')).to.have.length(1);
		}),
		
		it("should not return children when prop is false", () => {
		
			const wrapper = mount(<If test={false}><label/></If>);
			
			expect(wrapper.find('label')).to.have.length(0);
		})	
	}),

	describe("</Error>", () => {
		
		it("should have a prop called errors", () => {
			
			const wrapper = mount(<Error/>);
			
			expect(wrapper.props().errors).to.not.equal(undefined);
		}),
		
		it("should render errors in prop errors", () => {
			
			const wrapper = mount(<Error errors={["test error"]}/>);
			
			expect(wrapper.find('li')).to.have.length(1)
		})
	}),
	
	describe("</Payslip>", () => {
		
		it("should have a prop called payslips", () => {
			
			const wrapper = mount(<Payslip/>);
			
			expect(wrapper.props().payslips).to.not.equal(undefined);
		}),
		
		it("should render headers", () => {
			
			const payslip = {
				name: "test employee",
				payPeriod: "01 March - 31 March",
				grossIncome: 0,
				incomeTax: 0,
				netIncome: 0,
				superContribution: 0
			}
			
			const wrapper = mount(<Payslip payslips={[payslip]}/>);
			
			expect(wrapper.find('th')).to.have.length(6)
		})
		
		it("should render payslips when payslips in prop payslips", () => {
			
			const payslip = {
				name: "test employee",
				payPeriod: "01 March - 31 March",
				grossIncome: 0,
				incomeTax: 0,
				netIncome: 0,
				superContribution: 0
			}
			
			const wrapper = mount(<Payslip payslips={[payslip, payslip]}/>);
			
			expect(wrapper.find('td')).to.have.length(12)
		}),
		
		describe("</App>", () => {
			
			it("default state should have a textarea and a button but not a Error or Payslip", () => {
			
				const payslip = {
					items: [],
					fetching: false,
					fetched: false,
					error: null
				}
				
				const reducers = combineReducers({payslip: payslipReducer})

				const middleware = applyMiddleware(promise(), logger())

				const store = createStore(reducers, {payslip}, middleware);
				
				const wrapper = mount(<Provider store={store}><App/></Provider>);
			
				expect(wrapper.find('textarea')).to.have.length(1)
				expect(wrapper.find('button')).to.have.length(1)
				expect(wrapper.find('Error')).to.have.length(0)
				expect(wrapper.find('Payslip')).to.have.length(0)
				
			}),
			
			it("error state should have a textarea and a button and a Error but not a Payslip", () => {
			
				const payslip = {
					items: [],
					fetching: false,
					fetched: false,
					error: []
				}
				
				const reducers = combineReducers({payslip: payslipReducer})

				const middleware = applyMiddleware(promise(), logger())

				const store = createStore(reducers, {payslip}, middleware);
				
				const wrapper = mount(<Provider store={store}><App/></Provider>);
				
				expect(wrapper.find('textarea')).to.have.length(1)
				expect(wrapper.find('button')).to.have.length(1)
				expect(wrapper.find('Error')).to.have.length(1)
				expect(wrapper.find('Payslip')).to.have.length(0)
			}),
			
			
			it("fetch state should have a textarea and a button and a Payslip but not a error", () => {
			
				const payslipItem = {
					name: "test employee",
					payPeriod: "01 March - 31 March",
					grossIncome: 0,
					incomeTax: 0,
					netIncome: 0,
					superContribution: 0
				}
			
				const payslip = {
					items: [payslipItem],
					fetching: false,
					fetched: true,
					error: null
				}
				
				const reducers = combineReducers({payslip: payslipReducer})

				const middleware = applyMiddleware(promise(), logger())

				const store = createStore(reducers, {payslip}, middleware);
				
				const wrapper = mount(<Provider store={store}><App/></Provider>);
			
				expect(wrapper.find('textarea')).to.have.length(1)
				expect(wrapper.find('button')).to.have.length(1)
				expect(wrapper.find('Payslip')).to.have.length(1)
				expect(wrapper.find('Error')).to.have.length(0)
			}),
			
			it("error state should also render a li under Error", () => {
			
				const payslip = {
					items: [],
					fetching: false,
					fetched: false,
					error: ["test error"]
				}
				
				const reducers = combineReducers({payslip: payslipReducer})

				const middleware = applyMiddleware(promise(), logger())

				const store = createStore(reducers, {payslip}, middleware);
				
				const wrapper = mount(<Provider store={store}><App/></Provider>);
				
				expect(wrapper.find('Error').children().find('li')).to.have.length(1)
			}),
			
			
			it("fetch state should also render a table under payslip", () => {
			
				const payslipItem = {
					name: "test employee",
					payPeriod: "01 March - 31 March",
					grossIncome: 0,
					incomeTax: 0,
					netIncome: 0,
					superContribution: 0
				}
			
				const payslip = {
					items: [payslipItem],
					fetching: false,
					fetched: true,
					error: null
				}
				
				const reducers = combineReducers({payslip: payslipReducer})

				const middleware = applyMiddleware(promise(), logger())

				const store = createStore(reducers, {payslip}, middleware);
				
				const wrapper = mount(<Provider store={store}><App/></Provider>);
			
				expect(wrapper.find('Payslip').children().find('table')).to.have.length(1)
				
			}),
			
			
			it("should invoke generatePayslips action when button clicked", () => {

				const payslip = {
					items: [],
					fetching: false,
					fetched: false,
					error: null
				}
				
				const reducers = combineReducers({payslip: payslipReducer})

				const middleware = applyMiddleware(promise(), logger())

				const store = createStore(reducers, {payslip}, middleware);
			
				
				const wrapper = mount(<Provider store={store}><App/></Provider>);
			
				const stub = sinon.stub(wrapper.prototype, 'handleSubmit').returns(true)
			
				wrapper.find('button').simulate('click')	
			})
		});
	})
});
