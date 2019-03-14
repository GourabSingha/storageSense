import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs, Body, Title , Button, Icon, Left} from 'native-base';
import DataView from './dataShow';

export default class TabsExample extends Component {
  render() {
    return (
      <Container>
        <Header hasTabs style={{backgroundColor : '#1c1c1c'}}>
          <Left>
            <Button transparent >
              <Icon name='menu' onPress={() => {this.props.navigation.openDrawer(); }}/>
            </Button>
          </Left>
          <Body>
            <Title style ={{color : '#FF6C37'}}>Monitoring</Title>
          </Body>
        </Header>
        <Tabs tabBarUnderlineStyle ={{backgroundColor:'#FF6C37'}}>
          <Tab heading="Temperature" tabStyle={{backgroundColor:'#1c1c1c'}} activeTabStyle={{backgroundColor:'#1c1c1c'}} 
          textStyle = {{color: '#FF6C37'}} activeTextStyle={{color:'#FF6C37'}}>
            <DataView whichEntity="temps" />
          </Tab>
          <Tab heading="Moisture" tabStyle={{backgroundColor:'#1c1c1c'}} activeTabStyle={{backgroundColor:'#1c1c1c'}}
          textStyle = {{color: '#FF6C37'}} activeTextStyle={{color:'#FF6C37'}}>
            <DataView whichEntity="moistures"/>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}