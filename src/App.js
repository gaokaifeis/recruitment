import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
// import { hot } from 'react-hot-loader'

import reducers from './reducer'

import AuthRoute from './components/authroute'
import Dashboard from './components/dashboard'

import Login from './container/login'
import Register from './container/register'
import BossInfo from './container/bossinfo'
import GeniusInfo from './container/geniusinfo'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(
	applyMiddleware(thunk)
))

function App () {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
          <Route path='/bossinfo' component={BossInfo}></Route>
          <Route path='/geniusinfo' component={GeniusInfo}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route component={Dashboard}></Route>
        </Switch>
      </div>
    </BrowserRouter>
    </Provider>
  )
}

// export default hot(module)(App)
export default App
