import React, { Component } from 'react'
import { Route } from 'react-router-dom';

import {LoginPage, KoreapasPage, SchedulePage, SchedulePage1} from 'components'

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={LoginPage} />
        <Route path="/schedule" component={SchedulePage}/>
        <Route path="/schedule1" component={SchedulePage1}/>
        <Route path="/koreapas" component={KoreapasPage}/>
      </div>
    )
  }
}


export default App