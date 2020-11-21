import React from 'react';
import './App.css';
import Main from './components/Main';
import Cities from './components/Cities';
import Today from './components/Today';
import Header from './components/header/Header';
import { Route, Switch } from 'react-router-dom';
import Week from './components/Week';

function App() {
  return (
    <div className="App">
      <Route path="/" render={() => {
        return <>
          <Header />
          <Main />
        </>
      }} />
      <Switch>
        <Route exact path="/" render={() => <Cities />} />
        <Route exact path="/today/:today/:today/:today" render={() => <Today />} />
        <Route exact path="/today" render={() => <Today />} />
        <Route exact path="/tomorrow" render={() => <Today />} />
        <Route exact path="/week" render={() => <Week />} />
        <Route exact path="/404" render={() => <Week />} />
      </Switch>
    </div>
  );
}

export default App;
