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
			all = [];

        this.props.data.forEach((item, index)=>{
            authorList.push(
            	<Author name={item.name} id={item.id} key={index} />
			);
		});
        this.props.all.forEach((item, index)=>{
            all.push(
				<Author name={item.name} id={item.id} key={index} />
            );
        });
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
        return(
			<div className="author">
				{this.props.name}
			</div>
        );
    }
}