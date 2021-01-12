import React, { useEffect, useContext } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/activityDashboard';
import Loading from './Loading';
import ActivityStore from '../stores/activityStore';

import { observer } from 'mobx-react-lite';

const App = () => {

  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) {
    return (<Loading content='Loading Activites...' />)
  }
  return (
    <React.Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </React.Fragment>
  );

}

export default observer(App);
