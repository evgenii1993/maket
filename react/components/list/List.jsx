'use strict';

import React, {Component} from 'react';
import Loading from "../loading/Loading";
import Book from "../book/Book";
import NewAuthor from "../Author/newAuthor/NewAuthor";
import NewBook from "../book/newBook/NewBook";
import FormAdd from "../formAdd/FormAdd";
import Search from  "../search/Search.jsx";

export default class List  extends Component<{}, Props, State>{
	state = {
		data: [],
		loading: true

	}
	refrash = (name) =>{	
		console.log(name, ' refrash ');
		this.setState({
			loading: true
		});
	}
	listResult = (obj, stat, val) => {
		console.log(' ggggglobal ',obj);
		if(stat != 'emp'){
			this.setState({
				data: obj,
				loading: stat
			});
			if(this.state.data.result != undefined){
				let oldArr = this.state.data.result;
				this.state.data.result.forEach((item, index)=>{
					if(item.name.search(val)){
					//	console.log(item.name);
						 delete this.state.data.result[index];
					}
				});
				console.log(this.state.data , ' search form ');
				
			}
		}else{
			this.setState({
				loading: stat
			});

		}
	}
	render(){
		let loading = undefined,
			books = [],
			author,
			$this = this;
			console.log(this.state.data, ' результат ');
		if(this.state.loading){
			window.gl.ajax(
				{
					option: "all"
				},
				this,
				function(data){
                	$this.setState({data:data})
				}
			);
			loading = <Loading />
		}else{
			loading = undefined;
		}
		if(this.state.data.result != undefined){
            this.state.data.result.forEach((item, index)=>{
                books.push(<Book key={index} allAuthors={$this.state.data.authors} data={item} parent={$this} refrash={$this.refrash}/> );
            });
            author = <NewAuthor allAuthors={this.state.data.authors} refrash={this.refrash} />;
		}

		
		return(
			<div className="list">
				<div>
					<Search data = {this.state.data} listResult = {this.listResult} refrash={this.refrash}/>
				</div>
				<div className="list__content">
					{loading}
					{books}
				</div>
				<div className="list__add-author">
					{author}
				</div>
				<div>
					<FormAdd parent={this} refrash={this.refrash} allData = {this.state.data} />
				</div>
			</div>
		);
	}
}