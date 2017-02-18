'use strict';

import React, {Component} from 'react';
import Loading from "../loading/Loading";
import Book from "../book/Book";
import NewAuthor from "../Author/newAuthor/NewAuthor";

export default class List  extends Component<{}, Props, State>{
	state = {
		data: [],
		loading: true
	};
	refrash = () =>{
		this.setState({
			loading: true
		});		
	};
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
		if(this.state.data.result != undefined){
            this.state.data.result.forEach((item, index)=>{
                books.push(<Book key={index} allAuthors={ this.state.data.authors} data={item} refrash={this.refrash}/> );
            });
		}


		return(
			<div className="list">
				{loading}
				{books}
				<NewAuthor refrash={this.refrash}/>
			</div>
		);
	}
}