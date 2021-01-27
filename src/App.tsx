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
      <Route
        render={() => {
          return (
            <>
              <Header />
              <Main />
            </>
          )
        }}
      />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/main" />} />
        <Route exact path="/main" render={() => <Cities />} />
        <Route
          exact
          path="/today/:city/:lat/:lon"
          render={() => <SingleDay />}
        />
        <Route exact path="/today" render={() => <SingleDay />} />
        <Route exact path="/tomorrow" render={() => <SingleDay />} />
        <Route exact path="/week" render={() => <Week />} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default App
