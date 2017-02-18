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
	};



	render(){
		let authorList = [],
            idAuthor = [],
			all = [];

        this.state.data.forEach((item, index)=>{
            idAuthor.push(item.id);
            authorList.push(
            	<Author name={item.name} id={item.id} key={index} remove={()=>{this.props.deleteAuthor(item.id)}}/>
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
        return(
			<div className="authors">
				<div className="authors__list">
					{authorList}
				</div>
				<div className={this.state.open? "authors__select open": "authors__select"} onClick={this.toggleOpen}>
					Выбрать автора
					<div className="authors__select__items">
					{all}
					</div>
				</div>
			</div>
		);
	}
}
class Author extends Component<{}, Props, State>{
    render(){
    	let Btn = undefined;
    	if(this.props.remove != undefined){
            Btn = <button onClick={this.props.remove}>Удалить автора</button>
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
                    {this.props.name}
                    {Btn}
				</div>
            );
        }
	}
}
