import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {Container, Content, Button, Text} from 'native-base';
import { Image } from 'react-native';

class sidebar extends Component {
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render () {
        return (
            <Container > 
                <Content style ={{padding: 10, backgroundColor : '#282828'}}>
                    <Image source = {require('./../images/main.png')} style={{alignSelf:'center', width:200, height:300}}/>
                    <Button transparent danger onPress={this.navigateToScreen('monitor')}>
                        <Text>Monitor</Text>
                    </Button>
                    <Button transparent danger onPress={this.navigateToScreen('inventory')}>
                        <Text>Inventory</Text>
                    </Button>
                    <Button transparent danger onPress = {this.navigateToScreen('quality')}>
                        <Text>Quality Check</Text>
                    </Button>
                    <Button transparent danger onPress = {this.navigateToScreen('actionList')}>
                        <Text>Action List</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

sidebar.propTypes = {
    navigation: PropTypes.object
};

export default sidebar;