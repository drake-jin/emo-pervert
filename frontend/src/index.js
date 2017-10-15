import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import Root from './Root'

import './styles/main.scss'


const rootElement = document.getElementById('root')

ReactDOM.render(<Root/>, rootElement);

registerServiceWorker()
