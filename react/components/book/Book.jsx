'use strict';

import React, {Component} from 'react';

export default class Book  extends Component<{}, Props, State>{
	state = {
		id_library: this.props.data.id,
		id_book: this.props.data.id_book,
		id_author: this.props.data.id_author,
		name_b: this.props.data.name_b,
		name_a: this.props.data.name_a
	}
	updateBooks = () =>{
		let newData = this.state;
			window.gl.ajax({
				option: "update",
				sendData: newData
			});
		this.props.refrash();
	}
	deleteBooks = () =>{

	}
	editValue = (inputName) =>{
		switch(inputName){
			case "name": 
				this.setState({
					name_b: this.refs.name.value
				});
			break;
			case "author":
				this.setState({
					name_a: this.refs.author.value
				});
			break;
		}
	}
	render(){
		return(
			<div className="book">
				<div className="book__row">
					<input ref="name" value={this.state.name_b} onChange={()=>{this.editValue("name")}} />
					<div ref="author" value={this.state.name_a} onChange={()=>{this.editValue("author")}} > <List> </div> 
					<button onClick={this.updateBooks} > П </button>
					<button onClick={this.deleteBooks} > У </button>
				</div>
			</div>
		);
	}
}