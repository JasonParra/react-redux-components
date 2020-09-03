import React, { PureComponent } from 'react'
import Home from "../home/home"
import Components from '../components/components'
import PublicRoute from "../../components/public-route/public-route"
import ProtectedRoute from "../../components/protected-route/protected-route"
import { Switch, Route } from "react-router-dom";

export default class App extends PureComponent {
  render() {
    return (
      <Switch>
        <PublicRoute path={'/components'} component={<Components />} />
        <PublicRoute path={'/'} component={<Home />} />
      </Switch>
    )
  }
}
