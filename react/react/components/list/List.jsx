'use strict';

import React, {Component} from 'react';
import Loading from "../loading/Loading";
import Book from "../book/Book";

export default class List  extends Component<{}, Props, State>{
	state = {
		data: [],
		loading: true
	}
	refrash = () =>{
		this.setState({
			loading: true
		});		
	}
	render(){

		let loading = undefined,
			books = [];

		if(this.state.loading){
			window.gl.ajax({
				option: "all"
			}, this);
			loading = <Loading />
		}else{
			loading = undefined;
		}
		books = this.state.data.map((item, index)=>{
			
			return (
				<Book key={index} data={JSON.parse(item)} refrash={this.refrash}/> 
			)		
		});

		return(
			<div className="list">
				{loading}
				{books}
			</div>
		);
	}
}