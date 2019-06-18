import React,{Component} from 'react';
import '../App.css';
import Store from './Store';
import Table from './Table';
import Button from './Button';
class Ticket extends  Component{
	constructor(props){
		super(props);
		this.state = {
			firstTableItems:Store.getFirstTableItems(),
			secondTableItems:Store.getSecondTableItems(),
			firstTableSelectedItems:[],
			secondTableSelectedItems:[],
			firstTableSelectLimit:8,
			secondTableSelectLimit:1,
			error:''
		};
	}
	componentWillMount(){
		
	}
	onClickFirstTableItem = (item) => {
		let selected = this.state.firstTableSelectedItems,
			flag=false,
			position = selected.indexOf(item);
	
		if (position === -1){
			if (selected.length<8){
				selected.push(item)
				flag=true;
			}
		}		
		else 
			selected.splice(position, 1);
		this.state.firstTableItems.find(el => el.value === item).selected = flag;
		this.setState({firstTableSelectLimit:8-selected.length,firstTableItems:this.state.firstTableItems})
	}
	onClickSecondTableItem = (item) => {
		let selected = this.state.secondTableSelectedItems,
			flag=false,
			position = selected.indexOf(item);
		if (position === -1){
			if (selected.length<1){
				selected.push(item)
				flag=true;
			}
		}		
		else 
			selected.splice(position, 1);
		this.state.secondTableItems.find(el => el.value === item).selected = flag;
		this.setState({secondTableSelectLimit:1-selected.length,secondTableItems:this.state.secondTableItems})
	}
	onSubmit = () => {
		let error = '',
			result;
		if (this.state.firstTableSelectLimit===0 && this.state.secondTableSelectLimit===0)
			result=Store.getResponse({first:this.state.firstTableSelectedItems, second:this.state.secondTableSelectedItems[0]})
		else error = 'Соблюдены не все условия';
		if (error){
			this.setState({error:error});
			return
		}
		if (result) 
			this.props.onResult('win');
		else this.props.onResult('lose');
		//А тут мы просто параллельно запустим ajax
		Store.getAjaxResponse({first:this.state.firstTableSelectedItems, second:this.state.secondTableSelectedItems[0]})
	}
	onMagicClick =() => {
		let randomSelected = Store.generateRandomSelected();
		this.state.firstTableSelectedItems = randomSelected.firstArr;
		this.state.secondTableSelectedItems = randomSelected.secondArr;
		
		this.state.firstTableItems.map(el => {
			return (randomSelected.firstArr.indexOf(el.value)===-1?el.selected=false:el.selected=true);
		});
		this.state.secondTableItems.map(el => {
			return (randomSelected.secondArr.indexOf(el.value)===-1?el.selected=false:el.selected=true);
		});
		this.state.firstTableSelectLimit=0;
		this.state.secondTableSelectLimit=0;
		this.setState(this.state);
	}
	render() {
	  return (
		<div className='container p-4'>
			<div className='row justify-content-between mb-2 ml-2 mr-2'>
				<div className='h2' onClick={this.onClick}>{this.props.name}</div>
				<div className='magic-icon' onClick={this.onMagicClick}></div>
			</div>
			{!this.props.winner && (
			<div>
			<Table
				items={this.state.firstTableItems}
				title='Поле 1'
				limit={this.state.firstTableSelectLimit}
				onClick={this.onClickFirstTableItem}
			/>
			<Table
				items={this.state.secondTableItems}
				title='Поле 2'
				limit={this.state.secondTableSelectLimit}
				onClick={this.onClickSecondTableItem}
			/>
			{this.state.error && (
				<div className='text-danger text-center'>{this.state.error}</div>
			)}
			<Button
			name='Показать результат'
			onClick={this.onSubmit}
			/>
			</div>
			)}	
			{this.props.winner==='win' && (
				<div>Поздравляю! Вы выграли... Ничего!</div>
			)}
			{this.props.winner==='lose' && (
				<div>Увы, вы проиграли. Грустит вся администрация казино</div>
			)}
		</div>
	  );
	}
}

export default Ticket;
