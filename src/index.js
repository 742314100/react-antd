/*入口js*/
import React from 'react';
import ReactDOM from 'react-dom';
//import 'antd/dist/antd.css' //全局引入样式
import storageUtil from "./utils/storageUtil"
import memoryUtils from "./utils/memoryUtils"

import {Provider} from 'react-redux'
import store from './App'

import App from './app'

const user=storageUtil.getUser()
if(user && user._id){
    memoryUtils.user=user
}

ReactDOM.render(
    (
        <Provider>
            <App />
        </Provider>
        ),
    document.getElementById('root')
);


