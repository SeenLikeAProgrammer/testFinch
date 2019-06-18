import eventEmitter from 'events';
import Ajax from './Ajax';
let firstTableItems=[],
	secondTableItems=[];
for (let i=1;i<20;i++){
	firstTableItems.push({value:i, selected:false});
}
for (let i=1;i<3;i++){
	secondTableItems.push({value:i, selected:false});
}
let Store = Object.assign(eventEmitter.prototype, {
		getFirstTableItems: function(){
			return firstTableItems;
		},
		getResponse: function(selected) {
			let fWinTicket = [],
				sWinTicket = Math.floor(Math.random() * 2) + 1,
				coincidence=0;
				
			for (let i=1;i<9;i++)
				fWinTicket.push(Math.floor(Math.random() * 19) + 1);
			
			for (let i=0;i<fWinTicket.length;i++){
				if (selected.first.indexOf(fWinTicket[i])!==-1)
					coincidence++;
			}

			if (coincidence===4 || coincidence>=3 && sWinTicket===selected.second)
				return true;
			else return false;
		},
		getAjaxResponse: function(selected) {
			let ind=0;
			function sendTo(ind){
				console.log(ind);
				if (ind===3) return Store.emit('AJAX_ERROR'); 
				Ajax.send({
                    url: `http://finch-test/`,	
                    method: 'POST',
                    success: function(data) {
							
					},
                    error: function(response) {
						console.log(response);
                        setTimeout(() => {sendTo(ind+=1)},2000)
					}
                });
			}
			return sendTo(ind);
		},
		addAjaxErrorListener: function(callback) {
			Store.on('AJAX_ERROR', callback);
		},
		getSecondTableItems: function(){
			return secondTableItems;
		},
		generateRandomSelected: function(){
			firstTableItems=[];
			secondTableItems=[]; 
			function randomToArr(min, max, length, array){
				let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
				if (array.length===length)
					return;
				else if (array.indexOf(randomNumber)===-1){
					array.push(randomNumber);
					randomToArr(min,max,length,array);
				} else randomToArr(min,max,length,array);
			}
			randomToArr(1,19,8,firstTableItems);
			randomToArr(1,2,1,secondTableItems);
			return {firstArr:firstTableItems, secondArr:secondTableItems};
		}
})
export default Store;