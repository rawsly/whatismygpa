import React from 'react';
import { Switch } from 'react-router-dom';
import * as ROUTES from './routes';
import College from './components/College/College';
import HighSchool from './components/HighSchool/HighSchool';
import Grade from './components/Grade/Grade';
import PublicRoute from './common/PublicRoute/PublicRoute';

const AppRouter = props => (
  <Switch>
    <PublicRoute exact path="/" component={College} {...props} />
    <PublicRoute
      exact
      path={ROUTES.COLLEGE_GPA_CALCULATOR}
      component={College}
    />
    <PublicRoute
      exact
      path={ROUTES.HIGH_SCHOOL_GPA_CALCULATOR}
      component={HighSchool}
    />
    <PublicRoute exact path={ROUTES.GRADE_CALCULATOR} component={Grade} />
  </Switch>
);

export default AppRouter;
