'use strict';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Library from './components/Library';

class ReturnOnScreen extends Component<{}, Props, State>{
	render(){
		return (
			<Library />
		);
	}
}
ReactDOM.render(<ReturnOnScreen/>, document.getElementById('content'));