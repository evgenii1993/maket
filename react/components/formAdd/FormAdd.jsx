'use strict';

import React, {Component} from 'react';

export default class FormAdd  extends Component<{}, Props, State>{
	state = {
		nameAuthor: '',
		nameBook: '',
		openAuthor: false,
		choiceArrAuthor: [],
		defNameBook: []
	};

	editValue = (name) =>{
		switch(name){
			case 'author':
				this.setState({
					nameAuthor: this.refs.author.value		
				});
				this.toggleOpen();
			break;
			case 'nameB':
				this.setState({
					nameBook: this.refs.nameB.value,
					openAuthor: false		
				});
			break;
		}
	}

	toggleOpen = () => {
		let arrNameAuthor = [];
		if(!this.state.openAuthor){
			this.setState({
				openAuthor: !this.state.openAuthor
			});
		
		}
	};

	choiceAuthor = (name) =>{
		this.setState({
			nameAuthor: name,
			openAuthor: false
		});

	};

	addListAuthor = () =>{
		let count = 0;
		if(this.state.nameAuthor != '' ){
			this.state.choiceArrAuthor.forEach((item, index) =>{
				if(item == this.state.nameAuthor){
					count ++;
				}
			});
			if(count == 0){
				this.setState({
					choiceArrAuthor: [...this.state.choiceArrAuthor, this.state.nameAuthor],
					nameAuthor: ''
				});
			}
		}
	};
	delElemInArray = (name) =>{
		let oldArr = this.state.choiceArrAuthor,
			newArr = [];
		oldArr.forEach((item, index) =>{
			if(item != name){
				newArr.push(item);
			}
		});
		this.setState({
			choiceArrAuthor: newArr
		});
	};

	createBook = (bool) => {
		let $this = this;
		if(bool){
	        window.gl.ajax({
				option: "createB",
				dataNewBook: ({"arrAuthor":this.state.choiceArrAuthor, "newNameBook": this.state.nameBook})
			},
			this.props.refrash(),
			function(data){
                $this.props.parent.setState({data:data})
			});
		}
		this.setState({
			choiceArrAuthor: [],
			nameBook: ''
		});
	};
	render(){
		let arrFind = [],
			arrElemView = [],
			boolEnter = false;
			if(this.state.openAuthor && this.state.nameAuthor != ''){
				this.props.allData.authors.forEach((item, index)=>{
					let name = item.name.match(this.state.nameAuthor,"i");
					if(name != null){
						arrFind.push(<AuthorAdd key={index} nameA = {item.name} idA = {item.id} addBook={()=>{this.choiceAuthor(item.name)}} />);
					}
				});
			}
			if(this.state.choiceArrAuthor.length > 0){
				this.state.choiceArrAuthor.forEach((item, index) => {
					if(item != ''){
						arrElemView.push(<AuthorView key={index} nameA = {item} del = {()=>{this.delElemInArray(item)}} />);
					}
				});
			}else{
				arrElemView = <div className="form-add__error-null"> Нету выбранных авторов </div>;
			}
			if(this.state.choiceArrAuthor.length > 0 && this.state.nameBook != undefined && this.state.nameBook != ''){
				boolEnter = true;
			}
			

			return(
				<div className="form-add">
					<div className="form-add__result">
						<h3>Итоговая запись</h3>
						<div className="form-add__result-content">
							<div className="form-add__glob">
								<div className="form-add__name">
									<b>Название книги:</b>
								</div>
								<div className="form-add__con">
								 	{this.state.nameBook ? this.state.nameBook : "Неизвестно"}
								 </div>
							</div>
							<div className="form-add__glob">
								<div className="form-add__name">
									<b>Автор:</b>
								</div>
								<div className="form-add__con">
									{arrElemView}
								</div>
							</div>
							<div className="form-add__glob">
								<div className={boolEnter ? "form-add__icon form-add__icon--ready": "form-add__icon form-add__icon--fatal"} onClick = {boolEnter ? () => {this.createBook(true)} : () => {this.createBook(false)} }>
									
								</div>
							</div>
						</div>
					</div>
					<div className="form-add__edit">
						<div className="form-add__book">
							<input ref="nameB" value={this.state.nameBook} placeholder="Напиши книгу" onChange={()=>{this.editValue("nameB")}}  /> 
						</div>
						<div className="form-add__author">
							<input ref="author" value={this.state.nameAuthor} placeholder="Напиши автора" onChange={()=>{this.editValue("author")}}  /> 
							<div className={this.state.openAuthor ? "form-add__list--open" : "form-add__list"}> 
								{arrFind}
							</div>
						</div>
						<div className="form-add__botton" onClick={this.addListAuthor}>
							&#10010;
						</div>
					</div>
				</div>
			);
		}
}


class AuthorAdd extends Component<{}, Props, State>{
	render(){
		return(
			<div className="author-add"  onClick={this.props.addBook}>
				{this.props.nameA}
			</div>
		);
	}
}
class AuthorView extends Component<{}, Props, State>{
	render(){
		return(
			<div className="form-add__view-elem"  onClick={this.props.del}>
				{this.props.nameA} 	
					&#10008;	
			</div>

		)
	}

}