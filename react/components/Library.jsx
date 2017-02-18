'use strict';

import React, {Component} from 'react';
import List from "./list/List";
import Book from "./book/Book";

export default class Library  extends Component<{}, Props, State>{

	render(){

		return(
			<div className="nnn">
				<List />

				
			</div>
		);
	}
}