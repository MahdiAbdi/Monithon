import React from 'react';
import { Switch, Route } from 'react-router';
import { DashboardPage } from './DashboardPage';
import { Service } from './Service';
export function MainRoutes() {
    return (
      <Switch>
        <Route path="/services/:id" exact component={Service} />
        <Route path="/" exact component={DashboardPage} />
      </Switch>
    );
  }
  