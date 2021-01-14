import React, { useEffect, useContext } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/activityDashboard';
import Loading from './Loading';
import ActivityStore from '../stores/activityStore';

import { observer } from 'mobx-react-lite';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

const App: React.FC<RouteComponentProps> = ({ location }) => {

  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) {
    return (<Loading content='Loading Activites...' />)
  }
  return (
    <React.Fragment>
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'}
        render={() => (
          <React.Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Route exact path='/activities' component={ActivityDashboard} />
              <Route exact path='/activities/:id' component={ActivityDetails} />
              <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
            </Container>
          </React.Fragment>
        )} />

    </React.Fragment>
  );

}

export default withRouter(observer(App));
