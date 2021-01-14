import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Card, Image, Button } from 'semantic-ui-react'
import Loading from '../../../app/layout/Loading'
import ActivityStore from '../../../app/stores/activityStore'

interface DetailParams {
    id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {

    const activityStore = useContext(ActivityStore);
    const { selectedActivity: activity, loadActivityById, loadingInitial } = activityStore;

    useEffect(() => {
        loadActivityById(match.params.id);
    }, [loadActivityById, match.params.id])

    if (loadingInitial || !activity) return <Loading content='Loading activity...' />
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
                        <Button basic color='blue'
                            as={Link} to={`/manage/${activity.id}`}
                        > Edit</Button>
                        <Button basic color='grey' onClick={() => history.push('/activities')}> Cancel</Button>
                    </Button.Group>
                </Card.Content>
            </Card>
        </>
    )
}

export default observer(ActivityDetails)