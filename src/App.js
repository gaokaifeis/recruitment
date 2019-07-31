import React from 'react'
import { Route, Switch } from 'react-router-dom'


import AuthRoute from './components/authroute'
import Dashboard from './components/dashboard'

import Login from './container/login'
import Register from './container/register'
import BossInfo from './container/bossinfo'
import GeniusInfo from './container/geniusinfo'
import Chat from './components/chat'

function App () {
  return (
    <div>
      <AuthRoute></AuthRoute>
      <Switch>
        <Route path='/bossinfo' component={BossInfo}></Route>
        <Route path='/geniusinfo' component={GeniusInfo}></Route>
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
        <Route path='/chat/:user' component={Chat}></Route>
        <Route component={Dashboard}></Route>
      </Switch>
    </div>
  )
}

// export default hot(module)(App)
export default App
