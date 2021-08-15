import React from "react";
import "./App.css";
import CurrentCity from "components/current-city/CurrentCity";
import MainPage from "pages/main-page/MainPage";
import CurrentDayPage from "pages/current-day-page/CurrentDayPage";
import Header from "components/header/Header";
import { Redirect, Route, Switch } from "react-router-dom";
import WeekPage from "pages/week-page/WeekPage";
import NotFound from "pages/not-found-page/NotFoundPage";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <CurrentCity />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/main" />} />
        <Route exact path="/main" component={MainPage} />
        <Route exact path="/today/:city/:lat/:lon" component={CurrentDayPage} />
        <Route exact path="/today" component={CurrentDayPage} />
        <Route exact path="/tomorrow" component={CurrentDayPage} />
        <Route exact path="/week" component={WeekPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
