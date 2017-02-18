'use strict';

import React, {Component} from 'react';

export default class Authors extends Component<{}, Props, State>{
	state = {
		nameAuthor: '',
		data: []
	}
	editValue = () =>{
		this.setState({
			nameAuthor: this.refs.author.value
		});	
	}
	createAuthor = () =>{
		window.gl.ajax({
			option: "createAuthor",
			sendData: this.state.nameAuthor
		}, this);
		console.log(this.state.data);
	}
	render(){
		return(
			<div className="author">
				<input ref="author" value={this.state.nameAuthor} placeholder="Напиши автора" onChange={this.editValue}  /> 
				<button onClick={this.createAuthor} >  Запись </button>
			</div>
		);
	}
}