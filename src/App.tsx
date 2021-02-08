import React from "react"
import "./App.css"
import Main from "./components/Main"
import Cities from "./components/Cities"
import SingleDay from "./components/SingleDay"
import Header from "./components/header/Header"
import { Redirect, Route, Switch } from "react-router-dom"
import Week from "./components/Week"
import NotFound from "./components/NotFound"

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Main />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/main" />} />
        <Route exact path="/main" component={Cities} />
        <Route exact path="/today/:city/:lat/:lon" component={SingleDay} />
        <Route exact path="/today" component={SingleDay} />
        <Route exact path="/tomorrow" component={SingleDay} />
        <Route exact path="/week" component={Week} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default App
