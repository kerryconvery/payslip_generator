import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux"
import App from './components/App.jsx';
import store from "./store"
import 'react-rangeslider/lib/index.css';

ReactDOM.render(
	<Provider store={store}>
		<App /> 
	</Provider>,
	document.getElementById('root'));