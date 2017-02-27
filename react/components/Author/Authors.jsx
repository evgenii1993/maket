'use strict';

import React, {Component} from 'react';

export default class Authors extends Component<{}, Props, State>{
	state = {
		data: this.props.data,
		open: false
	};

	toggleOpen = () => {
		this.setState({
			open: !this.state.open
		});
	}
	// ChangingCurrectAuthor = ( name, id) =>{
	// 	console.log(' Изменение элемента ', id, ' __ ', name );
	// 	// this.props.updateNameAuthor(id, name);
	// 	// console.log(this.state.data);
	// 	// let newListArrAuthor = [];
	// 	// console.log(newListArrAuthor, 'Список измененных авторов');
	// }


	render(){
		//console.log(this.props.data, ' итоговый массив');
		//console.log(this.props.data); 
		let authorList = [],
            idAuthor = [],
			all = [],
			context = [];

        this.state.data.forEach((item, index)=>{
            idAuthor.push(item.id);
            authorList.push(
            	<Author name={item.name} id={item.id} key={index} statActive ={this.props.stateA} updateNameAuthor = {this.props.updateNameAuthor} remove={()=>{this.props.deleteAuthor(item.id)}}/>
			);
		});
        this.props.all.forEach((item, index)=>{
            if(!window.gl.foundInArr(idAuthor, item.id)){
                all.push(
                    <Author name={item.name} id={item.id} key={index} add={()=>{this.props.addAuthor(item)}}/>
                );
            }
        });
        if(all.length === 0){
            all.push(<div key={all.length+1} className="authors">Нет невписаных авторов</div>);
        }
        if(this.props.stateA){
        	context = (<div><div className={this.state.open ? "authors__select open": "authors__select"} onClick={this.toggleOpen}>
								Добавить автора 
								<div className="authors__select__items">
									{all}
								</div>
							</div>
						<button onClick={this.props.updateBook} > ПH </button> </div>);
        }
        return(
			<div className="authors">
				<div className="authors__list">
					{authorList}
				</div>
				{context}
			</div>

		);
	}
}

class Author extends Component<{}, Props, State>{
	state = {
		nameA: this.props.name	
	}
	editValue = () =>{
		this.setState({
			nameA: this.refs.nameA.value
			
		});
		
		this.props.updateNameAuthor(this.refs.nameA.value, this.props.id);
	}

    render(){
    
    	let Btn = undefined,
    		authorLine = undefined;
    	if(this.props.remove != undefined && this.props.statActive){
            Btn = <button onClick={this.props.remove}></button>
            authorLine = <input ref="nameA" value={this.state.nameA} onChange= {()=>{this.editValue()}} />
		}else{
			authorLine = this.props.name 
		}
        if(this.props.add != undefined){
            return(
				<div className="author" onClick={this.props.add}>
					{this.props.name}
				</div>
			)
        }else{
            return(
				<div className="author">		
                    {authorLine}
                    {Btn}
				</div>
            );
        }
	}
}
