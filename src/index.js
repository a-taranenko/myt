import React from 'react'
import ReactDOM from 'react-dom'
import './styling/index.css'
import App from './components/App'
import Callback from './components/Callback'
import { BrowserRouter, Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'

const Root = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <div>
          <Route path="/" component={App} />
          <Route path="/callback" component={Callback} />
        </div>
      </BrowserRouter>
    </div>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
