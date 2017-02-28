'use strict';

import React, {Component} from 'react';
import Authors from '../Author/Authors';


export default class Book  extends Component<{}, Props, State>{
	state = {
		id_book: this.props.data.id,
		thisAuthors: this.props.data.authors,
		allAuthors: this.props.allAuthors,
		name_b: this.props.data.name,
		stateAuthor: false
	}


/********************************************/

updateName = (name) =>{

}

/********************************************/
	updateBooks = () =>{
		let newData = this.state,
            $this = this;
		this.stateThisAuthors("close");
			window.gl.ajax(
                {
                    option: "update",
                    sendData: newData
                },
                this.props.refrash("обновление книги"),
                function(data){
                    console.log("newData: ", data);
                    $this.props.parent.setState({data:data})
                }
            );
		
		
	};

	updateNameAuthor = (name, id) =>{

		let newArrAuthor = [];
		this.state.thisAuthors.forEach((item)=>{
			if(item.id == id){
				newArrAuthor.push({'id':item.id, 'name': name});
			}else{
				newArrAuthor.push({'id':item.id, 'name':item.name});
			}
		});

		this.setState({
			thisAuthors: newArrAuthor
		});
	};
	deleteBooks = () =>{
	    let $this = this;

		window.gl.ajax({
					option: "deleteRepository",
					delBook: ({"id_b":this.state.id_book})
				}, this.props.refrash("удаление книги"), function(data){
                $this.props.parent.setState({data:data})
				});
	};

    addAuthor = (obj) => {
        let newData = this.state.thisAuthors;
        newData.push(obj);
        this.setState({
            thisAuthors: this.state.thisAuthors
        });
    };
    deleteAuthor = (id) => {
        let newData = this.state.thisAuthors,
            $this = this;
        newData.forEach((item, index)=>{
            if(item != undefined){
                if(id == item.id){
                	delete newData[index];
                    window.gl.ajax({
						option: "deleteAuthorInBook",
						delEl: ({"id_a":item.id, "id_book": this.state.id_book})
					}, this.props.refrash("удаление автора"), function(data){
                        $this.props.parent.setState({data:data})
				});
                }
            }
        });
        this.setState({
            thisAuthors: newData
        });
    };
    stateThisAuthors = (stat) => {
    	if(stat == 'open'){
	    	this.setState({
	    		stateAuthor: true
	    	});
    	}else if(stat == 'close'){
	    	this.setState({
	    		stateAuthor: false
	    	});
    	}
    };

	editValue = (inputName) =>{
		switch(inputName){
			case "name": 
				this.setState({
					name_b: this.refs.name.value
				});
			break;
			case "author":
				this.setState({
					name_a: this.refs.author.value
				});
			break;
		}
	}; 

	render(){

	    let nameBook = [];
		if(this.state.stateAuthor){
			nameBook = (<input ref="name" value={this.state.name_b} onChange={()=>{this.editValue("name")}} />);
		}else{
			nameBook = (<div className="name-book"> {this.state.name_b} </div>);
		}
		return(
			<div className="book">
				<div className="book__row">
					{nameBook}
					<Authors data={this.state.thisAuthors}
							 all={this.props.allAuthors}
							 deleteAuthor={this.deleteAuthor}
							 addAuthor={this.addAuthor}
							 stateA={this.state.stateAuthor}
							 updateBook = {this.updateBooks} 
							 editValue = {this.editValue}
							 updateNameAuthor = {this.updateNameAuthor}/>
					<button onClick={()=>{this.stateThisAuthors('open')}}> Р </button>
					<button onClick={this.deleteBooks} > У </button>
				</div>
			</div>
		);
	}
}