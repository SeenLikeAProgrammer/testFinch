import React,{Component} from 'react';
import './App.css';
import Store from './Components/Store';
import Table from './Components/Table';
import Button from './Components/Button';
import Ticket from './Components/Ticket';
class App extends  Component{
	constructor(props){
		super(props);
		this.state={winner:false};
	}
	componentWillMount(){
		Store.addAjaxErrorListener(this.onErrorAjax)
	}
	onErrorAjax = () => {
		alert('Прошло 3 запроса, а AJAX так и не ответил. Информация по каждому запросу отображена в консоли')
	}
	onResult = (win) => {
		this.setState({winner:win});
	}
	render(){
		return(
			<Ticket 
			onResult={this.onResult}
			name='Билет 1'
			winner={this.state.winner}/>
		)
	}
}

export default App;
