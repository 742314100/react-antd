/*根组件*/
import React,{Component} from 'react';
import {Button,message} from 'antd'

export default class App extends Component {
	handle=()=>{
		message.success('message success')
	}
	render (){
		return (
			<div>
				<Button type='primary' onClick={this.handle}>primary</Button>
			</div>
		)
	}
}

