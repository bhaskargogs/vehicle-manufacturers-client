import React, { FunctionComponent, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import { Manufacturers } from './features/manufacturers/Manufacturers';
import SearchManufacturers from './features/manufacturers/SearchManufacturers';

const AppRouter: FunctionComponent = () => {
  return (
    <Router>
      <Suspense fallback={<span>Loading...</span>}>
        <Switch>
          <Route exact path='/' component={App} />
          <Route exact path='/manufacturers' component={Manufacturers} />
          <Route
            exact
            path='/manufacturers/search'
            component={SearchManufacturers}
          />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
