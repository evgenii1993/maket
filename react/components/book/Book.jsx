'use strict';

import React, {Component} from 'react';
import Authors from '../Author/Authors';


export default class Book  extends Component<{}, Props, State>{
	state = {
		id_book: this.props.data.id,
		thisAuthors: this.props.data.authors,
		allAuthors: this.props.allAuthors,
		name_b: this.props.data.name
	};
	updateBooks = () =>{
		let newData = this.state;
			window.gl.ajax({
				option: "update",
				sendData: newData
			});
		this.props.refrash();
	};
	deleteBooks = () =>{

	};
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
	};
	render(){
		console.log('thisAuthors: ', this.state.thisAuthors);
		return(
			<div className="book">
				<div className="book__row">
					<input ref="name" value={this.state.name_b} onChange={()=>{this.editValue("name")}} />
					<Authors data={this.state.thisAuthors} all={this.state.allAuthors}/>
					<button onClick={this.updateBooks} > П </button>
					<button onClick={this.deleteBooks} > У </button>
				</div>
			</div>
		);
	}
}