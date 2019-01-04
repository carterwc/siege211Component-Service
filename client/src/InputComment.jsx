import React, {Component} from 'react';
import axios from 'axios';
class InputComment extends Component {
	constructor(props){
		super(props)
	}

	postComment() {
		console.log('clicked');
		axios.post('/api/test',{
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
		.then(res => console.log(res.data))
		.catch(err => {
			console.log(err)
		})
  }

  render() {
  	return (
  		<div>
  			<button 
  			onClick={()=>this.postComment()}
  			>Click me!</button>
  		</div>
  	)
  }
}


export default InputComment;