'use strict';

import React, {Component} from 'react';

export default class NewAuthor  extends Component<{}, Props, State>{
	state = {
		nameAuthor: ''
	};
	editValue = () =>{
		this.setState({
			nameAuthor: this.refs.author.value
		});
	};
	createAuthor = () =>{
		window.gl.ajax({
			option: "createAuthor",
			sendData: this.state.nameAuthor
		});
		this.props.refrash();
	};
	render(){
		return(
			<div className="new-author">
				<input ref="author" value={this.state.nameAuthor} placeholder="Напиши автора" onChange={this.editValue}  /> 
				<button onClick={this.createAuthor} >  Запись </button>
			</div>
		);
	}
}
