import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react';
import ActivityStore from '../../app/stores/activityStore';

const NavBar = () => {

    const { openCreateForm } = useContext(ActivityStore);
    return (

        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header>
                    <img src='/assets/logo.png' style={{ marginRight: '10px' }} alt='Reactivities Logo' />
                    Reactivities
                </Menu.Item >
                <Menu.Item
                    name='Activities'
                />
                <Menu.Item>
                    <Button positive content='Create Activity' onClick={openCreateForm} />
                </Menu.Item >
            </Container>
        </Menu>
    )
}

export default observer(NavBar);
