import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as ROUTES from './routes';
import College from './components/College/College';
import HighSchool from './components/HighSchool/HighSchool';

const AppRouter = props => (
  <Switch>
    <Route exact path="/" component={College} {...props} />
    <Route
      exact
      path={ROUTES.COLLEGE_GPA_CALCULATOR}
      component={College}
      {...props}
    />
    <Route
      exact
      path={ROUTES.HIGH_SCHOOL_GPA_CALCULATOR}
      component={HighSchool}
      {...props}
    />
  </Switch>
);

export default AppRouter;
