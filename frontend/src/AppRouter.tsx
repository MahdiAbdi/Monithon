import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Dashboard } from './Dashboard';

interface Props {}

export const AppRouter: React.FC = (props: Props) => (
    <Router>
      <Switch>
            <Route path="/" component={Dashboard} />
      </Switch>
    </Router>
  );
