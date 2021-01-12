import React, { useState, FormEvent, useContext } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore';

interface IProps {
    activity: IActivity;
}
const ActivityForm: React.FC<IProps> = ({activity: initialActivityState }) => {

    const { createActivity, editActivity, submitting, cancelFormOpen } = useContext(ActivityStore);
    const initializeForm = () => {
        if (initialActivityState) {
            return initialActivityState;
        }
        else {
            return {
                id: '',
                title: '',
                category: '',
                description: '',
                date: '',
                city: '',
                venue: ''
            };
        }
    };

    const [activity, setActivity] = useState<IActivity>(initializeForm);

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value })
    }

    const handleSubmit = () => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity);
        }
        else {
            editActivity(activity);
        }
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder='Title' name='title' value={activity.title} onChange={handleInputChange} />
                <Form.TextArea rows={2} name='description' placeholder='Description' value={activity.description} onChange={handleInputChange} />
                <Form.Input placeholder='Category' name='category' value={activity.category} onChange={handleInputChange} />
                <Form.Input input='datetime-local' name='date' placeholder='Date' value={activity.date} onChange={handleInputChange} />
                <Form.Input placeholder='City' name='city' value={activity.city} onChange={handleInputChange} />
                <Form.Input placeholder='Venue' name='venue' value={activity.venue} onChange={handleInputChange} />
                <Button floated='right' loading={submitting} positive type='submit' content='Submit' />
                <Button floated='right' type='button' content='Cancel' onClick={cancelFormOpen} />
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm)
