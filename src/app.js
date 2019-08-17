/*根组件*/
import React,{Component} from 'react';
import {Button,message} from 'antd';
import './assets/common.css'

export default class App extends Component {
	handle=()=>{
		message.success('message success')
	};
	render (){
		return (
			<div>
                <div>webstorere343wrm1</div>
				<div>webstorm1</div>
				<div>webstorm1</div><div>webstorm1</div>
				<Button type='primary' onClick={this.handle}>primary1</Button>
			</div>
		)
	}
}

