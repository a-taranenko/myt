import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import Callback from './components/Callback'
import Auth from './utilities/Auth'
import { BrowserRouter, Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import './styling/index.css'

const auth = new Auth()

const Root = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <div>
          <Route path="/" render={(props) => <App auth={auth} {...props} />} />
          <Route path="/callback" render={(props) => <Callback auth={auth} {...props} />} />
        </div>
      </BrowserRouter>
    </div>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
