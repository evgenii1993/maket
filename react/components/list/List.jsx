'use strict';

import React, {Component} from 'react';
import Loading from "../loading/Loading";
import Book from "../book/Book";
import NewAuthor from "../Author/newAuthor/NewAuthor";
import NewBook from "../book/newBook/NewBook";
import FormAdd from "../formAdd/FormAdd"

export default class List  extends Component<{}, Props, State>{
	state = {
		data: [],
		loading: true

	}
	refrash = (name) =>{
		console.log("Изменение удаления ", name);	
		window.gl.ajax({
				option: "all"
			}, this);	
		this.setState({
			loading: true
		});
		window.gl.ajax({
				option: "all"
			}, this);
	}
	render(){
		let loading = undefined,
			books = [],
			author;

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
                books.push(<Book key={index} allAuthors={this.state.data.authors} data={item} refrash={this.refrash}/> );
            });
            author = <NewAuthor allAuthors={this.state.data.authors} refrash={this.refrash} />;
		}

		
		return(
			<div className="list">
				<div className="list__content">
					{loading}
					{books}
				</div>
				<div className="list__add-author">
					{author}
				</div>
				<div>
					<FormAdd refrash={this.refrash} allData = {this.state.data} />
				</div>
			</div>
		);
	}
}