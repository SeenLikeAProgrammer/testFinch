import React,{Component} from 'react';
import '../App.css';

export default class Item extends Component {
	constructor(props){
		super(props)
	}
	componentDidMount(){
		
	}
	componentWillUnmount(){

	}
	onClick = () => {
		if (this.props.onClick)
			this.props.onClick(this.props.data.value);
	}
	render(){
		return (
		<div className={"cold-2 "+(this.props.data.selected?"selected":"1")} onClick={this.onClick}>
			{this.props.data.value}
		</div>
		)
	}
}