'use strict';

import React, {Component} from 'react';

export default class Search extends Component<{}, Props, State>{
	state = {
		keyWord: '',
		action: false
	}
	editValue = () =>{
		this.setState({
			keyWord: this.refs.findWord.value,
			action: true		
		});
			// if(this.props.data.result != undefined){
			// 	let oldArr = this.props.data.result;
			// 	this.props.data.result.forEach((item, index)=>{
			// 		if(item.name.search(this.refs.findWord.value)){
			// 		//	console.log(item.name);
			// 			 delete this.props.data.result[index];
						
			// 		}
			// 	});
			// 	console.log(this.props.data , ' search form ');
				
			// }	
	}
	setData = (e) => {
		e.preventDefault();
		let $this = this;
		console.log(this.state.keyWord);
		if(this.state.action){
			this.props.listResult(this.props.data, false, this.refs.findWord.value);
			this.setState({
				action: false,
				keyWord: ''
			});

		}else{
			this.props.listResult('emp', true, '');

		}
	}
	render(){
			 console.log(this.props.data.result); 
			
		return(
				<form className="search-form"> 
					<input 
						ref="findWord" 
						value={this.state.keyWord} 
						placeholder="Поиск по книге" 
						onChange={this.editValue} 
						
					 /> 
					<button onClick={this.setData}> Поиск </button>
				</form>
			);
	}
}