import React from 'react';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import styles from './index.css';

export default class Display  extends React.Component {

	constructor(props){
		super(props);
		this.state={
			selected: 'normalCard'
		};
	}
	
	invokeParentFunction = (datum) => {
		console.log("item",datum);
		this.props.actionFunction(datum);
		this.setState({
			selected: 'selectedCard'
		});	

	}

	shouldComponentUpdate = (nextProps, nextState) =>  {
		if(nextState.selected ==='selectedCard'){
			console.log(new Date());
			setTimeout(
				function(){
					this.setState({selected: 'normalCard'});
				}.bind(this),
				5000
				);
			return true;
		}
		return true;
	}

	render(){
		return(

			<div>					
				{
							<div id={this.state.selected} key={this.props.index}>
								<Card>
									<CardMedia>
							  		<video width="50" height="350" controls>
							    		<source src={this.props.item.images.fixed_height.mp4} type="video/mp4" />
							    		Your browser does not support the video tag.
							  		</video>
						  		</CardMedia>
						  		<CardTitle title={((typeof this.props.item.title)!=="undefined") ? this.props.item.title.toUpperCase() : ''} />
						  		    <CardText>
						  		      	{this.props.item.source}
						  		    </CardText>
						  		    <CardActions>
						  		      <FlatButton label={this.props.label} 
						  		      onClick={(this.props.label.length>0) ? this.invokeParentFunction.bind(this, this.props.item) : "" }/>
						  		      <FlatButton label="Like" />
						  		    </CardActions>
						  	</Card>
							</div> 
				}
		</div>

		);
	}
}