import React,{Component} from 'react';
import '../App.css';

export default class Button extends Component {
	constructor(props){
		super(props)
		this.state = {}
		this.onClick = this.onClick.bind(this);
	}
	componentDidMount(){
		
	}
	componentWillUnmount(){

	}
	onClick(){
		if (this.props.onClick)
			this.props.onClick();
	}
	render(){
		return(
			<div className='row mt-4 justify-content-center'>
			{this.props.icon && (
			 <div className={`icon ${this.props.icon}`} onClick={this.onClick}>
				
			 </div>
			)}
			{this.props.name && (
				<div className='btn' onClick={this.onClick}>
					{this.props.name}
				</div>
			)}
			</div>
			)
	}
}