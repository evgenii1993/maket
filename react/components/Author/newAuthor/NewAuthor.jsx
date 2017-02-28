'use strict';

import React, {Component} from 'react';
export default class NewAuthor  extends Component<{}, Props, State>{
	state = {
		nameAuthor: '',
		allAuthor: this.props.allAuthors,
		open: false
	}
	editValue = () =>{
		this.setState({
			nameAuthor: this.refs.author.value
		});
	}
	createAuthor = () =>{
		window.gl.ajax({
			option: "createAuthor",
			nameA: this.state.nameAuthor
		}, this.props.refrash("Создание автора"));
		this.setState({
			nameAuthor: ''
		});		
	}
	toggleOpen = () => {
		this.setState({
			open: !this.state.open
		});
	}
	deleteAuthor = (id) =>{
		window.gl.ajax({
			option: "deleteAuthor",
			idDeleteAuthor: id
		},this.props.refrash("Удаление автора"));
	}
	addAuthor = (id) =>{
		//console.log(id);
	}
	render(){
		let all = [];
		let allAdd = [];
		if(this.props.allAuthors != undefined){
	        this.props.allAuthors.forEach((item, index)=>{
	            all.push(
	                <AuthorDel name={item.name} id={item.id} key={index} deleteAu={()=>{this.deleteAuthor(item.id)}}/>
	            );
	            allAdd.push(
	            	<AuthorAdd name={item.name} id={item.id} key={index} addAu = {()=>{this.addAuthor(item.id)}} />
	            );
	        });
	    }
      
		return(
			<div className="new-author">
				<input ref="author" value={this.state.nameAuthor} placeholder="Напиши автора" onChange={this.editValue}  /> 
				<button onClick={this.createAuthor} >  Запись </button>
				<div className="new-author__list-author">
					<div className={this.state.open ? "new-author__select open" : "new-author__select"}>
						<span className='new-author__name'>Нажми и уничтожь</span><button className="new-author-button" onClick={this.toggleOpen}> \/ </button>
						<div className="new-author__item">
							{all}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

class AuthorDel extends Component<{}, Props, State>{
    render(){
            return(
				<div className="author-del" onClick={this.props.deleteAu}>
					{this.props.name}
				</div>
			);
        }
}
class AuthorAdd extends Component<{}, Props, State>{
	render(){
		return(
			<div className="author-add" onClick={this.props.addA}>
				{this.props.name}
			</div>
		);
	}
}
