'use strict';

import React, {Component} from 'react';

export default class Authors extends Component<{}, Props, State>{
	render(){
		return(
			<div className="loading">
				<div className="loading__background">
					<div className="loading__icon">
					</div>
				</div>
			</div>
		);
	}
}