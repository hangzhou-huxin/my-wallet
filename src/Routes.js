import React from 'react'
import { Route, Redirect, Switch } from "react-router-dom"
import Wallet from "./containers/Wallet"
import AccountDetails from "./containers/Wallet/AccountDetails"
//import Browser from './components/Browser'
//import Dapps from './containers/Dapps'

//<Browser tabs={this.state.tabs}/>


export default () =>
<Switch>
  {window.location.href.endsWith('index.html') && <Redirect to="/" />}

  <Route path="/" exact component={Wallet} />
  <Route path="/wallet" exact component={Wallet} />
  <Route path="/account/:address" exact component={AccountDetails} />
</Switch>;
