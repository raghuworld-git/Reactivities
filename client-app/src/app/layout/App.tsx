import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/activityDashboard';
import agent from '../api/agent';
import Loading from './Loading';

const App = () => {

  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activites.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => { setSubmitting(false) });
  }

  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activites.update(activity).then(() => {
      setActivities([...activities.filter(x => x.id !== activity.id), activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => { setSubmitting(false) });
  }

  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activites.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);
    }).then(() => { setSubmitting(false) });
  }

  useEffect(() => {
    agent.Activites.list().then(response => {
      let activites: IActivity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split('.')[0];
        activites.push(activity);
      });
      setActivities(activites);
    }).then(() => { setLoading(false) });
  }, []);

  if (loading) {
    return (<Loading content='Loading Activites...' />)
  }
  return (
    <React.Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </React.Fragment>
  );

}

export default App;
