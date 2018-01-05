import React from 'react'
import { Route, Switch, NativeRouter } from 'react-router-native'

import HomeScene from './components/home/HomeScene'
import Options from './components/form/Options'
import Form from './components/form/Form'
import Birthday from './components/birthday/Birthday'
import Question from './components/question/Question'
import Schedule from './components/schedule/Schedule'
import AntDesign from './components/antDesign/AntDesign'

export default () => (
  <NativeRouter>
    <Switch>
      <Route path='/' exact component={HomeScene} />
      <Route path='/birthday' component={Birthday} />
      <Route path='/options' component={Options} />
      <Route path='/form' component={Form} />
      <Route path='/question' component={Question} />
      <Route path='/schedule' component={Schedule} />
      <Route path='/ant-design' component={AntDesign} />
    </Switch>
  </NativeRouter>
)
