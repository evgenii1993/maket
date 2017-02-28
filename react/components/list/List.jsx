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
		this.setState({
			loading: true
		});
	}
	render(){
		let loading = undefined,
			books = [],
			author;

		if(this.state.loading){
			window.gl.ajax({
				option: "all"
			}, this,function(){
 					this.setState({data:data})
				});
			loading = <Loading />
		}else{
			loading = undefined;
		}
		if(this.state.data.result != undefined){
            this.state.data.result.forEach((item, index)=>{
                books.push(<Book key={index} allAuthors={this.state.data.authors} data={item} parent = {this} refrash={this.refrash}/> );
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