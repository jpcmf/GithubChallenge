import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from '~/pages/Main';
import User from '~/pages/User';
import UserDetails from '~/pages/UserDetails';
import Repository from '~/pages/Repository';
import RepositoryDetails from '~/pages/RepositoryDetails';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Main} />

      <Route path="/users" exact component={User} />
      <Route path="/users/:id" component={UserDetails} />

      <Route path="/repositories" exact component={Repository} />
      <Route path="/repositories/:owner/:repo" component={RepositoryDetails} />
    </Switch>
  );
}
