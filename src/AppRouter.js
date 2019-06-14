import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as ROUTES from './routes';
import College from './components/College/College';
import HighSchool from './components/HighSchool/HighSchool';
import Grade from './components/Grade/Grade';

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
    <Route exact path={ROUTES.GRADE_CALCULATOR} component={Grade} {...props} />
  </Switch>
);

export default AppRouter;
