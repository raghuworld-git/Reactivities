import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { Menu, Container, Button } from 'semantic-ui-react';
import ActivityStore from '../../app/stores/activityStore';

const NavBar = () => {

    const { openCreateForm } = useContext(ActivityStore);
    return (

        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header exact as={NavLink} to='/'>
                    <img src='/assets/logo.png' style={{ marginRight: '10px' }} alt='Reactivities Logo' />
                    Reactivities
                </Menu.Item >
                <Menu.Item
                    name='Activities' as={NavLink} to='/activities'
                />
                <Menu.Item>
                    <Button positive content='Create Activity' onClick={openCreateForm}
                        as={NavLink} to='/createActivity'
                    />
                </Menu.Item >
            </Container>
        </Menu>
    )
}

export default observer(NavBar);
