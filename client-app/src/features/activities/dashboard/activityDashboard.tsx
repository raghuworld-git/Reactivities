import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Grid, List } from 'semantic-ui-react';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';
import ActivityStore from '../../../app/stores/activityStore';


const ActivityDashboard: React.FC = () => {

    const activityStore = useContext(ActivityStore);
    const { editMode, selectedActivity } = activityStore;

    return (
        <Grid>
            <Grid.Column width={10}>
                <List>
                    <ActivityList />
                </List>
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode &&
                    <ActivityDetails
                    />
                }
                {editMode &&
                    <ActivityForm
                        key={(selectedActivity && selectedActivity.id) || 0}
                        activity={selectedActivity!}
                    />
                }
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard)
