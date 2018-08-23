import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import Callback from './components/Callback'
import ErrorLog from './components/ErrorLog'
import Auth from './utilities/Auth'
import { Router, Switch, Route } from 'react-router-dom'
import history from './utilities/history'
import registerServiceWorker from './registerServiceWorker'
import './styling/index.css'

const auth = new Auth()

const Root = () => {
  return (
    <div className="container">
      <Router history={history} component={App}>
          <Switch>
            <Route exact path="/" render={(props) => <App auth={auth} {...props} />} />
            <Route exact path="/callback" render={(props) => <Callback auth={auth} {...props} />} />
            <Route exact path="/error" component={ErrorLog} />
          </Switch>
      </Router>
    </div>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
