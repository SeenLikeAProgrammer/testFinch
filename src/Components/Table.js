import React,{Component} from 'react';
import Item from './Item';
import '../App.css';
export default class Table extends Component {
	constructor(props){
		super(props)

	}
	componentDidMount(){
		
	}
	componentWillUnmount(){

	}
	onClick = (item) => {
		if (this.props.onClick)
			this.props.onClick(item);
	}
	numberCase = () => {
		switch (this.props.limit){
			case 1:
				return 'число';
			case 2:
				return 'числа';
			case 3:
				return 'числа';
			case 4:
				return 'числа';	
			default:
				return 'чисел';
		}
	}
	render(){
		return (
		<div className="row mt-4">
			<div className="col-12 pl-0 mb-2">
				<span className='ml-2 f-bold'>{this.props.title}</span>
				<span className="ml-4">Отметьте {this.props.limit} {this.numberCase()}</span>
			</div>
			{this.props.items.map(item => {
					return (
							<Item 
								key={item.value}
								onClick={this.onClick}
								data={item}
							/>
					)
			}
			)}
		</div>
		)
	}
}