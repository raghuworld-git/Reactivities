import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import ActivityStore from '../../../app/stores/activityStore'



const ActivityDetails: React.FC = () => {

    const activityStore = useContext(ActivityStore);
    const { selectedActivity: activity, openEditForm, cancelSelectedActivity } = activityStore;
    return (
        <>
            <Card fluid>
                <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{activity!.title}</Card.Header>
                    <Card.Meta>
                        <span className='date'>{activity!.date}</span>
                    </Card.Meta>
                    <Card.Description>
                        {activity!.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button.Group widths={2}>
                        <Button basic color='blue' onClick={() => openEditForm(activity!.id)}> Edit</Button>
                        <Button basic color='grey' onClick={cancelSelectedActivity}> Cancel</Button>
                    </Button.Group>
                </Card.Content>
            </Card>
        </>
    )
}

export default observer(ActivityDetails)